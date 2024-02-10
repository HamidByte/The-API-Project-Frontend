<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { isAuthenticated, clearUserId } from '@/lib/authUtils'

import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from '@/components/ui/navigation-menu'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import ShirtIcon from '@/components/icons/ShirtIcon.vue'
import ToggleDarkMode from '@/components/ToggleDarkMode.vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const logout = () => {
  clearUserId()

  // Redirect to the login page
  goToLogin()
}
</script>

<template>
  <header class="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button class="lg:hidden" size="icon" variant="outline">
          <MenuIcon class="h-6 w-6" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <RouterLink to="/">
          <ShirtIcon class="h-6 w-6" />
          <span class="sr-only">ShadCN</span>
        </RouterLink>
        <div class="grid gap-2 py-6">
          <RouterLink class="flex w-full items-center py-2 text-lg font-semibold" to="/">
            Home
          </RouterLink>
          <RouterLink class="flex w-full items-center py-2 text-lg font-semibold" to="/dashboard">
            Dashboard
          </RouterLink>
          <RouterLink class="flex w-full items-center py-2 text-lg font-semibold" to="/contact">
            Contact
          </RouterLink>
          <RouterLink class="flex w-full items-center py-2 text-lg font-semibold" to="/about">
            About
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>
    <RouterLink class="mr-6 hidden lg:flex" to="/">
      <ShirtIcon class="h-6 w-6" />
      <span class="sr-only">ShadCN</span>
    </RouterLink>
    <NavigationMenu class="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            to="/"
          >
            Home
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            to="/dashboard"
          >
            Dashboard
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            to="/contact"
          >
            Contact
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            to="/about"
          >
            About
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
    <div class="ml-auto flex gap-2" v-if="!isAuthenticated()">
      <ToggleDarkMode />
      <Button variant="outline" @click="goToLogin">Sign in</Button>
      <Button @click="goToRegister">Sign Up</Button>
    </div>
    <div class="ml-auto flex gap-2" v-else>
      <ToggleDarkMode />
      <Button @click="logout">Logout</Button>
    </div>
  </header>
</template>

<style scoped></style>
