<template>
  <div class="docs-cards-wrapper">
    <template v-for="(card, index) in documents" :key="index">
      <DocsCard :card="card" />
    </template>
  </div>
</template>

<script setup>
import DocsCard from "./DocsCard.vue"
import { inject } from "vue";
const { documents } = inject('themeConfig')
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.docs-cards-wrapper
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: $cardsBetweenWidth
  max-width 1170px
  margin 0 auto
  margin-bottom 14rem

  @media (max-width: $mobileBreakpoint)
    padding 0 1.25rem
    display flex
    flex-direction column
    margin 0 auto
    margin-bottom 4.375rem
    margin-top 2.5rem
</style>