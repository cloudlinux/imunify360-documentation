<template>
  <div>
    <div class="drawer" :class="{'is-open': isOpenDrawer}">
      <div class="drawer-header">
        <div class="drawer-header__wrapper">
          <h2 class="drawer-header__paragraph">How can we help you?</h2>
          <div id="drawerSearch"></div>
        </div>
        <div class="drawer-cross">
          <img @click="onCloseDrawer" class="drawer-cross__img" :src="withBase('/global/cross.svg')" alt="cross">
          <p @click="onCloseDrawer" class="drawer-cross__text">close</p>
        </div>
      </div>
      <main>
        <div class="drawer-main">
          <div class="drawer-main__wrapper">
            <div class="drawer-main__breadcrumb">
              <!-- Optional breadcrumb can stay here -->
            </div>
            <DrawerSearchResult :modelValue="modelValue" :data="drawerArticleResult"/>
          </div>
        </div>
        <Footer v-if="isOpenDrawer && isMobileWidth" class="drawer-footer__mobile"/>
      </main>
    </div>
    <Footer v-if="isOpenDrawer && !isMobileWidth" class="drawer-footer"/>
  </div>
</template>

<script setup>
import { withBase } from "@vuepress/client";
import Footer from "../footer/Footer.vue";
import { computed, ref, watch } from "vue";
import DrawerSearchResult from "./DrawerSearchResult.vue";

const props = defineProps({
  isOpenDrawer: {
    type: Boolean,
    required: true,
    default: false
  },
  isMobileWidth: {
    type: Boolean,
    required: true,
    default: false
  },
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  homeLayoutSearchResult: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['closeDrawer', 'update:modelValue']);

const drawerArticleResult = computed(() => {
  return props.homeLayoutSearchResult; // Now directly returning all results since there are no tabs
});

const onCloseDrawer = () => {
  emit('closeDrawer');
}

watch(() => props.isOpenDrawer, () => {
  document.body.classList.toggle('disable-scroll', props.isOpenDrawer);
});
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.disable-scroll
  overflow hidden !important

.drawer
  position fixed
  top 0
  left 0
  width 100%
  height calc(100% - 102px)
  overflow-y auto
  z-index 1000
  box-sizing border-box
  background: $drawerHeaderBgColor
  opacity: 0;
  transform: translateY(-100%);
  transition: 0.4s ease;

  &-header
    padding 1.25rem $layout-horizontal-padding
    display flex
    justify-content space-between
    align-items center

    &__search
      width: $searchWidth
      position relative
      border-radius: $homeSearchBorderRadius
      border none
      padding $searchVerticallyPadding $searchHorizontallyPadding
      color: $searchColorText;
      font-size: $searchColorFontSize
      line-height: 1rem
      outline: none

    &__wrapper
      display: flex;
      align-items center
      gap 2.5rem

    &__paragraph
      margin 0
      color $headerSearchTitleColor
      font-weight $headerSearchFontWeight
      font-size $headerSearchFontSize
      line-height 2.2375rem

    &__input
      position relative
      display: flex;
      justify-content center
      align-content center

.drawer-cross
  margin-top 0.75rem
  display flex
  flex-direction column
  justify-content flex-end
  align-items center
  gap 0.6875rem

  &__img
    cursor pointer
    width $crossImgSize
    height: $crossImgSize

  &__text
    margin 0
    color $crossColor
    cursor pointer

.drawer-main
  background $drawerMainBackgroundColor
  padding $layout-vertical-padding  $layout-horizontal-padding
  margin-top $drawerMainMarginTop
  min-height 100vh

  &__breadcrumb__text
    font-size $drawerBreadcrumbFontSize
    color $drawerBreadcrumbColor
    line-height $drawerBreadcrumbLineHeight

  &__wrapper
    max-width $drawerMainMaxWidth
    margin-bottom $drawerMainMarginBottom


.drawer-footer
  position fixed !important
  bottom 0
  left 0
  width 100vw

.drawer-footer__mobile
  position static
  width 100vw


.is-open {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: $mobileBreakpoint)
  #drawerSearch
    width 100%

  .drawer
    height 100%
    &-footer
      position static
      width 100vw

    &-header
      align-items normal
      padding 1.875rem 1.25rem 0 1.25rem


      &__search-icon
        top 9% !important
        right 8% !important

        & > img
          width 1.563rem
          height 1.563rem

      &__wrapper
        width 100%
        flex-direction column
        gap 1.875rem

      &__paragraph
        width 100%

    &-cross
      position absolute
      right 0.625rem
      top 0.75rem
      margin-top 0
      gap 0.375rem
      justify-content flex-start
      &__text
        font-size 0.625rem
      &__img
        width 0.9375rem
        height 0.9375rem

    &-main
      margin-top 0
      padding 2.625rem 1.25rem 0 1.25rem
      min-height 100vh

      &__wrapper
        margin-bottom 0 !important
        padding-bottom 2.6875rem

      &__breadcrumb__text
         margin-top 0
         margin-bottom 2.625rem !important
      &__search-results
        display flex
        flex-direction column
        gap 2.8125rem

    .no_results
      margin 0
      font-size 1.25rem
</style>