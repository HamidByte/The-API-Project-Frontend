<script setup>
import { useRouter } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'
import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const router = useRouter()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
    <Card>
      <CardContent>
        <div class="relative pb-4/3">
          <!-- Product Image -->
        </div>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">Random Quotes API</h2>
          </div>
        </div>
        <div class="mt-2 text-gray-500 h-[5rem]">
          <p>
            Provides random quotes, search quotes, get random quote by ID, search by category, and
            search by author.
          </p>
          <ul class="mt-2">
            <li>1 request requires 1 credit</li>
          </ul>
        </div>
        <div class="mt-6">
          <Button class="w-full mt-2" variant="default" @click="router.push(ROUTES.quotes.path)"
            >Go to API</Button
          >
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="relative pb-4/3">
          <!-- Product Image -->
        </div>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">Random Giphies API</h2>
          </div>
        </div>
        <div class="mt-2 text-gray-500 h-[5rem]">
          <p>Provides random giphies, search giphies, get giphy by ID, and get giphy by Gif ID.</p>
          <ul class="mt-2">
            <li>1 request requires 1 credit</li>
          </ul>
        </div>
        <div class="mt-6">
          <Button class="w-full mt-2" variant="default" @click="router.push(ROUTES.giphies.path)"
            >Go to API</Button
          >
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="relative pb-4/3">
          <!-- Product Image -->
        </div>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">Image to Text</h2>
          </div>
          <Badge class="mr-1 bg-emerald-400 hover:bg-emerald-500">New</Badge>
        </div>
        <div class="mt-2 text-gray-500 h-[5rem]">
          <p>Automatically extract printed text, handwriting, and data from an image.</p>
          <ul class="mt-2">
            <li>1 request requires 10 credits</li>
          </ul>
        </div>
        <div class="mt-6">
          <Button
            class="w-full mt-2"
            variant="default"
            @click="router.push(ROUTES.imageToText.path)"
            >Go to API</Button
          >
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div class="relative pb-4/3">
          <!-- Product Image -->
        </div>
        <div class="mt-4 flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">Faker API</h2>
          </div>
          <Badge class="mr-1 bg-rose-400 hover:bg-rose-500">Coming Soon</Badge>
        </div>
        <div class="mt-2 text-gray-500 h-[5rem]">
          <p>Generate massive amounts of fake (but realistic) data for testing and development.</p>
          <ul class="mt-2">
            <li>1 request requires 1 credit</li>
          </ul>
        </div>
        <div class="mt-6">
          <Button class="w-full mt-2" variant="default" disabled>Go to API</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
