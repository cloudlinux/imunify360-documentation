<template>
  <div class="back-to-top">
    <a :class="{ active: isVisible }" class="nav-arrow top back-to-top__link" @click="goToTop">
      <span class="back-to-top__link-span">Scroll up</span>
    </a>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  boundary: {
    type: Number,
    default: 200
  },
})
const isVisible = ref(false);

const handleScroll = () => {
  if(window)  isVisible.value = window.pageYOffset > props.boundary;
}
const goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

onMounted(() => {
  if (window) {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }
})

onUnmounted(() => {
  if (window) window.removeEventListener('scroll', handleScroll);
})
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'
.back-to-top__link
  position fixed
  right 6rem
  bottom 10rem
  visibility hidden
  opacity 0
  transition visibility 0s, opacity 0.5s linear
  cursor pointer
  z-index 10
  text-underline none

  &-span
    position absolute
    left 8px
    font-weight 400
    bottom 0
    font-size 0.75rem
    line-height $text-default
    color black

  &.active
    visibility visible
    opacity 1

@media (max-width: $mobileBreakpoint)
  .back-to-top__link
    right 1rem;

</style>
