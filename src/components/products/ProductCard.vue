<script setup>
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const router = useRouter()

defineProps(['title', 'description', 'status', 'disabled', 'routePath'])
</script>

<template>
  <div>
    <Card>
      <CardContent>
        <div class="relative pb-4/3">
          <!-- Product Image -->
        </div>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">{{ title }}</h2>
          </div>
          <Badge v-if="status && status == 'Coming Soon'" class="bg-rose-400 hover:bg-rose-500">
            {{ status }}
          </Badge>
          <Badge v-if="status && status == 'New'" class="bg-emerald-400 hover:bg-emerald-500">
            New
          </Badge>
        </div>
        <div class="mt-2 text-gray-500 min-h-[7rem]">
          <p>
            {{ description }}
          </p>
          <slot></slot>
        </div>
        <div class="mt-6">
          <Button
            class="w-full mt-2"
            variant="default"
            :disabled="disabled"
            @click="router.push(routePath)"
          >
            Go to API
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
