<script setup>
import { ref, watch } from 'vue'
import html2canvas from 'html2canvas'
import api from '@/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-vue-next'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const QuoteMappings = {
  RANDOM: 'random',
  SEARCH: 'search',
  QUOTE_BY_ID: 'id',
  QUOTE_BY_CATEGORY: 'category',
  QUOTE_BY_AUTHOR: 'author'
}

const selectedField = ref('')
const searchInput = ref('')
const showSearch = ref(false)
const isLoading = ref(false)
const quoteResult = ref('')

watch(selectedField, async (newField) => {
  if (newField === QuoteMappings.RANDOM) {
    showSearch.value = false
  } else {
    showSearch.value = true
  }
})

const handleSearch = (event) => {
  searchInput.value = event.target.value
}

const fieldRequired = () => {
  if (!selectedField.value) {
    throw new Error('Please select a field.')
  }

  if (!searchInput.value && showSearch.value) {
    throw new Error('Search query is required.')
  }
}

const onSubmit = async () => {
  try {
    // Validate
    fieldRequired()

    isLoading.value = true

    if (selectedField.value === QuoteMappings.RANDOM) {
      const result = await api.quotes.getRandomQuotes()
      quoteResult.value = result.quote
    }

    if (selectedField.value === QuoteMappings.SEARCH) {
      const result = await api.quotes.searchQuotes(searchInput.value)
      quoteResult.value = result.quote
    }

    if (selectedField.value === QuoteMappings.QUOTE_BY_ID) {
      const result = await api.quotes.getRandomQuoteById(searchInput.value)
      quoteResult.value = result.quote
    }

    if (selectedField.value === QuoteMappings.QUOTE_BY_CATEGORY) {
      const result = await api.quotes.getRandomQuotesByCategory(searchInput.value)
      quoteResult.value = result.quote
    }

    if (selectedField.value === QuoteMappings.QUOTE_BY_AUTHOR) {
      const result = await api.quotes.getRandomQuotesByAuthor(searchInput.value)
      quoteResult.value = result.quote
    }

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error,
      variant: 'destructive'
    })
  }
}

const generateRandomFileName = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = 8 // You can adjust the length of the filename as needed
  let randomFileName = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomFileName += characters.charAt(randomIndex)
  }

  return `${randomFileName}.png` // You can change the extension or adjust the format
}

const downloadQuotation = () => {
  html2canvas(document.querySelector('#quotationImage')).then((canvas) => {
    canvas.toBlob((blob) => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = generateRandomFileName()
      link.click()
    })
  })
}
</script>

<template>
  <div class="mx-auto w-full max-w-3xl flex-1 py-6 px-4 lg:px-6">
    <h2 class="text-3xl font-bold tracking-tight mb-4">Random Quotes</h2>

    <form class="" @submit.prevent="onSubmit">
      <FormField name="field">
        <FormItem>
          <FormLabel>Select a field</FormLabel>
          <FormControl>
            <Select v-model="selectedField">
              <SelectTrigger>
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="QuoteMappings.RANDOM"> Random Quotes </SelectItem>
                <SelectItem :value="QuoteMappings.SEARCH"> Search Quotes </SelectItem>
                <SelectItem :value="QuoteMappings.QUOTE_BY_ID"> Random Quote by Id </SelectItem>
                <SelectItem :value="QuoteMappings.QUOTE_BY_CATEGORY">
                  Random Quote by Category
                </SelectItem>
                <SelectItem :value="QuoteMappings.QUOTE_BY_AUTHOR">
                  Random Quote by Author
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <!-- <FormDescription> Description </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-if="showSearch" name="search">
        <FormItem class="mt-2">
          <FormLabel>Search</FormLabel>
          <FormControl>
            <Input id="searchQuotes" type="text" @change="handleSearch" />
          </FormControl>
          <!-- <FormDescription> Description </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full mt-4" type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Generate Quotes
      </Button>
    </form>

    <Card v-if="quoteResult" id="quotationImage" class="mt-4 p-6">
      <CardContent>
        <blockquote class="text-xl italic font-semibold text-center">
          <svg
            class="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path
              d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
            />
          </svg>

          <p>{{ quoteResult.quote }}</p>
        </blockquote>
      </CardContent>
      <CardFooter class="before:content-['\2014\00A0'] text-right">
        <cite>{{ quoteResult.author }}</cite>
      </CardFooter>
    </Card>

    <Button v-if="quoteResult" class="w-full mt-4" @click="downloadQuotation">
      Download Quote
    </Button>
  </div>
</template>
