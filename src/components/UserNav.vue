<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { clearAuthentication } from '@/lib/initializeAuth'
import { clearAccessToken } from '@/lib/initializeStorage'
import * as ROUTES from '@/lib/definitions/routes/main'
import { useUserStore } from '@/stores'

import {
  Avatar,
  AvatarFallback
  //   AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //   DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const router = useRouter()
const userStore = useUserStore()
const currentUser = ref(null)

onMounted(async () => {
  currentUser.value = userStore.user
})

// Use watch to update currentUser when userStore.user changes
watch(
  () => userStore.user,
  (newUser) => {
    currentUser.value = newUser
  }
)

const email = computed(() => {
  if (currentUser.value?.email) {
    return currentUser.value.email
  } else {
    return 'Unknown'
  }
})

const username = computed(() => {
  if (currentUser.value?.username) {
    return currentUser.value.username
  } else if (currentUser.value?.firstName && currentUser.value?.lastName) {
    const initials = currentUser.value.firstName.charAt(0) + currentUser.value.lastName.charAt(0)
    return initials.toUpperCase()
  } else if (currentUser.value?.email) {
    // Extract username from email before @
    const emailParts = currentUser.value.email.split('@')
    return emailParts[0]
  } else {
    return 'Unknown'
  }
})

const initials = computed(() => {
  if (currentUser.value?.firstName && currentUser.value?.lastName) {
    const initials = currentUser.value.firstName.charAt(0) + currentUser.value.lastName.charAt(0)
    return initials.toUpperCase()
  } else if (currentUser.value?.email) {
    const emailParts = currentUser.value.email.split('@')[0]
    const sanitizedEmail = emailParts.replace(/[^a-zA-Z.\-_+~]/g, '') // Remove non-alphabetic characters except dot, hyphen, underscore, plus, and tilde
    const [part1, part2] = sanitizedEmail.split(/[.\-_+~]/) // Split on dot, hyphen, underscore, plus, or tilde
    return part2
      ? `${part1.charAt(0)}${part2.charAt(0)}`.toUpperCase()
      : part1.slice(0, 2).toUpperCase()
  } else {
    return ''
  }
})

const logout = () => {
  clearAuthentication()
  clearAccessToken()

  // Redirect to the login page
  router.push(ROUTES.login.path)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <!-- <AvatarImage src="src/assets/images/user.png" alt="@user" /> -->
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ username }}</p>
          <p class="text-xs leading-none text-muted-foreground">{{ email }}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <RouterLink :to="ROUTES.profile.path">
          <DropdownMenuItem>
            Profile
            <!-- <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> -->
          </DropdownMenuItem>
        </RouterLink>
        <RouterLink :to="ROUTES.account.path">
          <DropdownMenuItem>
            Account
            <!-- <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> -->
          </DropdownMenuItem>
        </RouterLink>
        <RouterLink :to="ROUTES.appearance.path">
          <DropdownMenuItem>Appearence</DropdownMenuItem>
        </RouterLink>
        <RouterLink :to="ROUTES.notifications.path">
          <DropdownMenuItem>
            Notifications
            <!-- <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> -->
          </DropdownMenuItem>
        </RouterLink>
        <RouterLink :to="ROUTES.display.path">
          <DropdownMenuItem>Display</DropdownMenuItem>
        </RouterLink>
        <RouterLink :to="ROUTES.settings.path">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </RouterLink>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logout">
        Log out
        <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
