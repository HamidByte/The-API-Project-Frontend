<script setup>
import { useRoute } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const route = useRoute()

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile'
  },
  {
    title: 'Account',
    href: '/settings/account'
  },
  {
    title: 'Appearance',
    href: '/settings/appearance'
  },
  {
    title: 'Notifications',
    href: '/settings/notifications'
  },
  {
    title: 'Display',
    href: '/settings/display'
  }
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.title"
      as="a"
      :href="item.href"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          route.path === `${item.href}.html` && 'bg-muted hover:bg-muted'
        )
      "
    >
      {{ item.title }}
      <span class="ml-4 text-orange-600" style="font-size: 10px">(coming soon)</span>
    </Button>
  </nav>
</template>
