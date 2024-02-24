<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores'
import { setApiKey, clearApiKey } from '@/lib/initializeStorage'
import api from '@/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { differenceInMilliseconds } from 'date-fns'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ClipboardCopyIcon } from '@radix-icons/vue'

import CalendarPopover from '@/components/CalendarPopover.vue'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const userStore = useUserStore()
const apiKey = ref(null)
const showToken = ref(false)
const selectedDate = ref(null)
const tokenExpirationInSeconds = ref(null)

const DateMappings = {
  DATE_NOT_SELECTED: 'DATE_NOT_SELECTED',
  DATE_IN_PAST: 'DATE_IN_PAST'
}

onMounted(async () => {
  if (userStore.apiKey) {
    apiKey.value = userStore.apiKey
  } else {
    // await fetchApiKey()
    await setApiKey()
    apiKey.value = userStore.apiKey
  }
})

watch(selectedDate, async () => {
  tokenExpirationInSeconds.value = await getTokenExpirationDate()
})

const copyToClipboard = () => {
  const inputElement = document.getElementById('apiKeyInput')

  if (inputElement) {
    inputElement.select()
    document.execCommand('copy')
    // document.getSelection().removeAllRanges() // Deselect the text after copying
  }
}

const getTokenExpirationDate = async () => {
  if (!selectedDate.value) {
    return DateMappings.DATE_NOT_SELECTED
  }

  // Get the current date
  const currentDate = new Date()

  // Check if the selected date is in the past
  if (selectedDate.value < currentDate) {
    // console.error('Selected date is in the past. Please choose a future date.')
    return DateMappings.DATE_IN_PAST
  }

  // Calculate the difference in milliseconds between the selected date and the current date
  const difference = differenceInMilliseconds(selectedDate.value, currentDate)

  // Convert the difference to seconds
  return Math.floor(difference / 1000)
}

// const fetchApiKey = async () => {
//   try {
//     const result = await api.apiKey.getApiKey()

//     apiKey.value = result.apiKey.token
//     userStore.setApiKey(apiKey.value)
//   } catch (error) {
//     toast({
//       title: 'Uh oh! Something went wrong.',
//       description: error,
//       variant: 'destructive'
//     })
//   }
// }

const fetchGenerateApiKey = async () => {
  if (
    tokenExpirationInSeconds.value === DateMappings.DATE_NOT_SELECTED ||
    tokenExpirationInSeconds.value === null
  ) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'Please choose a date.',
      variant: 'destructive'
    })
  } else if (tokenExpirationInSeconds.value === DateMappings.DATE_IN_PAST) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'Selected date is in the past. Please choose a future date.',
      variant: 'destructive'
    })
  } else {
    try {
      const result = await api.apiKey.generateApiKey(tokenExpirationInSeconds.value)

      apiKey.value = result.apiKey.token
      setApiKey()

      toast({
        title: 'Hooray! Operation Successful!',
        description: 'API key has been generated.'
      })
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error,
        variant: 'destructive'
      })
    }
  }
}

const fetchDeleteApiKey = async () => {
  try {
    const result = await api.apiKey.deleteApiKey()
    apiKey.value = null
    clearApiKey()

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
  <div>
    <div class="flex items-center justify-between space-y-2 mb-2">
      <h2 class="text-3xl font-bold tracking-tight">API Key</h2>
      <!-- <p class="text-sm text-muted-foreground">Generate your API key.</p> -->
    </div>

    <div class="flex flex-col sm:flex-row items-center gap-1.5 py-4">
      <Input
        id="apiKeyInput"
        class="w-full"
        v-bind:type="[showToken ? 'text' : 'password']"
        v-model="apiKey"
        placeholder="API key"
      />

      <div v-if="!apiKey" class="flex items-center gap-1.5">
        <CalendarPopover v-model="selectedDate" />

        <Button variant="default" type="submit" @click="fetchGenerateApiKey"> Generate </Button>
      </div>
      <div v-else class="flex items-center gap-1.5">
        <Button variant="outline" class="ml-2 sm:ml-0" @click="showToken = !showToken">
          <EyeOff v-if="showToken" class="h-4 w-4" />
          <Eye v-else class="h-4 w-4" />
        </Button>

        <Button v-if="showToken" variant="outline" class="ml-2 sm:ml-0" @click="copyToClipboard">
          <ClipboardCopyIcon class="h-4 w-4" />
        </Button>

        <CalendarPopover v-model="selectedDate" />

        <Button variant="default" type="submit" @click="fetchGenerateApiKey">Regenerate</Button>

        <Button variant="destructive" type="submit" @click="fetchDeleteApiKey">Delete</Button>
      </div>
    </div>
  </div>
</template>
