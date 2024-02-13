<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores'
import { api } from '@/api'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format, differenceInMilliseconds } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ClipboardCopyIcon } from '@radix-icons/vue'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const userStore = useUserStore()
const apiKey = ref(null)
const showToken = ref(false)
const date = ref(null)
const tokenExpirationInSeconds = ref(null)

const DateMappings = {
  DATE_NOT_SELECTED: 'DATE_NOT_SELECTED',
  DATE_IN_PAST: 'DATE_IN_PAST'
}

onMounted(async () => {
  await getApiKey()
})

watch(date, async () => {
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
  if (!date.value) {
    return DateMappings.DATE_NOT_SELECTED
  }

  // Get the current date
  const currentDate = new Date()

  // Check if the selected date is in the past
  if (date.value < currentDate) {
    // console.error('Selected date is in the past. Please choose a future date.')
    return DateMappings.DATE_IN_PAST
  }

  // Calculate the difference in milliseconds between the selected date and the current date
  const difference = differenceInMilliseconds(date.value, currentDate)

  // Convert the difference to seconds
  return Math.floor(difference / 1000)
}

const getApiKey = async () => {
  try {
    const result = await api.getApiKey()

    apiKey.value = result.apiKey.token
    userStore.setApiKey(apiKey.value)
  } catch (error) {
    //
  }
}

const generateApiKey = async () => {
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
      const result = await api.generateApiKey(tokenExpirationInSeconds.value)

      apiKey.value = result.apiKey.token
      userStore.setApiKey(apiKey.value)

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

const deleteApiKey = async () => {
  try {
    const result = await api.deleteApiKey()
    userStore.clearApiKey()

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

    <div class="flex flex-col sm:flex-row items-center gap-1.5 p-4">
      <Input
        id="apiKeyInput"
        v-bind:type="[showToken ? 'text' : 'password']"
        v-model="apiKey"
        placeholder="API key"
        class="w-full"
      />

      <Popover>
        <PopoverTrigger as-child>
          <Button
            :variant="'outline'"
            :class="
              cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            <span>{{ date ? format(date, 'PPP') : 'Pick a date' }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="date" />
        </PopoverContent>
      </Popover>

      <Button v-if="!apiKey" variant="default" type="submit" @click="generateApiKey">
        Generate
      </Button>
      <div v-else class="flex items-center gap-1.5">
        <Button variant="outline" class="ml-2 sm:ml-0" @click="showToken = !showToken">
          <EyeOff v-if="showToken" class="h-4 w-4" />
          <Eye v-else class="h-4 w-4" />
        </Button>

        <Button v-if="showToken" variant="outline" class="ml-2 sm:ml-0" @click="copyToClipboard">
          <ClipboardCopyIcon class="h-4 w-4" />
        </Button>

        <Button variant="default" type="submit" @click="generateApiKey">Regenerate</Button>

        <Button variant="destructive" type="submit" @click="deleteApiKey">Delete</Button>
      </div>
    </div>
  </div>
</template>
