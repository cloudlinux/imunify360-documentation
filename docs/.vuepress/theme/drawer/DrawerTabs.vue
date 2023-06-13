<template>
  <div class="drawer-tabs__wrapper">
    <div
        v-for="(item, index) in data"
        :key="index"
        @click="selectTab(index)"
        :class="{ 'drawer-tab__active': modelValue === index }"
        class="drawer-tab"
    >
      <div class="drawer-tab__text" :class="{ 'drawer-tab__text__active': modelValue === index }">
        {{ item.title }} ({{ item?.numberResults }})
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: Number,
    default: -1
  }
})
const emit = defineEmits(['update:modelValue'])

const selectTab = (index) => {
  emit('update:modelValue', index);
}
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'
.drawer-tabs__wrapper
  display flex
  padding 0 $layout-horizontal-padding
  align-items center
  margin-top $drawerTabsMarginTop
  gap 1px
  margin-bottom $drawerTabsMarginBottom

.drawer-tab
  cursor pointer
  display flex
  align-items center
  justify-content center
  padding $drawerTabActivePaddingVertically $drawerTabActivePaddingHorizontally
  background transparent


  &__active
    background $drawerTabActiveBgColor !important
    border-radius $drawerTabActiveBorderRadius
    margin 0
    padding $drawerTabActivePaddingVertically $drawerTabActivePaddingHorizontally

  &__text
    font-size $drawerTabTextSize
    line-height 1.01125rem
    color $drawerTabTextColor
    margin 0

  &__text__active
    color $drawerTabActiveTextColor !important
    font-size $drawerTabTextSize
    line-height 0.939375rem

@media (max-width: $mobileBreakpoint)
  .drawer-tab
    text-align center
    padding $drawerTabPaddingVerticallyMobile $drawerTabPaddingHorizontallyMobile
    box-sizing border-box
    height $drawerTabsMaxHeight


    &__active
      padding $drawerTabActivePaddingVerticallyMobile $drawerTabActivePaddingHorizontallyMobile
      text-align center
      box-sizing border-box
      height $drawerTabsMaxHeight

  .drawer-tabs__wrapper
    padding 0 1.25rem 1.25rem 1.25rem
    flex-wrap wrap
    align-items: center
    justify-content: flex-start
    margin 0
    display: grid !important
    grid-template-columns: 1fr 1fr;
</style>