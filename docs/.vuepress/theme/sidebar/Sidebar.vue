<template>
  <div class="sidebar">
    <slot name="top"/>
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
    <slot name="bottom"/>
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

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.bottom <= window.innerHeight - 650
  );
}
watch(() => route, refreshIndex)

const checkIfScroll = () => {
  const pageAnchors = document.querySelectorAll('.header-anchor')
  const sidebar = document.querySelector('.sidebar')
  const sidebarAnchors = sidebar.querySelectorAll('a')
  const sidebarAnchorsContainer = sidebar.querySelectorAll('.collapsible.sidebar-sub-header')
  const sidebarStringLinks = Array.from(sidebarAnchors).map(a => a.getAttribute('data-anchor'))

  pageAnchors.forEach((a)=>{
    if(a.getAttribute('data-anchor')) return
    a.setAttribute('data-anchor', page.value.path+a.hash)
  })

  pageAnchors.forEach(a => {
    if (isInViewport(a)) {
      const currentLink = sidebarStringLinks.find(link => link === a.getAttribute('data-anchor'))
      sidebarAnchorsContainer.forEach(container => {
        container.querySelectorAll('.sidebar-link-container').forEach(cl => {
          if (container.querySelector(`a[data-anchor="${currentLink}"]`)) cl.classList.remove("collapsed")
          else cl.classList.add("collapsed")
        })
      })

      if (sidebar.querySelector(`a[data-anchor="${currentLink}"]`)) {
        sidebarAnchors.forEach(a => a.classList.remove("active"))
        sidebar.querySelector(`a[data-anchor="${currentLink}"]`).classList.add("active")
      }
    }
  })
}

const resolveOpenGroupIndex = (route, items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}

onMounted(() => {
  refreshIndex()
  !props.isMobileWidth ? window.addEventListener("scroll", checkIfScroll) : null
})

onUnmounted(() => window.removeEventListener("scroll", checkIfScroll))

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
</style>
