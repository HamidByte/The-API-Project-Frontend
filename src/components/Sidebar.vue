<script setup>
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ApiKeyIcon from '@/components/icons/ApiKeyIcon.vue'
</script>

<template>
  <div :class="(cn('pb-12', $attrs.class ?? ''), 'h-[600px]')">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Explore</h2>
        <div class="space-y-1">
          <Button variant="secondary" class="w-full justify-start">
            <ApiKeyIcon class="mr-2 h-4 w-4" />
            API Key
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
