<template>
  <div class="header-products-wrapper">
    <div ref="menu" class="dropdown">
     <teleport v-if="isMobileWidth" to="body">
       <div v-if="openedMenu" class="dropdown-wrapper">
         <p class="dropdown-content__paragraph" v-for="product in productsList" :key="product">
           <a class="dropdown-content__link" href="#">{{ product }}</a>
         </p>
       </div>
     </teleport>
      <div v-if="openedMenu && !isMobileWidth" class="dropdown-wrapper">
        <p class="dropdown-content__paragraph" v-for="product in productsList" :key="product">
          <a class="dropdown-content__link" href="#">{{ product }}</a>
        </p>
      </div>
      <div @click="openedMenu = !openedMenu" class="header-products-container">
        <img class="header-products-container__img" alt="hamburger menu" :src="withBase('/global/hamburger-menu.svg')">
        <p class="header-products-wrapper-paragraph">{{ productsTitle }}</p>
        <img class="products-icon__default"
             :class="{'products-icon__rotate': openedMenu}"
             width="10" height="8"
             :src="withBase(arrowDownIcon)"
             alt="arrow down icon"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {withBase} from "@vuepress/client";
import {inject, onMounted, onUnmounted, ref} from "vue";
defineProps({
  isMobileWidth: {
    type: Boolean,
  },
})
const {productsTitle, arrowDownIcon, productsList} = inject('themeConfig');

const openedMenu = ref(false)
const menu = ref(null)

const clickOutside = (event) => {
  !event.composedPath().includes(menu.value) && (openedMenu.value = false)
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.header-products-wrapper
  display: flex;
  align-items center
  justify-content space-between
  gap 0.75rem
  margin-right 1.5625rem

  &-paragraph
    font-size $text-default
    cursor pointer
    line-height 1rem
    color white

.header-products-container
  display: flex;
  align-items center
  gap 0.875rem

  &__img
    display none

.dropbtn
  color: black;
  font-size: 0.8125rem
  line-height 0.9375rem
  border: none;
  cursor: pointer;

.dropdown
  position: relative;
  display: inline-block;

  & > img
    cursor pointer

.dropdown-wrapper
  display: block;
  position: absolute;
  background-color: $dropdownBgColor;
  min-width: 12.5rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 9999;
  left: -7.3125rem;
  top: 2.6875rem;

.dropdown-content__paragraph
  color: black;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  display: block;
  cursor pointer
  margin 0

.dropdown .dropdown-wrapper
  display: block;


.dropdown-content__link
  color black
  text-decoration none

.dropdown-wrapper p:hover
  background-color: white;

.products-icon
  &__rotate
    cursor pointer
    transform rotate(180deg)
    transition-duration 500ms

  &__default
    cursor pointer
    transition-duration 500ms

@media (max-width: $mobileBreakpoint)
  .dropdown-wrapper
    top 2.6875rem
    left 9.6875rem

  .products-icon__default
    display: none

  .header-products-wrapper
    margin-right 0
    &-paragraph
      display: none

  .header-products-container__img
    display block
</style>