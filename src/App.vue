<script setup>
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <NavMenu v-if="!$route.meta.hideNavigation" />
  <RouterView />
</template>

<style scoped></style>
