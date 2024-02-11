<script setup>
import { useRoute } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const route = useRoute()

const sidebarSettingsItems = [
  {
    title: 'Profile',
    href: ROUTES.profile.path
  },
  {
    title: 'Account',
    href: ROUTES.account.path
  },
  {
    title: 'Appearance',
    href: ROUTES.appearance.path
  },
  {
    title: 'Notifications',
    href: ROUTES.notifications.path
  },
  {
    title: 'Display',
    href: ROUTES.display.path
  }
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarSettingsItems"
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
