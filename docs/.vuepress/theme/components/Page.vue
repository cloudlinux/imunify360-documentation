<template>
  <div class="page">
    <slot name="top"/>

    <Breadcrumb class="page-breadcrumb"/>

    <img @click="openMobileSidebarMenu"
         class="page-mobile__sidebar-menu"
         :src="withBase('/global/sidebar-menu.svg')"
         alt="sidebar hamburger menu"
    />

    <div class="page-nav-wrapper">
      <PageNav :sidebar-items="sidebarItems" :allPages="allPages"/>
    </div>

    <Content class="content" :custom="false"/>

    <div v-if="allowGithubEdit" class="page-edit">
      <div class="edit-link">
        <img :src="withBase(githubEditIcon)" alt="icon pen"/>
        <a
            :href="editLink"
            target="_blank"
            rel="noopener noreferrer"
        >{{ isEditLinkText }}</a>
      </div>
    </div>

    <BackToTop/>

    <slot name="bottom"/>
  </div>
</template>

<script setup>
import {endingSlashRE, normalize, outboundRE} from '../util'
import BackToTop from './BackToTop.vue';
import {usePageData, usePageFrontmatter, usePageLang, withBase} from "@vuepress/client";
import {computed, inject, ref} from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import PageNav from "./PageNav.vue";

const {
  githubEditIcon, githubRepository, allowGithubEdit,
  githubMainDir = '',
  githubBranch = 'master',
  docsRepo = githubRepository,
  editLinkText
} = inject('themeConfig')

const props = defineProps({
  sidebarItems: {
    type: Array,
    default: () => []
  },
  allPages: {
    type: Array,
    default: () => []
  },
  isMobileWidth: {
    type: Boolean,
  }
})

const page = usePageData()
const lang = usePageLang()
const frontmatter = usePageFrontmatter()

const isOpenMobileSidebarMenu = ref(props.isMobileWidth)

const openMobileSidebarMenu = () => isOpenMobileSidebarMenu.value = true
const closeSidebarDrawer = () => isOpenMobileSidebarMenu.value = false

const editLink = computed(() => {
  if (frontmatter.value.editLink === false) return
  let path = normalize(page.value.path)
  if (endingSlashRE.test(path)) {
    path += 'README.md'
  } else {
    path += '.md'
  }
  if (docsRepo && allowGithubEdit) {
    return createEditLink(githubRepository, docsRepo, githubMainDir, githubBranch, path)
  }
})

const isEditLinkText = computed(() => editLinkText || 'Edit this page')

const createEditLink = (githubRepository, docsRepo, githubMainDir, githubBranch, path) => {
  const bitbucket = /bitbucket.org/
  if (bitbucket.test(githubRepository)) {
    const base = outboundRE.test(docsRepo)
        ? docsRepo
        : githubRepository
    return (
        base.replace(endingSlashRE, '') +
        `/${githubBranch}` +
        (githubMainDir ? '/' + githubMainDir.replace(endingSlashRE, '') : '') +
        path +
        `?mode=edit&spa=0&at=${githubBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`

  return (
      base.replace(endingSlashRE, '') +
      `/tree/${githubBranch}` +
      (githubMainDir ? '/' + githubMainDir.replace(endingSlashRE, '') : '') +
      path
  )
}


defineExpose({
  isOpenMobileSidebarMenu,
  closeSidebarDrawer
})
</script>

<style lang="stylus">
@import '../../styles/config.styl'
@require '../../styles/wrapper.styl'

.page
  padding-bottom 2rem
  padding-top 6rem

  &-mobile__sidebar-menu
    display none

  &-breadcrumb
    margin-left 3rem

  &-nav-wrapper
    max-width: 847px;
    margin: 0 3rem;
    position relative

  &-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto

    .edit-link
      display flex
      align-items center
      gap 5px

      a
        color $mainColor
        font-weight 600
        font-size $text-default
        line-height 1rem
        margin-right 0.25rem

    .last-updated
      float right
      font-size 0.9em

      .prefix
        font-weight 500
        color lighten($textColor, 25%)

      .time
        font-weight 400
        color #aaa

.content
  h1
    max-width 80%

@media (max-width: $mobileBreakpoint)
  .page
    padding 1.5rem 1.25rem 2.28125rem 1.25rem !important
    margin-top 4.375rem
    margin-bottom 18.5rem

    &-edit
      margin 0 !important
      padding 0 !important

    &-mobile__sidebar-menu
      display block
      margin-top 0.8125rem
      margin-bottom 1.4375rem
      cursor pointer

    &-breadcrumb
     margin-left 0

    &-nav-wrapper
      margin 0
      width 100%
</style>
