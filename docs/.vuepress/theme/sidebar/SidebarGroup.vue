<template>
  <div
      class="sidebar-group"
      :class="{ first, collapsable }"
  >
    <DropdownTransition>
      <ul
          ref="items"
          class="sidebar-group-items"
          v-if="open || !collapsable"
      >
        <li v-for="child in item?.children">
          <SidebarLink :closeSidebarDrawer="closeSidebarDrawer" :item="child"/>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script setup>
import SidebarLink from './SidebarLink.vue'
import DropdownTransition from "../components/DropdownTransition.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  first: {
    type: Boolean,
    required: true
  },
  open: {
    type: Boolean,
    required: true
  },
  collapsable: {
    type: Boolean,
    required: true
  },
  closeSidebarDrawer:{
    type: Function,
    default: () => {}
  }
})
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.sidebar-group
  &:not(.first)
    margin-top 1em

  .sidebar-group
    padding-left 0.5em

  &:not(.collapsable)
    .sidebar-heading
      cursor auto
      color inherit

.sidebar-heading
  color $sidebarHeadingColorText
  cursor pointer
  font-size 0.95em
  padding 0 1.5rem
  margin 0 1.2rem 1.5rem 1.6rem
  height 2.5625rem
  line-height 2.5625rem
  background-color #f2f4f5
  border-radius 4px
  font-weight 600

  &.open, &:hover
    color inherit

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.open .arrow
    top -0.18em

.sidebar-group-items
  transition height .1s ease-out
  overflow hidden
</style>
