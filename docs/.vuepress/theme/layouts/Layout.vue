<template>
  <div class="theme-container">
    <HeaderLayout  :closeSidebarDrawer="pageRef?.closeSidebarDrawer" :isMobileWidth="isMobileWidth"/>
    <Sidebar
        v-if="allPages.length && !pageRef?.isOpenMobileSidebarMenu && !isMobileWidth"
        :items="allPages"
        :closeSidebarDrawer="pageRef?.closeSidebarDrawer"
    >
      <template #top>
        <div v-if="documents" class="sidebar-header">
          <p class="sidebar-header__paragraph">Select Imunify docs</p>
          <DSelect
              with-icon
              v-model="selectedValue"
              @changeSidebarItems="changeSidebarItems"
              :options="documents"
          />
        </div>
      </template>
    </Sidebar>
    <Page ref="pageRef"
          :sidebarItems="sidebarItems"
          :allPages="allPages"
          :isMobileWidth="isMobileWidth"
    />
    <SidebarDrawer
        v-if="allPages.length && pageRef?.isOpenMobileSidebarMenu && isMobileWidth"
        @changeSidebarItems="changeSidebarItems"
        :all-pages="allPages"
        :documents="documents"
        v-model="selectedValue"
        :closeSidebarDrawer="pageRef?.closeSidebarDrawer"
        :isMobileWidth="isMobileWidth"
    />
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '../footer/Footer.vue'
import Sidebar from "../sidebar/Sidebar.vue";
import SidebarDrawer from "../sidebar/SidebarDrawer.vue";
import HeaderLayout from "../header/HeaderLayout.vue";
import Page from "../components/Page.vue";
import DSelect from "../components/DSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, inject, onMounted, onUnmounted, ref} from "vue";
import { usePageData } from "@vuepress/client";
import {pagesData} from "../../.temp/internal/pagesData.js";
import {resolveSidebarItems} from "../util.js";

const { documents,MOBILE_BREAKPOINT } = inject('themeConfig')

const pageRef = ref(null);
const selectedValue = ref(null);
const router = useRouter();
const route = useRoute();
const page = usePageData()
const allPages = ref([])

const isMobileWidth = ref(false);
const sidebarItems = computed(() => page.value && allPages.value.length ? resolveSidebarItems(page.value, route, allPages.value) : [])

const changeSidebarItems = (e) => router.push(e.link)

const getStartedString = () => {
  const str = page.value?.path
  const index = str.indexOf("/", str.indexOf("/") + 1);
  return str.substr(0, index);
}

const handleResize = () => {
  isMobileWidth.value = window.innerWidth <= MOBILE_BREAKPOINT;
};

onMounted(() => {
  Object.values(pagesData).map(f => f().then(res => {
    allPages.value.push(res)
  }))
  selectedValue.value = documents.find((item) => item.link?.startsWith(getStartedString()));
  window.addEventListener('resize', handleResize);
  isMobileWidth.value = window.innerWidth <= MOBILE_BREAKPOINT;
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../../styles/theme.styl" lang="stylus"></style>
<style lang="stylus">
@import "../../styles/config.styl";
.sidebar-header
  padding: 0 0.625rem 0 1.25rem

  &__paragraph
    font-size 0.875rem
    font-weight 500
    color $layoutParagraphColor
    line-height 1.25rem
    margin 1.25rem 0 0.5rem 0

  &__select
    width 100%
    border 1px solid $selectBorderColor
    outline none
    padding 0.625rem 0.625rem 0.625rem 1rem
    border-radius 0.5rem
</style>