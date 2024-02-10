<script setup>
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavMenu v-if="!$route.meta.hideNavigation" />
    <div class="flex-grow">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
