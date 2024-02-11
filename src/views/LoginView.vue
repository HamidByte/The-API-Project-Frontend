<script>
import * as ROUTES from '@/lib/definitions/routes/main'
import { api } from '@/api'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import UserLogin from '@/components/UserLogin.vue'

const { toast } = useToast()
import { useUserStore } from '@/stores'

export default {
  components: { Toaster, UserLogin },
  data: () => {
    return { buttonVariants, cn, email: null, password: null, loginError: null }
  },
  methods: {
    async handleLogin(event) {
      const userStore = useUserStore()

      try {
        this.email = event.email
        this.password = event.password
        const user = await api.loginUser(this.email, this.password)

        // Store user information in the user store
        userStore.setUser(user)

        if (user.isActive) {
          this.$router.push(ROUTES.dashboard.path)
        } else {
          this.$router.push(ROUTES.activate.path)
        }
      } catch (error) {
        this.loginError = error
        toast({
          title: 'Uh oh! Something went wrong.',
          description: error
        })
      }
    }
  }
}
</script>

<template>
  <div
    class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <a
      href="/register"
      :class="
        cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')
      "
    >
      Register
    </a>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
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
        TheAPIProject
      </div>
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
  <Toaster />
</template>
