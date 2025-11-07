<template>
  <div class="sidebar">
    <slot name="top" />
    <ul class="sidebar-links" v-if="sidebarItems.length">
      <li v-for="(item, i) in sidebarItems" :key="i">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :closeSidebarDrawer="closeSidebarDrawer"
          :collapsable="!!(item.collapsable || item.collapsible)"
          @toggle="toggleGroup(i)"
        />
        <SidebarLink
          v-else
          :closeSidebarDrawer="closeSidebarDrawer"
          :item="item"
        />
      </li>
    </ul>
    <slot name="bottom" />
  </div>
</template>

<script setup>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import {isActive, resolveSidebarItems} from '../util'
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {usePageData} from "@vuepress/client";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  closeSidebarDrawer: {
    type: Function,
    default: () => {}
  },
  isMobileWidth: {
    type: Boolean,
  }
})
const propsItems = computed(() => props.items)

const route = useRoute()
const page = usePageData()

const sidebarItems = computed(() => resolveSidebarItems(page.value, route, propsItems.value))


 const openGroupIndex = ref(0)

const refreshIndex = () => {
  const index = resolveOpenGroupIndex(
      route,
      props.items
  )
  if (index > -1) {
    openGroupIndex.value = index
  }
}

const toggleGroup = (index) => {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index
}

// Track visible headings for Intersection Observer
const visibleHeadings = ref(new Set())
let intersectionObserver = null
let scrollThrottleTimeout = null

// Throttle function for scroll events
const throttle = (func, delay) => {
  return (...args) => {
    if (!scrollThrottleTimeout) {
      scrollThrottleTimeout = setTimeout(() => {
        func(...args)
        scrollThrottleTimeout = null
      }, delay)
    }
  }
}

// Check if user has scrolled to the bottom of the page
const isAtBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  // Consider "at bottom" if within 10% of viewport height from the bottom
  // This scales better across different screen sizes
  const threshold = clientHeight * 0.1
  return scrollHeight - scrollTop - clientHeight < threshold
}

// Update sidebar active state based on the topmost visible heading
const updateSidebarActiveState = () => {
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return

  const sidebarAnchors = sidebar.querySelectorAll('a')
  const sidebarAnchorsContainer = sidebar.querySelectorAll('.collapsible.sidebar-sub-header')
  const pageAnchors = document.querySelectorAll('.header-anchor')
  
  // Get all visible headings sorted by their position (topmost first)
  const sortedVisibleHeadings = Array.from(visibleHeadings.value).sort((a, b) => {
    const aRect = a.getBoundingClientRect()
    const bRect = b.getBoundingClientRect()
    return aRect.top - bRect.top
  })

  let targetHeading = null

  // If at bottom of page, select the last heading that's above the viewport center
  if (isAtBottom() && pageAnchors.length > 0) {
    const viewportCenter = window.innerHeight / 2
    const allAnchorsArray = Array.from(pageAnchors)
    
    // Find all headings that are above the viewport center
    const headingsAboveCenter = allAnchorsArray.filter(anchor => {
      const rect = anchor.getBoundingClientRect()
      return rect.top < viewportCenter
    })
    
    // Select the last one (closest to bottom)
    if (headingsAboveCenter.length > 0) {
      targetHeading = headingsAboveCenter[headingsAboveCenter.length - 1]
    }
  }
  
  // If not at bottom or no heading found, use the topmost visible heading
  if (!targetHeading && sortedVisibleHeadings.length > 0) {
    targetHeading = sortedVisibleHeadings[0]
  }
  
  if (!targetHeading) return

  const currentAnchor = targetHeading.getAttribute('data-anchor')
  
  // Update active class on sidebar links
  sidebarAnchors.forEach(a => a.classList.remove('active'))
  const activeLink = sidebar.querySelector(`a[data-anchor="${currentAnchor}"]`)
  
  if (activeLink) {
    activeLink.classList.add('active')
    
    // Expand/collapse collapsible containers
    sidebarAnchorsContainer.forEach(container => {
      container.querySelectorAll('.sidebar-link-container').forEach(cl => {
        if (container.querySelector(`a[data-anchor="${currentAnchor}"]`)) {
          cl.classList.remove("collapsed")
        } else {
          cl.classList.add("collapsed")
        }
      })
    })
  }
}

