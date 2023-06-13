<template>
  <VueSelect
      ref="dropdown"
      @update:model-value="changeSidebarItems"
      :model-value="modelValue"
      label="title"
      value="link"
      :clearable="false"
      :searchable="false"
      :options="options"
  >
    <template #open-indicator="{ attributes }">
      <div v-if="withIcon" class="select-icon" v-bind="attributes">
        <img :src="withBase(searchSelectIcon)" alt="search Icon"/>
      </div>
      <span v-else/>
    </template>
  </VueSelect>
</template>

<script setup>
import VueSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import {inject, onMounted, onUnmounted, ref} from "vue";
import {withBase} from "@vuepress/client";

defineProps({
  withIcon: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Object,
    default: () => ({
      label: '',
      value: ''
    })
  },
  options: {
    type: Array,
    default: () => []
  }
})
const {searchSelectIcon} = inject("themeConfig")
const emit = defineEmits(['changeSidebarItems', 'update:selectedValue', 'update:model-value'])

const changeSidebarItems = (e) => {
  emit('changeSidebarItems', e)
  emit('update:model-value', e)
}
const dropdown = ref();
const closeDropdown = () => {
  if (!dropdown.value) return
  dropdown.value.open = false
}
onMounted(() => window.addEventListener('click', (event) => {
  if (!dropdown.value?.$el.contains(event.target)) closeDropdown()
}))
onUnmounted(() => window.removeEventListener('click', closeDropdown))
</script>

<style lang="stylus">
@import '../../styles/config.styl'
.v-select
  .vs__selected-options
    padding 0.3125rem 0 0.3125rem 0.6875rem

  .vs__dropdown-option
    padding-left 1.125rem !important

  .vs__selected
    display block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 12.5rem

  .vs__search
    display none

  .vs__dropdown
    &-toggle
      width 100%
      height 2.6875rem
      border 1px solid $selectBorderColor
      outline none
      border-radius $selectBorderRadius
      background white

    &-menu
      margin-top 0.3125rem
      border-radius 0.25rem

    &-option
      padding 0.5rem

  .select-icon
    margin-right 1rem

@media (max-width: $mobileBreakpoint)
  .v-select
    .vs__selected
      margin 0
      border 0

      &-options
        padding 0.625rem 0 0.3125rem 1rem
</style>