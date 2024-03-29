<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { isAuthenticated } from '@/lib/initializeAuth'
import * as ROUTES from '@/lib/definitions/routes/main'

import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu
} from '@/components/ui/navigation-menu'
import UserNav from '@/components/UserNav.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import ToggleDarkMode from '@/components/ToggleDarkMode.vue'

const router = useRouter()

const goToLogin = () => {
  router.push(ROUTES.LOGIN.path)
}

const goToRegister = () => {
  router.push(ROUTES.REGISTER.path)
}
</script>

<template>
  <header class="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
    <!-- MainNav -->
    <Sheet>
      <SheetTrigger asChild>
        <Button class="lg:hidden" size="icon" variant="outline">
          <MenuIcon class="h-6 w-6" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <RouterLink :to="ROUTES.HOME.path">
          <LogoIcon customClass="h-6 w-6" />
          <span class="sr-only">Home</span>
        </RouterLink>
        <div class="grid gap-2 py-6">
          <RouterLink
            class="flex w-full items-center py-2 text-lg font-semibold"
            :to="ROUTES.HOME.path"
          >
            Home
          </RouterLink>
          <RouterLink
            class="flex w-full items-center py-2 text-lg font-semibold"
            :to="ROUTES.PRODUCTS.path"
          >
            Products
          </RouterLink>
          <RouterLink
            class="flex w-full items-center py-2 text-lg font-semibold"
            :to="ROUTES.PRICING.path"
          >
            Pricing
          </RouterLink>
          <a
            class="flex w-full items-center py-2 text-lg font-semibold"
            :href="ROUTES.API.path"
            target="_blank"
          >
            API
          </a>
          <RouterLink
            class="flex w-full items-center py-2 text-lg font-semibold"
            :to="ROUTES.CONTACT.path"
          >
            Contact
          </RouterLink>
          <RouterLink
            class="flex w-full items-center py-2 text-lg font-semibold"
            :to="ROUTES.ABOUT.path"
          >
            About
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>
    <RouterLink class="mr-6 hidden lg:flex" :to="ROUTES.HOME.path">
      <LogoIcon customClass="h-6 w-6" />
      <span class="sr-only">Home</span>
    </RouterLink>
    <NavigationMenu class="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :to="ROUTES.HOME.path"
          >
            Home
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :to="ROUTES.PRODUCTS.path"
          >
            Products
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :to="ROUTES.PRICING.path"
          >
            Pricing
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <a
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :href="ROUTES.API.path"
            target="_blank"
          >
            API
          </a>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :to="ROUTES.CONTACT.path"
          >
            Contact
          </RouterLink>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <RouterLink
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            :to="ROUTES.ABOUT.path"
          >
            About
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
    <!-- UserNav -->
    <div class="ml-auto flex items-center gap-2" v-if="!isAuthenticated()">
      <ToggleDarkMode />
      <Button variant="outline" @click="goToLogin">Sign in</Button>
      <Button @click="goToRegister">Sign Up</Button>
    </div>
    <div class="ml-auto flex items-center gap-2" v-else>
      <RouterLink :to="ROUTES.DASHBOARD.path">
        <Button variant="outline">Dashboard</Button>
      </RouterLink>
      <ToggleDarkMode />
      <UserNav />
    </div>
  </header>
</template>

<style scoped></style>
