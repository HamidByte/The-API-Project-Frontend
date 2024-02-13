<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { api } from '@/api'

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { toast } from '@/components/ui/toast'
const apiKeyToken = ref(null)
const randomQuoteJson = ref(null)

const formSchema = toTypedSchema(
  z.object({
    api: z.string({
      required_error: 'Please select an API service.'
    }),
    endpoints: z.string({
      required_error: 'Please select an API endpoint.'
    })
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  if (values.api === 'random_quote' && values.endpoints === '/random' && !!apiKeyToken.value) {
    try {
      const result = await api.getRandomQuote(apiKeyToken.value)
      randomQuoteJson.value = result

      toast({
        title: 'Hooray! Operation Successful!',
        description: 'Random quote retrieved successfully.'
      })
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        description: 'Failed to fetch random quote. Please try again.',
        variant: 'destructive'
      })
    }
  }
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between space-y-2 mb-2">
      <h2 class="text-3xl font-bold tracking-tight">Test API</h2>
      <!-- <p class="text-sm text-muted-foreground">Test your APIs.</p> -->
    </div>
    ``

    <div class="flex flex-col sm:flex-row items-center gap-1.5 p-4">
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="api">
          <FormItem>
            <FormLabel>API</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an API service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="random_quote">Random Quote</SelectItem>
                  <SelectItem value="random_giphy">Random Giphy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="endpoints">
          <FormItem>
            <FormLabel>Endpoints</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an API endpoint" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="/random">/random</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <Label class="sr-only" for="apiKeyAuth">API Key Authorization</Label>
        <Input
          id="apiKeyAuth"
          v-model="apiKeyToken"
          placeholder="Bearer <API_KEY>"
          type="text"
          auto-capitalize="none"
          auto-correct="off"
          required
        />

        <Button type="submit">Submit</Button>
      </form>

      <vue-json-pretty :data="randomQuoteJson" />
    </div>
  </div>
</template>
