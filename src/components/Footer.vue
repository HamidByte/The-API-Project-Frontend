<script setup>
import { RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <section class="bg-zinc-100 dark:bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-12"
      >
        <div class="space-y-2 md:space-y-0">
          <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-50">Stay Updated</h3>
          <form class="flex space-x-2">
            <Input class="max-w-lg flex-1" placeholder="Enter your email" type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
        <div class="flex space-x-4">
          <RouterLink
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            to="#"
          >
            <!-- <FacebookIcon class="h-6 w-6" /> -->
            <span class="sr-only">Facebook</span>
          </RouterLink>
          <RouterLink
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            to="#"
          >
            <!-- <TwitterIcon class="h-6 w-6" /> -->
            <span class="sr-only">Twitter</span>
          </RouterLink>
          <RouterLink
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            to="#"
          >
            <!-- <InstagramIcon class="h-6 w-6" /> -->
            <span class="sr-only">Instagram</span>
          </RouterLink>

          <p class="text-md font-bold text-gray-600 dark:text-gray-300">
            © 2024 Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
