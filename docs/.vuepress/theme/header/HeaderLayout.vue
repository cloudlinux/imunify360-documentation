<template>
  <header class="navbar" :class="{'fixed': !isGlobalLayout}">
    <div class="navbar-header">
      <div class="navbar-header__logo-wrapper">
        <router-link
            :to="homeUrl"
            class="home-link"
        >
          <img
              class="logo"
              v-if="siteLogo"
              :src="withBase(siteLogo)"
              alt="logo header"
          >
        </router-link>
        <HeaderLayoutSearch
            v-if="!isGlobalLayout"
            :closeSidebarDrawer="closeSidebarDrawer"
            ref="headerLayoutSearch"
            :class="{'header-mobile__hidden': !headerLayoutSearch?.mobileDrawerVisible}"
            :isMobileWidth="isMobileWidth"
        />
      </div>
      <div
          class="links"
          :style="{ 'max-width': linksWrapMaxWidth + 'px'}"
      >
        <img @click="openMobileAlgoliaDrawer" class="navbar-header__mobile-search" :src="withBase(headerDefaultSearchIcon)" alt="icon image"/>
        <HeaderProducts :isMobileWidth="isMobileWidth"/>

        <a v-for="item in locales.navbarLinks"
        :href="item.url"
        target="_blank"
        :class="item.class"
        @click="onClick(item.event)">{{ item.text }}</a>

      </div>
    </div>
    <HeaderLayoutSearch
        v-if="isGlobalLayout"
        :closeSidebarDrawer="closeSidebarDrawer"
        ref="headerLayoutSearch"
        :isMobileWidth="isMobileWidth"
        />
  </header>
</template>

<script setup>
import HeaderLayoutSearch from "./HeaderLayoutSearch.vue";
import HeaderProducts from "./HeaderProducts.vue";
import {computed, inject, ref} from "vue";
import {usePageFrontmatter, useRouteLocale,withBase} from "@vuepress/client";

const props = defineProps({
  isMobileWidth: {
    type: Boolean,
  },
  closeSidebarDrawer: {
    type: Function,
  }
})

const {siteLogo,  defaultURL, locales, headerDefaultSearchIcon} = inject('themeConfig');
const linksWrapMaxWidth = ref(null)
const frontmatter = usePageFrontmatter()
const localePath = useRouteLocale()
const headerLayoutSearch = ref(null)

const openMobileAlgoliaDrawer = () => headerLayoutSearch?.value?.openDrawer()

const isGlobalLayout = computed(() => frontmatter.value.layout === 'HomeLayout')

const homeUrl = computed(() => {
  const defaultUrl = localePath.value + defaultURL;
  // remove double slashes from path if any
  return defaultUrl.replace(/\/+/g, '/');
})

const onClick = (event) => {
  if (event && event.type) {
    switch (event.type) {
        case 'event':
          var event = new CustomEvent(event.name);
          document.dispatchEvent(event);
      }
  }
}

</script>

<style src="../../styles/theme.styl" lang="stylus"></style>
<style lang="stylus">
@import '../../styles/config.styl'

.navbar
  padding $layout-vertical-padding $layout-horizontal-padding
  line-height $navbarHeight - 1.5rem
  display flex;
  flex-direction column
  margin-bottom 3.125rem
  z-index 99

  &-header__mobile-search
    display none

  &-header__logo-wrapper
    display flex
    align-items center
    justify-content space-between
    gap: 2.5rem


  .logo
    height $navbarHeight - 1.6rem
    min-width $navbarHeight - 1.4rem
    margin-right 1.5rem
    vertical-align top

  .links
    box-sizing border-box
    background-color $mainColor
    white-space nowrap
    font-size 0.9rem
    display flex
    gap 0.625rem

    .nav-links
      flex 1

.navbar-header
  display flex
  align-items center
  justify-content space-between

.fixed
  width 100%
  position fixed

.btn
  padding 0.7rem 1.6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $mainColor;
  border: 2px solid $buttonBorderColor;
  border-radius: 4px;
  font-size: 0.88rem;
  line-height: 1rem;
  color: $buttonTextColor;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  font-weight 600

.btn-white
  background-color: white;
  color black
  font-size 0.9375rem
  font-weight 500
  line-height 1rem


@media (max-width: $mobileBreakpoint)
  .navbar
    padding  $layout-vertical-padding 1.25rem
    margin-bottom 0
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.22);
    z-index 9999

    &-header__mobile-search
      display block
      margin-right 1.25rem
  .links > a
    display none !important
  .header-mobile__hidden
    display none !important
</style>
