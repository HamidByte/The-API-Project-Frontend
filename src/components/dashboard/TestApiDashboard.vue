<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import api from '@/api'

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
const userStore = useUserStore()
const apiKeyToken = ref(null)
// const selectedApi = ref(null)
// const apiKeyQuery = ref(null)
// const apiKeyBody = ref(null)
const randomQuoteJson = ref(null)

const ApiMappings = {
  RANDOM_QUOTE: {
    NAME: 'RANDOM_QUOTE',
    ENDPOINTS: {
      RANDOM: '/api/v1/quote/random',
      SEARCH: '/api/v1/quote/search',
      QUOTE_BY_ID: '/api/v1/quote/:id',
      QUOTE_BY_CATEGORY: '/api/v1/quote/category/:category',
      QUOTE_BY_AUTHOR: '/api/v1/quote/author/:author'
    }
  },
  RANDOM_GIPHY: {
    NAME: 'RANDOM_GIPHY',
    ENDPOINTS: {
      RANDOM: '/api/v1/giphy/random',
      SEARCH: '/api/v1/giphy/search',
      QUOTE_BY_ID: '/api/v1/giphy/:id',
      GIPHY_BY_GIF_ID: '/api/v1/giphy/gif/:gifId'
    }
  }
}

const formSchema = toTypedSchema(
  z.object({
    apiName: z.string({
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
  if (
    values.apiName === ApiMappings.RANDOM_QUOTE.NAME &&
    values.endpoints === ApiMappings.RANDOM_QUOTE.ENDPOINTS.RANDOM
  ) {
    try {
      const result = await api.quotes.getRandomQuote(apiKeyToken.value)
      userStore.setUser({ requestCount: userStore.user.requestCount + 1 })
      randomQuoteJson.value = result
      toast({
        title: 'Hooray! Operation Successful!',
        description: 'Random quote retrieved successfully.'
      })
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        description: error,
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

    <div
      class="flex flex-col sm:flex-row items-center gap-1.5 py-4 md:min-w-[600px]"
      style="width: 400px"
    >
      <div class="min-w-full w-[400px] min-h-[400px] sm:w-1/2 space-y-6">
        <form @submit.prevent="onSubmit">
          <div class="space-y-2 my-4">
            <FormField v-slot="{ componentField }" name="apiName">
              <FormItem>
                <FormLabel>API (required)</FormLabel>

                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="RANDOM_QUOTE">Random Quote</SelectItem>
                      <!-- <SelectItem value="RANDOM_GIPHY">Random Giphy</SelectItem> -->
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="endpoints">
              <FormItem>
                <FormLabel>Endpoints (required)</FormLabel>

                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API endpoint" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="/api/v1/quote/random">[Random Quote] /random</SelectItem>
                      <!-- <SelectItem value="/api/v1/quote/search">[Random Quote] /search</SelectItem>
                      <SelectItem value="/api/v1/quote/:id">[Random Quote] /:id</SelectItem>
                      <SelectItem value="/api/v1/quote/category/:category"
                        >[Random Quote] /category/:category</SelectItem
                      >
                      <SelectItem value="/api/v1/quote/author/:author"
                        >[Random Quote] /author/:author</SelectItem
                      >
                      <SelectItem value="/api/v1/giphy/random">[Random Giphy] /random</SelectItem>
                      <SelectItem value="/api/v1/giphy/search">[Random Giphy] /search</SelectItem>
                      <SelectItem value="/api/v1/giphy/:id">[Random Giphy] /:id</SelectItem>
                      <SelectItem value="/api/v1/giphy/gif/:gifId"
                        >[Random Giphy] /category/:category</SelectItem
                      > -->
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- <div class="space-y-2 my-4">
            <Label class="" for="apiKeyQuery">
              Query (only if required by the selected endpoint)
            </Label>
            <Input
              id="apiKeyQuery"
              class="space-y-2"
              v-model="apiKeyQuery"
              placeholder="Query"
              type="text"
              auto-capitalize="none"
              auto-correct="off"
            />
          </div>

          <div class="space-y-2 my-4">
            <Label class="" for="apiKeyBody">
              Body Payload (only if required by the selected endpoint)
            </Label>
            <Input
              id="apiKeyBody"
              class="space-y-2"
              v-model="apiKeyBody"
              placeholder="Body Params"
              type="text"
              auto-capitalize="none"
              auto-correct="off"
            />
          </div> -->

          <div class="space-y-2 my-4">
            <Label class="" for="apiKeyAuth">API Key Authorization (required)</Label>
            <Input
              id="apiKeyAuth"
              class="space-y-2"
              v-model="apiKeyToken"
              placeholder="<API_KEY>"
              type="text"
              auto-capitalize="none"
              auto-correct="off"
              required
            />
          </div>

          <Button class="mt-3 float-right" type="submit">Submit</Button>
        </form>
      </div>

      <div
        class="min-w-full min-h-[400px] sm:w-1/2 max-h-[500px] overflow-y-auto space-y-6 p-6 border-2 border-dotted rounded"
      >
        <vue-json-pretty v-if="!!randomQuoteJson" :data="randomQuoteJson" />
      </div>
    </div>
  </div>
</template>
