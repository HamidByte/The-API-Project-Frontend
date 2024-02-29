<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'
import api from '@/api'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const router = useRouter()
const route = useRoute()

const token = ref(null)
const newPassword = ref(null)
const confirmPassword = ref(null)

onMounted(() => {
  // Access the token from the route
  token.value = route.params.token
})

const handleResetPassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'Passwords do not match.',
        variant: 'destructive'
      })
    } else {
      const result = await api.user.resetPassword(newPassword.value, token.value)

      toast({
        title: 'Hooray! Operation Successful!',
        description: result.message
      })

      // Redirect to /login after 1 second
      setTimeout(() => {
        router.push(ROUTES.LOGIN.path)
      }, 1000)
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
    class="container relative flex-col items-center justify-center md:h-[800px] lg:h-[800px] grid grid-cols-1 my-12 lg:max-w-none lg:px-0"
  >
    <Card class="mx-auto max-w-sm">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>Enter your new password to reset password</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="newPassword">New Password</Label>
            <Input id="newPassword" v-model="newPassword" type="password" required />
          </div>
          <div class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" v-model="confirmPassword" type="password" required />
          </div>
          <Button class="w-full" @click="handleResetPassword"> Reset Password </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Remember your password?
          <RouterLink class="underline" :to="ROUTES.LOGIN.path"> Login </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
