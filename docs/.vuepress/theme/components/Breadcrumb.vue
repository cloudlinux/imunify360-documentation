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

const page = usePageData();
const site = useSiteData();
const { locales: { siteTitle } } = inject("themeConfig");

// Title mapping for specific paths
const titleMap = {
  '/billing/': 'Billing',
  '/command_line_interface/': 'Command Line Interface',
  '/config_file_description/': 'Config File Description',
  '/control_panel_integration/': 'Control Panel Integration',
  '/dashboard/': 'Dashboard',
  '/email/': 'Email',
  '/faq_and_known_issues/': 'FAQ and Known Issues',
  '/features/': 'Features',
  '/ids_integration/': 'IDS Integration',
  '/imunify_patch/': 'Imunify Patch',
  '/imunifyav/': 'ImunifyAV',
  '/installation/': 'Installation',
  '/introduction/': 'Introduction',
  '/localization/': 'Localization',
  '/myimunify/': 'MyImunify',
  '/patchman/': 'Patchman',
  '/terminology/': 'Terminology',
  '/uninstall/': 'Uninstall',
  '/update/': 'Update',
  '/user_interface/': 'User Interface',
  '/whmcs_plugin/': 'WHMCS Plugin',
  '/wordpress_plugin/': 'WordPress Plugin',
};

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
      title = titleMap[fullPath] || fullPath;
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
      color #1994f9

  &:last-child
    cursor default
    color $breadcrumbColor

.breadcrumb-title
  color $breadcrumbColor
  font-weight 600
  margin-right 2px
</style>
