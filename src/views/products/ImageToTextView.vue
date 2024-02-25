<script setup>
import { ref } from 'vue'
import api from '@/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FormControl,
  FormDescription,
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
import { Loader2 } from 'lucide-vue-next'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const selectedLanguage = ref('')
const selectedFile = ref(null)
const isLoading = ref(false)
const ocrResult = ref('')

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const languageRequired = () => {
  if (!selectedLanguage.value) {
    throw new Error('Please select a language.')
  }
}

const imageRequired = () => {
  if (!selectedFile.value) {
    throw new Error('Please select an image file.')
  }
}

const onSubmit = async () => {
  try {
    // Validate language
    languageRequired()
    imageRequired()

    isLoading.value = true
    const formData = new FormData()
    formData.append('language', selectedLanguage.value)
    formData.append('image', selectedFile.value)

    ocrResult.value = await api.ocr.fetchImageToText(formData)

    isLoading.value = false
    clear()
  } catch (error) {
    isLoading.value = false
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error,
      variant: 'destructive'
    })
  }
}

const clear = () => {
  selectedLanguage.value = ''
  selectedFile.value = ''
}
</script>

<template>
  <div class="mx-auto w-full max-w-3xl flex-1 py-6 px-4 lg:px-6">
    <h2 class="text-3xl font-bold tracking-tight mb-4">Image to Text</h2>

    <form class="" @submit.prevent="onSubmit">
      <FormField name="language">
        <FormItem>
          <FormLabel>Select language</FormLabel>
          <FormControl>
            <Select v-model="selectedLanguage">
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng"> English </SelectItem>
                <SelectItem value="fra"> French </SelectItem>
                <SelectItem value="deu"> German </SelectItem>
                <SelectItem value="hin"> Hindi </SelectItem>
                <SelectItem value="ita"> Italian </SelectItem>
                <SelectItem value="rus"> Russian </SelectItem>
                <SelectItem value="spa"> Spanish (Castilian) </SelectItem>
                <SelectItem value="tur"> Turkish </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <!-- <FormDescription> Supported languages: deu, eng, fra, hin, ita, rus, spa, tur </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="file">
        <FormItem class="mt-2">
          <FormLabel>Upload an image</FormLabel>
          <FormControl>
            <Input id="picture" type="file" @change="handleFileChange" />
          </FormControl>
          <FormDescription> Supported formats: jpg, jpeg, png, bmp, pbm, webp </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full mt-4" type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Process Image
      </Button>
    </form>

    <Textarea
      v-model="ocrResult"
      class="mt-4 h-[300px]"
      placeholder="Your OCR result will be displayed here."
    />
  </div>
</template>
