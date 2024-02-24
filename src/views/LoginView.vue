<script setup>
import { RouterLink, useRouter } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'
import api from '@/api'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import UserLogin from '@/components/UserLogin.vue'
import { useUserStore } from '@/stores'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const router = useRouter()
const userStore = useUserStore()

const handleLogin = async (event) => {
  try {
    const user = await api.user.loginUser(event.email, event.password)
    // Store user information in the user store
    userStore.setUser(user)

    if (user.isConfirmed) {
      router.push(ROUTES.dashboard.path)
    } else {
      router.push(ROUTES.activate.path)
    }
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error,
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <div
    class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <button
      :class="
        cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')
      "
      @click="router.push(ROUTES.register.path)"
    >
      Register
    </button>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <RouterLink
        :to="ROUTES.home.path"
        class="relative z-20 flex items-center text-lg font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        The API Project
      </RouterLink>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and helped me deliver stunning
            designs to my clients faster than ever before.&rdquo;
          </p>
          <footer class="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
          <p class="text-sm text-muted-foreground">Enter your email and password below to login</p>
        </div>
        <UserLogin @submit="handleLogin" />
      </div>
    </div>
  </div>
</template>
