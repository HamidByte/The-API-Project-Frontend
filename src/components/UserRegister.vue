<script setup>
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-vue-next'

const emit = defineEmits(['submit'])

const localEmail = ref('')
const localPassword = ref('')
const localConfirmPassword = ref('')
const isLoading = ref(false)

async function onSubmit() {
  emit('submit', {
    email: localEmail.value,
    password: localPassword.value,
    confirmPassword: localConfirmPassword.value
  })
  // isLoading.value = true

  // setTimeout(() => {
  //   isLoading.value = false
  // }, 500)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            v-model="localEmail"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            autocomplete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Label class="sr-only" for="password"> Password </Label>
          <Input
            id="password"
            v-model="localPassword"
            placeholder="Password"
            type="password"
            auto-capitalize="none"
            autocomplete="current-password"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Label class="sr-only" for="confirmPassword"> Confirm Password </Label>
          <Input
            id="confirmPassword"
            v-model="localConfirmPassword"
            placeholder="Confirm Password"
            type="password"
            auto-capitalize="none"
            autocomplete="current-password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Register
        </Button>
      </div>
    </form>
  </div>
</template>
