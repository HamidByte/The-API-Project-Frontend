<script setup>
import { useRouter, useRoute } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const router = useRouter()
const route = useRoute()

const sidebarSettingsItems = [
  {
    title: 'Profile',
    href: ROUTES.PROFILE.path
  },
  {
    title: 'Account',
    href: ROUTES.ACCOUNT.path
  },
  {
    title: 'Appearance',
    href: ROUTES.APPEARANCE.path
  },
  {
    title: 'Notifications',
    href: ROUTES.NOTIFICATIONS.path
  },
  {
    title: 'Display',
    href: ROUTES.DISPLAY.path
  }
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarSettingsItems"
      :key="item.title"
      :href="item.href"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          route.path === `${item.href}` && 'bg-muted hover:bg-muted'
        )
      "
      @click="router.push(item.href)"
    >
      {{ item.title }}
      <span class="ml-4 text-rose-400" style="font-size: 10px">(coming soon)</span>
    </Button>
  </nav>
</template>
