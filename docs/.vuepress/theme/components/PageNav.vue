<template>
  <div class="page-nav" v-if="prev || next">
    <router-link
        v-if="prev"
        class="nav-arrow left"
        :to="prev.path"
    >
    </router-link>

    <router-link
        v-if="next"
        class="nav-arrow right"
        :to="next.path"
    >
    </router-link>
  </div>
</template>

<script setup>
import {resolvePage} from '../util'
import {computed} from "vue";
import {usePageData, useRouteLocale, useSiteData} from "@vuepress/client";

const props = defineProps({
  sidebarItems: {
    type: Array,
    default: () => []
  },
    allPages: {
        type: Array
    }
})

const site = useSiteData()
const route = useRouteLocale()
const page = usePageData()

const prev = computed(() => {
  const prev = page.value.frontmatter.prev
  if (prev === false) return null
  else if (prev) return resolvePage(props.allPages, prev, route)
  else return resolvePrev(page.value, props.sidebarItems)
})



const next = computed(() => {
  const next = page.value.frontmatter.next
  if (next === false) return null
  else if (next) return resolvePage(props.allPages, next, route)
  else return resolveNext(page.value, props.sidebarItems)
})

const resolvePrev = (page, items) => find(page, items, -1)

const resolveNext = (page, items) => find(page, items, 1)

const find = (page, items, offset) => {
  const res = [];
  items.forEach(item => {
    if (item.type === 'group') res.push(...item.children || [])
    else res.push(item)
  });
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur?.type === 'page' && cur.path === page.path) return res[i + offset]
  }
}
</script>

<style lang="stylus">
@import '../../styles/config.styl'
@require '../../styles/wrapper.styl'
@import "../../styles/theme.styl"

.page-nav
  @extend $wrapper
  margin 0
  padding 0
  display flex
  position absolute
  right 0
  top 1.875rem

@media (max-width: $mobileBreakpoint)
  .page-nav
    top 0
</style>
