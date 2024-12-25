<template>
  <form id="search-form" class="drawer-header__input" @submit.prevent="performSearch">
    <input type="text" 
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           id="algolia-search-input"
           :placeholder="placeholder"
           :class="activeSearchClass"
           maxlength="100"
    />
    <div :class="activeSearchIconClass">
      <img v-if="!loading" @click="performSearch" alt="search icon" :src="withBase(activeSearchIcon)"/>
      <div v-if="loading" class="spinner"></div>
    </div>
  </form>
</template>

<script setup>
import {usePageFrontmatter, withBase} from "@vuepress/client";
import {computed, inject, ref, watch} from "vue";

const { MAX_HITS_PER_PAGE } = inject('themeConfig')
const {headerDefaultSearchIcon, headerSearchIcon, headerSearchPlaceholder} = inject('themeConfig')

const props = defineProps({
  options: {
    type: [Object, Array],
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  isOpenDrawer: {
    type: Boolean,
    required: true
  },
  isMobileWidth: {
    type: Boolean,
  }
});

const emit = defineEmits(["openDrawer", 'update:modelValue', 'result'])
const frontmatter = usePageFrontmatter()

const isGlobalLayout = computed(() => {
  return frontmatter.value.layout === 'HomeLayout'
})

const activeSearchClass = computed(() => {
  return props.isOpenDrawer ? 'drawer-header__search' : isGlobalLayout.value ? 'header-layout__search' : 'header-layout__search-default'
})

const activeSearchIconClass = computed(() => {
  return props.isOpenDrawer ? 'drawer-header__search-icon' : isGlobalLayout.value ? 'header-layout__search-icon' : 'header-layout__search-icon-default'
})

const activeSearchIcon = computed(() => {
  return isGlobalLayout.value || props.isOpenDrawer ? headerSearchIcon : headerDefaultSearchIcon
})

const placeholderDesktop = computed(() => {
  return props.isOpenDrawer ? 'Search' : isGlobalLayout.value ? headerSearchPlaceholder : 'Search'
})

const placeholder = computed(() => {
  return props.isMobileWidth ? 'Search accross all Imunify360 Docs' : placeholderDesktop.value
})

function parseDocs(api_response) {
  return api_response.imunify360_docs.map((doc) => {
    const titleParts = doc.title.split("->").map((part) => part.trim());

    const hierarchy = {
      lvl0: titleParts[0] || null,
      lvl1: titleParts[1] || null,
      lvl2: titleParts[2] || null,
      lvl3: titleParts[3] || null,
      lvl4: titleParts[4] || null,
      lvl5: null,
      lvl6: null,
    };

    const anchor = doc.url.split("#")[1] || "";

    const objectID = doc.id;

    return {
      anchor,
      content: null,
      hierarchy,
      url: doc.url,
      title: doc.title,
      preview: doc.preview,
      category: doc.category,
      section: doc.section,
      objectID,
      _highlightResult: {
        hierarchy: {
          lvl0: {
            value: hierarchy.lvl0 || "",
            matchLevel: "none",
            matchedWords: [],
          },
          lvl1: {
            value: hierarchy.lvl1 || "",
            matchLevel: "full",
            fullyHighlighted: false,
            matchedWords: [hierarchy.lvl1?.toLowerCase()],
          },
        },
        hierarchy_camel: [
          {
            lvl0: {
              value: hierarchy.lvl0 || "",
              matchLevel: "none",
              matchedWords: [],
            },
            lvl1: {
              value: `<span class="algolia-docsearch-suggestion--highlight">${hierarchy.lvl1 || ""}</span>`,
              matchLevel: "full",
              fullyHighlighted: false,
              matchedWords: [hierarchy.lvl1?.toLowerCase()],
            },
          },
        ],
      },
    };
  });
}

async function queryGlobalSearch(query, n_results=10) {
  const baseUrl = 'https://global-search.cl-edu.com/search';  let urlEncodedQuery = encodeURIComponent(query);
  let url = `${baseUrl}?query=${urlEncodedQuery}&collections=imunify360_docs&n_results=${n_results}&source=imunify360_docs`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error querying global search:', error);
    return null;
  }
}

const loading = ref(false); // Reactive variable for loading state

const performSearch = async () => {
  loading.value = true; // Set loading to true when search starts
  const data = await queryGlobalSearch(props.modelValue, MAX_HITS_PER_PAGE);
  loading.value = false; // Set loading to false when search finishes
  if (data) {
    const hits = parseDocs(data);
    emit('result', hits);
    emit('openDrawer');
  }
}

watch(
  () => props.options,
  async (newValue) => {
    // Initialize if needed or any other dependent setup
  }, {
    immediate: true
  }
);
</script>

<style lang="stylus">
@import '../../styles/config.styl'
.algolia-autocomplete
  .ds-dropdown-menu
    display none !important

.drawer-header__search
  width: $searchWidth
  position relative
  border-radius: $homeSearchBorderRadius
  border none
  padding $searchVerticallyPadding $searchHorizontallyPadding
  color: $searchColorText;
  font-size: $searchColorFontSize
  line-height: 1rem
  outline: none

  &-icon
    position absolute
    top: 23%;
    right 5%
    cursor pointer

.drawer-header__wrapper
  display: flex;
  align-items center
  gap 2.5rem

.drawer-header__paragraph
  margin 0
  color $headerSearchTitleColor
  font-weight $headerSearchFontWeight
  font-size $headerSearchFontSize
  line-height 2.2375rem

.drawer-header__input
  position relative
  display: flex;
  justify-content center
  align-content center

@media (max-width: $mobileBreakpoint)
  .drawer-header__search
    width 100%
    box-sizing border-box
    padding 0.78125rem 2.375rem 0.78125rem 2rem
    margin-bottom 2.5625rem
    font-size 0.75rem

  .drawer-header__input
    width 100%
  .algolia-autocomplete
    width 100%

@media (max-width: $mobileBreakpoint) and (min-width: $mobileBreakpointForSearch)
  .drawer-header__input, .v-select .vs__dropdown-toggle
    width 75%
  .header-layout__search-title
    text-align center

.spinner
  border 4px solid rgba(0, 0, 0, 0.1)
  border-top 4px solid #6ccc93
  border-radius 50%
  width 20px
  height 20px
  animation spin 1s linear infinite

@keyframes spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
</style>