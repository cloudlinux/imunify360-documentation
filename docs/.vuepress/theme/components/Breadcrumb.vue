<template>
  <div class="breadcrumb-wrapper">
    <router-link
      v-for="(crumb, index) in breadCrumbs"
      :key="crumb.path"
      class="breadcrumb"
      :to="crumb.path"
    >
      {{ crumb.title }}
    </router-link>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { usePageData, useSiteData } from "@vuepress/client";
import documents from "../../config-client/documents";

const page = usePageData();
const site = useSiteData();
const { locales: { siteTitle } } = inject("themeConfig");

// Generate title mapping from documents
const titleMap = computed(() => {
  const map = {};
  documents.forEach(doc => {
    map[doc.link] = doc.title;
  });
  return map;
});

const breadCrumbs = computed(() => {
  const segments = page.value.path.split("/").filter(Boolean);
  const crumbs = [{ path: "/", title: siteTitle || "Documentation" }];
  let cumulativePath = "";

  for (let i = 0; i < segments.length; i++) {
    cumulativePath += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    const fullPath = cumulativePath.endsWith(".html") ? cumulativePath : `${cumulativePath}/`;

    let title;

    if (isLast) {
      title = page.value.title;
    } else {
      title = titleMap.value[fullPath] || fullPath;
    }

    crumbs.push({ path: fullPath, title });
  }

  return crumbs;
});
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'

.breadcrumb
  color $breadcrumbColor
  text-decoration none

  &:not(:last-child)::after
    content " > "
    font-family inherit
    font-size inherit
    color $breadcrumbColor

  &:not(:last-child)
    cursor pointer

    &:hover
      color $accentColor

  &:last-child
    cursor default
    color $breadcrumbColor

.breadcrumb-title
  color $breadcrumbColor
  font-weight 600
  margin-right 2px
</style>