// Setup Intersection Observer for heading visibility tracking
const setupIntersectionObserver = () => {
  const pageAnchors = document.querySelectorAll('.header-anchor')
  const sidebar = document.querySelector('.sidebar')
  
  if (!pageAnchors.length || !sidebar) return

  // Set data-anchor attribute on page anchors
  pageAnchors.forEach((anchor) => {
    if (!anchor.getAttribute('data-anchor')) {
      anchor.setAttribute('data-anchor', page.value.path + anchor.hash)
    }
  })

  // Disconnect existing observer if any
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  // Create new Intersection Observer
  // rootMargin: -80px accounts for 4rem (64px) fixed header + 16px buffer
  // -80% bottom margin triggers when heading enters top 20% of viewport
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const anchor = entry.target.getAttribute('data-anchor')
        if (entry.isIntersecting) {
          visibleHeadings.value.add(entry.target)
        } else {
          visibleHeadings.value.delete(entry.target)
        }
      })
      updateSidebarActiveState()
    },
    {
      rootMargin: '-80px 0px -80% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }
  )

  // Observe all page anchors
  pageAnchors.forEach((anchor) => {
    intersectionObserver.observe(anchor)
  })
}

// Throttled version for scroll events
const throttledUpdateSidebar = throttle(() => {
  updateSidebarActiveState()
}, 100)

watch(() => route, () => {
  refreshIndex()
  if (!props.isMobileWidth) {
    setTimeout(() => {
      setupIntersectionObserver()
    }, 100)
  }
})

const resolveOpenGroupIndex = (route, items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}


const handleHashChange = () => {
  // Get the current hash from the URL
  const currentHash = window.location.hash;
  
  if (!currentHash) return;

  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // Find the corresponding anchor link in the sidebar
  const targetAnchor = sidebar.querySelector(`a[data-anchor="${page.value.path}${currentHash}"]`);
  
  if (targetAnchor) {
    const sidebarAnchors = sidebar.querySelectorAll('a');
    
    // Remove the "active" class from all sidebar links and add it only to the current one
    sidebarAnchors.forEach((link) => link.classList.remove('active'));
    targetAnchor.classList.add('active');

    // Expand the parent collapsible sidebar item, if any
    const parentCollapsible = targetAnchor.closest('.collapsible');
    if (parentCollapsible) {
      const linkContainer = parentCollapsible.querySelector('.sidebar-link-container');
      if (linkContainer) {
        linkContainer.classList.remove('collapsed');
      }
    }
  }
  
  // Re-setup observer after hash change to ensure proper tracking
  setTimeout(() => {
    setupIntersectionObserver();
  }, 50);
};

onMounted(() => {
  refreshIndex();
  
  if (!props.isMobileWidth) {
    // Setup Intersection Observer after DOM is fully rendered
    setTimeout(() => {
      setupIntersectionObserver()
    }, 100)
    
    // Add throttled scroll listener as backup
    window.addEventListener('scroll', throttledUpdateSidebar)
    window.addEventListener('resize', throttledUpdateSidebar)
  }

  // Listen to the "hashchange" event to handle direct anchor link access
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  // Disconnect Intersection Observer
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
  
  // Clear any pending throttle timeout
  if (scrollThrottleTimeout) {
    clearTimeout(scrollThrottleTimeout)
    scrollThrottleTimeout = null
  }
  
  // Remove event listeners
  window.removeEventListener('scroll', throttledUpdateSidebar);
  window.removeEventListener('resize', throttledUpdateSidebar);
  window.removeEventListener('hashchange', handleHashChange);
});



</script>

<style lang="stylus">
@import '../../styles/config.styl'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none

  a
    display block

  .sidebar-group-items
    margin-left 2rem
    margin-right 0.625rem

@media (max-width: $mobileBreakpoint)
  .page
    padding 1.5rem 1.25rem 2.28125rem 1.25rem
  .sidebar
    width 100% !important
    padding 0 0 7.5rem 0 !important
    margin 0 !important
    top 3.875rem !important
    background #FFFFFF !important
    z-index 999
    overflow-x hidden
    white-space normal
</style>
