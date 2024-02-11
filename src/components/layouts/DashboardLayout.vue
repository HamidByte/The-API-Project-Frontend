<script setup>
import SidebarNav from '@/components/dashboard/SidebarNav.vue'
</script>

<template>
  <div class="space-y-6 px-10 md:block">
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <SidebarNav />
      </aside>
      <div class="space-y-6">
        <slot />
      </div>
    </div>
  </div>
</template>
