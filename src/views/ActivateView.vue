<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
import { isAuthenticated } from '@/lib/initializeAuth'
import * as ROUTES from '@/lib/definitions/routes/main'
import api from '@/api'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const activationStatus = ref(false)
const activationCode = ref('')
const email = ref('')

onMounted(async () => {
  if (!isAuthenticated()) {
    router.push(ROUTES.LOGIN.path)
  } else {
    await isUserConfirmed()
  }
})

const isUserConfirmed = async () => {
  if (userStore.isUserConfirmed) {
    activationStatus.value = true
    userStore.setUser({ isConfirmed: true })

    // Redirect to /dashboard after 3 seconds
    setTimeout(() => {
      router.push(ROUTES.DASHBOARD.path)
    }, 3000)
  } else {
    activationStatus.value = false
    userStore.setUser({ isConfirmed: false })

    if (route.query.code) {
      await confirmUserViaLink()
    }
  }
}

const confirmUserViaLink = async () => {
  try {
    const result = await api.user.activateUser(route.query.code)

    activationStatus.value = true
    userStore.setUser({ isConfirmed: true })

    toast({
      title: 'Hooray! Operation Successful!',
      description: result.message
    })

    // Redirect to /dashboard after 3 seconds
    setTimeout(() => {
      router.push(ROUTES.DASHBOARD.path)
    }, 3000)
  } catch (error) {
    activationStatus.value = false
    userStore.setUser({ isConfirmed: false })

    toast({
      title: 'Uh oh! Activation failed.',
      description: error,
      variant: 'destructive'
    })
  }
}

const confirmUserViaCode = async () => {
  try {
    const result = await api.user.activateUser(activationCode.value)

    activationStatus.value = true
    userStore.setUser({ isConfirmed: true })

    toast({
      title: 'Hooray! Operation Successful!',
      description: result.message
    })

    // Redirect to /dashboard after 3 seconds
    setTimeout(() => {
      router.push(ROUTES.DASHBOARD.path)
    }, 3000)
  } catch (error) {
    activationStatus.value = false
    userStore.setUser({ isConfirmed: false })

    toast({
      title: 'Uh oh! Activation failed.',
      description: error,
      variant: 'destructive'
    })
  }
}

const resendActivationEmail = async () => {
  try {
    const result = await api.user.resendActivation(email.value)

    toast({
      title: 'Hooray! Operation Successful!',
      description: result.message
    })
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
  <div class="flex shrink-0 items-center justify-center w-full">
    <div v-if="activationStatus" class="sm:3/4 md:w-3/4 lg:w-2/3 xl:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Activated</CardTitle>
          <CardDescription>
            Your account is activated. You will be redirected to dashboard soon.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1"></div>
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button type="submit" @click="router.push(ROUTES.DASHBOARD.path)">
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>

    <Tabs v-else default-value="activate" class="sm:3/4 md:w-3/4 lg:w-2/3 xl:w-1/2">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="activate"> Activate </TabsTrigger>
        <TabsTrigger value="resend-activation-email"> Resend Activation </TabsTrigger>
      </TabsList>
      <TabsContent value="activate">
        <Card>
          <CardHeader>
            <CardTitle>Activate your account</CardTitle>
            <CardDescription>
              You're almost done! An email has been sent to your email address, contaiing your
              activation code.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="activation_code">Please enter the activation code below</Label>
              <Input
                id="activation_code"
                type="text"
                v-model="activationCode"
                placeholder="Activation code"
              />
            </div>
          </CardContent>
          <CardFooter class="flex justify-center">
            <Button type="submit" @click="confirmUserViaCode"> Activate </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="resend-activation-email">
        <Card>
          <CardHeader>
            <CardTitle>Resend Account Activation Email</CardTitle>
            <CardDescription>
              Please enter your email address to get the new activation code
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="email">Please enter your email address</Label>
              <Input id="email" type="text" v-model="email" placeholder="Email" />
            </div>
          </CardContent>
          <CardFooter class="flex justify-center">
            <Button variant="default" type="submit" @click="resendActivationEmail">
              Resend Activation
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
