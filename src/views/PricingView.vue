<script setup>
import { RouterLink } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Check } from 'lucide-vue-next'
</script>

<template>
  <section class="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
    <div class="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
      <h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Simple, transparent pricing
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Unlock all features including unlimited APIs for your website.
      </p>
    </div>
    <div class="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div class="grid gap-6">
        <h3 class="text-xl font-bold sm:text-2xl">What&apos;s included in the PRO plan</h3>
        <ul class="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Unlimited APIs</li>
          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Unlimited Users</li>

          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Custom domain</li>
          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Dashboard Analytics</li>
          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Access to Discord</li>
          <li class="flex items-center"><Check class="mr-2 h-4 w-4" /> Premium Support</li>
        </ul>
      </div>
      <div class="flex flex-col gap-4 text-center">
        <div>
          <h4 class="text-7xl font-bold">$19</h4>
          <p class="text-sm font-medium text-muted-foreground">Billed Monthly</p>
        </div>
        <RouterLink
          :to="ROUTES.dashboard.path"
          :class="cn(buttonVariants({ variant: 'default', size: 'lg' }))"
        >
          Get Started
        </RouterLink>
      </div>
    </div>
    <div class="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
        The API Project is a demo app.
        <strong>You can test the upgrade and won&apos;t be charged.</strong>
      </p>
    </div>
  </section>
</template>