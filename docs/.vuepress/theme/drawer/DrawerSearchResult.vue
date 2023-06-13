<template>
  <section v-if="data.length" class="drawer-main__search-results">
    <template v-for="(i) in visibleResults" :key="i">
      <div class="search-result" @click="gotTo(i?.url || '/')">
        <div class="search-result__title" v-html="getTitleForArticle(i._highlightResult?.hierarchy)"/>
        <div class="search-result__breadcrumb" v-html="getBreadcrumbsForArticle(i._highlightResult?.hierarchy)"/>
        <div class="search-result__text" v-html="i._highlightResult?.content?.value"></div>
      </div>
    </template>
  </section>
  <div v-if="data.length">
    <div v-if="countOfHiddenResults" class="hidden_results" @click="showAllHiddenResult">
      <p class="hidden_results__text">Show all results({{ countOfHiddenResults }})</p>
    </div>
    <div v-else-if="!countOfHiddenResults && isShowAllResult" class="hidden_results" @click="collapseResults">
      <p class="hidden_results__text">Collapse results</p>
    </div>
  </div>
  <div v-else>
    <p v-if="!modelValue.length" class="no_results">What are you searching for?</p>
    <p v-else class="no_results">
      Sorry! No results found for
      <span v-if="modelValue">"{{ modelValue }}"</span>
      😞<br/>Please try ask the community on our forum
      <a class="no_results__link" href=" https://forum.cloudlinux.com/" target="_blank">https://forum.cloudlinux.com/</a>.
    </p>
  </div>
</template>

<script setup>
import {computed, inject, ref} from "vue";

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})
const { MAX_ALGOLIA_VISIBLE_RESULT, MAX_ALGOLIA_VISIBLE_ROWS } = inject('themeConfig')
const isShowAllResult = ref(false);

const gotTo = (url) => {
 window.location.href = url;
}

const visibleResults = computed(() => {
  if (isShowAllResult.value) {
    return props.data;
  }
  return props.data?.slice(0, MAX_ALGOLIA_VISIBLE_RESULT);
})

const countOfHiddenResults = computed(() => {
  return props.data.length - visibleResults.value.length;
})

const showAllHiddenResult = () => {
  isShowAllResult.value = true;
}

const collapseResults = () => {
  isShowAllResult.value = false;

}

const getTitleForArticle = (obj) => {
  for (const key in obj) {
    if (obj[key].value !== null || obj[key].value !== undefined) {
      return obj['lvl1']?.value || obj['lvl0']?.value
    }
  }
  return null;
}

const getBreadcrumbsForArticle = (obj) => {
  return Object.values(obj).slice(2).filter(Boolean).map((content) => content.value).join(' > ')
}

</script>

<style lang="stylus">
@import '../../styles/config.styl'

.algolia-docsearch-suggestion--highlight
  background $drawerHighlightTextBgColor !important
  color $drawerHighlightTextColor !important


.drawer-main__search-results
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: $drawerSearchColumnGap;
  row-gap $drawerSearchRowGap

.search-result
  display flex
  flex-direction column
  align-items flex-start
  justify-content flex-start
  gap $drawerOneSearchResultGap
  width fit-content
  cursor pointer

  &:hover
    .search-result__title
      color $mainColor
      text-decoration underline

  &__title
    font-size $drawerSearchResultTitleFontSize
    font-weight $drawerSearchResultTitleWeight
    line-height $drawerSearchResultTitleLineHeight
    color $drawerSearchResultTitleColor
    margin 0
    &:hover
      color $mainColor
      text-decoration underline


  &__text
    font-size $drawerSearchResultTextFontSize
    line-height $drawerSearchResultTextLineHeight
    color $drawerSearchResultTextColor
    margin 0
    overflow: hidden
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: v-bind(MAX_ALGOLIA_VISIBLE_ROWS)
    -webkit-box-decoration-break: clone
    box-decoration-break: clone

  &__breadcrumb
    font-size $drawerSearchResultBreadcrumbTextSize
    line-height $drawerSearchResultBreadcrumbLineHeight
    color $drawerSearchResultBreadcrumbColor
    margin 0

.hidden_results
  width: $drawerHiddenResultWidth
  background $drawerHiddenResultBgColor
  display: flex;
  align-items center
  justify-content center
  margin-top 3.5rem
  cursor pointer

  &__text
    font-size $drawerHiddenResultFontSize
    font-weight 500
    line-height 1.019rem
    color $drawerHiddenResultColor

.no_results
  font-size 1.5625rem
  &__link
    &:hover
      text-decoration underline

@media (max-width: $mobileBreakpoint)
  .hidden_results
    margin-top 2.5rem
    margin-bottom 0
    font-size 1.25rem
</style>