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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const activationStatus = ref(false)
const code = ref(null)
const resendActivationToggle = ref(false)
const activationCode = ref('')
const email = ref('')

onMounted(async () => {
  // Get the code from the route parameters
  code.value = route.query.code

  if (!isAuthenticated()) {
    router.push(ROUTES.login.path)
  } else {
    try {
      const result = await api.user.getIsUserActive()

      if (result.isConfirmed) {
        activationStatus.value = true
        userStore.setIsUserActive(true)

        // Redirect to /dashboard after 3 seconds
        setTimeout(() => {
          router.push(ROUTES.dashboard.path)
        }, 3000)
      } else {
        activationStatus.value = false
        userStore.setIsUserActive(false)

        if (code.value) {
          try {
            // Call the activation API endpoint
            const result = await api.user.activateUser(code.value)

            activationStatus.value = true
            userStore.setIsUserActive(true)

            toast({
              title: 'Hooray! Operation Successful!',
              description: result.message
            })

            // Redirect to /dashboard after 3 seconds
            setTimeout(() => {
              router.push(ROUTES.dashboard.path)
            }, 3000)
          } catch (error) {
            activationStatus.value = false
            userStore.setIsUserActive(false)

            toast({
              title: 'Uh oh! Activation failed.',
              description: error,
              variant: 'destructive'
            })
          }
        }
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error,
        variant: 'destructive'
      })
    }
  }
})

const activate = async () => {
  try {
    // Call the activation API endpoint
    const result = await api.user.activateUser(activationCode.value)

    activationStatus.value = true
    userStore.setUser({ isConfirmed: true })
    userStore.setIsUserActive(true)

    toast({
      title: 'Hooray! Operation Successful!',
      description: result.message
    })

    router.push(ROUTES.dashboard.path)
    // Redirect to /dashboard after 3 seconds
    // setTimeout(() => {
    //   // Without reloading, it's not redirecting
    //   router.go() // Reloads the current route
    //   router.push(ROUTES.dashboard.path)
    // }, 3000)
  } catch (error) {
    activationStatus.value = false
    userStore.setUser({ isConfirmed: false })
    userStore.setIsUserActive(false)

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

    resendActivationToggle.value = false

    toast({
      title: 'Hooray! Operation Successful!',
      description: result.message
    })
  } catch (error) {
    resendActivationToggle.value = true

    toast({
      title: 'Uh oh! Something went wrong.',
      description: error,
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <!-- Already Activated -->
  <div
    class="flex shrink-0 items-center justify-center"
    v-if="activationStatus && !resendActivationToggle"
  >
    <div class="flex flex-col items-center justify-center p-6 w-full">
      <Card class="mx-auto w-1/2">
        <CardHeader>
          <CardTitle>Activated</CardTitle>
          <CardDescription
            >Your account is activated. You will be redirected to dashboard soon.</CardDescription
          >
        </CardHeader>
      </Card>
    </div>
  </div>

  <!-- Activate Account -->
  <div
    class="flex shrink-0 items-center justify-center"
    v-if="!activationStatus && !resendActivationToggle"
  >
    <div class="flex flex-col items-center justify-center p-6 w-full">
      <Card class="mx-auto w-1/2">
        <CardHeader>
          <CardTitle>Activate your account</CardTitle>
          <CardDescription
            >You're almost done! An email has been sent to your email address, contaiing your
            activation code.</CardDescription
          >
        </CardHeader>
        <CardContent class="text-center">
          <div class="mb-2">
            <Label for="activation_code">Please enter the activation code below</Label>
          </div>
          <div class="max-w-sm mx-auto">
            <div class="flex items-center gap-1.5">
              <Input
                id="activation_code"
                type="text"
                v-model="activationCode"
                placeholder="Activation code"
              />
              <Button type="submit" @click="activate"> Activate </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-center px-6 pb-6">
          <Button variant="outline" type="text" @click="resendActivationToggle = true">
            Resend Activation
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>

  <!-- Resend Activation Email -->
  <div class="flex shrink-0 items-center justify-center" v-if="resendActivationToggle">
    <div class="flex flex-col items-center justify-center p-6 w-full">
      <Card class="mx-auto w-1/2">
        <CardHeader>
          <CardTitle>Resend Account Activation Email</CardTitle>
          <CardDescription
            >Please enter your email address to get the new activation code</CardDescription
          >
        </CardHeader>
        <CardContent class="text-center">
          <Input id="email" type="text" v-model="email" placeholder="Email" />
        </CardContent>
        <CardFooter class="flex justify-center px-6 pb-6">
          <Button variant="default" type="submit" @click="resendActivationEmail">
            Resend Activation
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
