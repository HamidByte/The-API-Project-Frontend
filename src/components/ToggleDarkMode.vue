<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  const body = document.querySelector('body')

  const isDarkMode = body?.classList.contains('dark')
  isDark.value = isDarkMode

  isDarkMode ? body?.classList.remove('dark') : body?.classList.add('dark')
}
</script>

<template>
  <Button variant="outline" size="icon" v-if="isDark" @click="toggleDarkMode">
    <MoonIcon class="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon" v-else @click="toggleDarkMode">
    <SunIcon class="h-4 w-4" />
  </Button>
</template>

<style scoped></style>
