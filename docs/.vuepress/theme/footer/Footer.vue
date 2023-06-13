<template>
  <div class="footer" :class="{'footer-default-layout': !isGlobalLayout}">
    <div class="footer__img">
      <a :href="cloudlinuxSite">
        <img :src="withBase(footerCustomLogo)"
             :alt="footerCustomAltText">
      </a>
    </div>
    <div class="footer-company-title">{{ year }}.
      CloudLinux Inc
    </div>

    <div class="social">
      <div class="social_links">
        <a v-for="item in locales.bottomLinks" :href="item.url" target="_blank">{{ item.text }}</a>
      </div>
      <span class="footer-social-text">{{ locales.stayInTouch }}</span>
      <div class="social-icons-wrapper">
        <a v-for="item in social" class="social-icons-link" :href="item?.url" target="_blank">
          <img v-if="item.icon" class="social-icons-link-img" :src="withBase(item?.icon)" alt="footer logo"/>
        </a>
      </div>
    </div>
  </div>
</template>


<script setup>
import {computed, inject} from "vue";
import {usePageFrontmatter, withBase} from "@vuepress/client";

const {social, cloudlinuxSite, footerCustomLogo, footerCustomAltText, locales} = inject('themeConfig');
const frontmatter = usePageFrontmatter()

const year = computed(() => (new Date()).getFullYear());
const isGlobalLayout = computed(() => frontmatter.value.layout === 'HomeLayout');
</script>
<style lang="stylus" scoped>
@import '../../styles/config.styl'

.footer
  box-sizing border-box
  padding $layout-vertical-padding 1rem $layout-vertical-padding $layout-horizontal-padding
  color $textColor
  border-top 1px solid $borderColor
  height $footerHeight
  background #fff
  display flex
  align-items center
  justify-content space-between


  &-company-title
    font-size 0.8rem
    color $footerCompanyTitle

.social
  display flex
  justify-content center
  align-items center

  &_links
    display: flex;
    align-items center
    justify-content space-between
    gap 1.375rem
    margin-right: 1.1rem

  &-icons-wrapper
    display: flex;
    align-items center
    justify-content space-between

  .social_links a
    color: $colorLink

  .footer-social-text
    margin-right 0.8125rem
    line-height 1.25rem
    padding-left 0.75rem
    border-left 1px solid #ccc

  &-icons-link
    display: flex
    height 3.125rem

    &-img
      width 100%
      height 100%

.footer-default-layout
  position static
  width 100%

.sidebar-width
  width $sidebarWidth + 2rem

@media (max-width:$mobileBreakpoint)
  .footer
    flex-direction column
    height fit-content
    justify-content flex-start

    &__img
      order 4
      margin-top 2.5rem

    &-company-title
      order 5
    &-social-text
      border-left none !important

  .social
    gap 1.5625rem
    margin-top 1.25rem
    flex-direction column
</style>
