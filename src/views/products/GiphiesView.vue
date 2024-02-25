<script setup>
import { ref, watch } from 'vue'
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
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-vue-next'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const GifMappings = {
  RANDOM: 'random',
  SEARCH: 'search',
  GIF_BY_ID: 'id',
  GIF_BY_GIFID: 'gif_id'
}

const selectedField = ref('')
const searchInput = ref('')
const showSearch = ref(false)
const isLoading = ref(false)
const gifResult = ref('')

watch(selectedField, async (newField) => {
  if (newField === GifMappings.RANDOM) {
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

    if (selectedField.value === GifMappings.RANDOM) {
      const result = await api.giphies.getRandomGiphy()
      gifResult.value = result.giphy
    }

    if (selectedField.value === GifMappings.SEARCH) {
      const result = await api.giphies.searchGiphy(searchInput.value)
      gifResult.value = result.giphy
    }

    if (selectedField.value === GifMappings.GIF_BY_ID) {
      const result = await api.giphies.getRandomGiphyById(searchInput.value)
      gifResult.value = result.giphy
    }

    if (selectedField.value === GifMappings.GIF_BY_GIFID) {
      const result = await api.giphies.getRandomGiphyByGifId(searchInput.value)
      gifResult.value = result.giphy
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
</script>

<template>
  <div class="mx-auto w-full max-w-3xl flex-1 py-6 px-4 lg:px-6">
    <h2 class="text-3xl font-bold tracking-tight mb-4">Random Giphies</h2>

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
                <SelectItem :value="GifMappings.RANDOM"> Random Gif </SelectItem>
                <SelectItem :value="GifMappings.SEARCH"> Search Gif </SelectItem>
                <SelectItem :value="GifMappings.GIF_BY_ID"> Random Gif by Id </SelectItem>
                <SelectItem :value="GifMappings.GIF_BY_GIFID"> Random Gif by gifId </SelectItem>
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
            <Input id="searchGiphies" type="text" @change="handleSearch" />
          </FormControl>
          <!-- <FormDescription> Description </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full mt-4" type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Generate Giphy
      </Button>
    </form>

    <Card v-if="gifResult" class="mt-4 p-6">
      <CardContent>
        <img class="mx-auto mb-4" :src="gifResult.url" alt="GIF Image" />

        <div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">id:</span>
            <span class="text-lg font-semibold text-muted-foreground">{{ gifResult.id }}</span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">gifId:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.gifId }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">URL:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.url }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Hash:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.hash }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">File Size:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.fileSize }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Giphy Title:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.giphyTitle }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Import Date:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.importDate }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Trending Date:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ gifResult.trendingDate }}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
