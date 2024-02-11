<script setup>
import { useRoute } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ApiKeyIcon from '@/components/icons/ApiKeyIcon.vue'
import { DashboardIcon, CheckCircledIcon } from '@radix-icons/vue'

const route = useRoute()

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: ROUTES.dashboard.path
  },
  {
    title: 'API Key',
    href: ROUTES.apiKey.path,
    isNew: true
  },
  {
    title: 'Test API',
    href: ROUTES.testApi.path,
    isNew: true
  }
]

const iconMapping = [DashboardIcon, ApiKeyIcon, CheckCircledIcon]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Explore</h2>
    <Button
      v-for="(item, index) in sidebarNavItems"
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
      <component :is="iconMapping[index]" class="mr-2 h-4 w-4 text-muted-foreground" />
      {{ item.title }}
      <span class="ml-4 text-orange-600" style="font-size: 10px" v-if="item.isNew"
        >(coming soon)</span
      >
    </Button>
  </nav>
</template>
