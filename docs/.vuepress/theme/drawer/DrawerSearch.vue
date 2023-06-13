<template>
  <form id="search-form" class="drawer-header__input">
    <input :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           id="algolia-search-input"
           :placeholder="placeholder"
           :class="activeSearchClass"
           @keypress.enter.prevent="$emit('openDrawer')"
    />
    <div :class="activeSearchIconClass">
      <img @click="$emit('openDrawer')" alt="search icon" :src="withBase(activeSearchIcon)"/>
    </div>
  </form>
</template>

<script setup>
import {usePageFrontmatter, withBase} from "@vuepress/client";
import {computed, inject, watch} from "vue";
const { MAX_ALGOLIA_HITS_PER_PAGE } = inject('themeConfig')


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
  return props.isMobileWidth ? 'Search accross all Imunify Security support' : placeholderDesktop.value
})


const initialize = async (userOptions) => {
  if( typeof window === 'undefined' ) return
  const [docsearchModule] = await Promise.all([
    import(/* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.js"),
    import(/* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.css"),
  ]);
  const docsearch = docsearchModule.default;
  docsearch(
      Object.assign({}, userOptions, {
        inputSelector: "#algolia-search-input",
        algoliaOptions: {
            hitsPerPage: MAX_ALGOLIA_HITS_PER_PAGE,
        },
        handleSelected: () => {
          emit('openDrawer')
        },
        transformData: (hits) => {
          emit('result', hits)
        },
      })
  );
};
watch(
    () => props.options,
    async (newValue) => {
     await initialize(newValue);
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
</style>
