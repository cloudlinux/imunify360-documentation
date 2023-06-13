<template>
  <div class="breadcrumb-wrapper">
      <span class="breadcrumb-title">{{ siteTitle }}:</span>
    <router-link class="breadcrumb" v-for="crumb in breadCrumbs" :key="crumb.path" :to="crumb.path">
      {{ crumb.title }}
    </router-link>
  </div>
</template>

<script setup>
import {computed, inject} from "vue";
import {usePageData, useSiteData} from "@vuepress/client";

const page = usePageData()
const site = useSiteData()
const { locales: {siteTitle}} = inject("themeConfig")
const breadCrumbs = computed(() => {
    const crumbs = [];
    if (page.value.path !== '/') {
      crumbs.push({path: page.value.path, title: page.value.title});
    }
  return crumbs;
});
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'

.breadcrumb
  color $breadcrumbColor

  &::after
    content " > "
    font-family inherit
    font-size inherit

  &:last-child
    cursor default

.breadcrumb-title
  color $breadcrumbColor
  font-weight 600
  margin-right 2px
</style>
