<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const { email, password } = defineProps(['email', 'password'])
const emit = defineEmits(['submit'])

const localEmail = ref(email || '')
const localPassword = ref(password || '')
const isLoading = ref(false)

async function onSubmit() {
  emit('submit', { email: localEmail.value, password: localPassword.value })
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
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
            required
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
            required
          />
        </div>
        <Button :disabled="isLoading"> Sign In </Button>
      </div>
    </form>
  </div>
</template>
