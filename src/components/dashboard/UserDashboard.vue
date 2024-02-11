<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useUserStore } from '@/stores'
import * as ROUTES from '@/lib/definitions/routes/main'
import { api } from '@/api'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()
const userStore = useUserStore()
const { toast } = useToast()
const currentUser = ref(null)

// Fetch user data and update the store on component creation
const fetchUserData = async () => {
  try {
    const userData = await api.getUser()
    currentUser.value = userData
    userStore.setUser(userData)
    if (!userData.isActive) {
      router.push(ROUTES.activate.path)
    }
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error
    })
  }
}

// Call fetchUserData when the component is mounted
onMounted(async () => {
  await fetchUserData()
})

// Use watch to update currentUser when userStore.user changes
watch(
  () => userStore.user,
  (newUser) => {
    currentUser.value = newUser
  }
)

const requestCount = computed(() => {
  return currentUser.value?.requestCount
})

const lastRequestDate = computed(() => {
  if (currentUser.value && currentUser.value?.lastRequestDate) {
    return moment(currentUser.value?.lastRequestDate).format('DD-MMM-YYYY, h:mm a')
  }
  return 'N/A'
})

const subscriptionStatus = computed(() => {
  return currentUser.value?.subscriptionStatus === 'free' ? 'Free' : ''
})

const userActivationStatus = computed(() => {
  return currentUser.value?.isActive ? 'Active' : 'Inactive'
})
</script>

<template>
  <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
    <!-- <p class="text-sm text-muted-foreground">This is dashboard.</p> -->
  </div>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> Total Requests </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ requestCount }}</div>
        <p class="text-xs text-muted-foreground">Total requests made by the user</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> Last Requested Date </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="h-4 w-4 text-muted-foreground"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ lastRequestDate }}</div>
        <p class="text-xs text-muted-foreground">Date and time of the last request</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> Subscriptions </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ subscriptionStatus }}</div>
        <p class="text-xs text-muted-foreground">Current subscription status of the user</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> User Status </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="h-4 w-4 text-muted-foreground"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ userActivationStatus }}</div>
        <p class="text-xs text-muted-foreground">Current status of the user</p>
      </CardContent>
    </Card>
  </div>
  <Toaster />
</template>
