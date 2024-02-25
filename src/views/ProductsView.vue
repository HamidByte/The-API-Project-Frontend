<script setup>
import * as ROUTES from '@/lib/definitions/routes/main'

import ProductCard from '@/components/products/ProductCard.vue'
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
    <ProductCard
      title="Image to Text"
      description="Automatically extract printed text, handwriting, and data from an image."
      status="New"
      :disabled="false"
      :routePath="ROUTES.imageToText.path"
    >
      <ul class="mt-2">
        <li>1 request requires 10 credits</li>
      </ul>
    </ProductCard>

    <ProductCard
      title="Random Quotes API"
      description="Provides random quotes, search quotes, get random quote by ID, search by category, and
            search by author."
      :disabled="false"
      :routePath="ROUTES.quotes.path"
    >
      <ul class="mt-2">
        <li>1 request requires 1 credit</li>
      </ul>
    </ProductCard>

    <ProductCard
      title="Random Giphies API"
      description="Provides random giphies, search giphies, get giphy by ID, and get giphy by Gif ID."
      :disabled="false"
      :routePath="ROUTES.giphies.path"
    >
      <ul class="mt-2">
        <li>1 request requires 1 credit</li>
      </ul>
    </ProductCard>

    <ProductCard
      title="Mockup API"
      description="Generate massive amounts of mockup data for testing and development."
      status="Coming Soon"
      :disabled="true"
    >
      <ul class="mt-2">
        <li>1 request requires 1 credit</li>
      </ul>
    </ProductCard>

    <ProductCard
      title="IP Logger & URL Shortener"
      description="IP Logger URL Shortener allows to track IP address and track locations, provides IP lookup and IP grabber services and lets you check what is my ip, use URL tracker."
      status="Coming Soon"
      :disabled="true"
    >
      <ul class="mt-2">
        <li>1 request requires 1 credit</li>
      </ul>
    </ProductCard>

    <ProductCard
      title="Brand Name Generator"
      description="Generate a short, brandable business name using artificial intelligence"
      status="Coming Soon"
      :disabled="true"
    >
      <ul class="mt-2">
        <li>1 request requires 10 credit</li>
      </ul>
    </ProductCard>
  </div>
</template>
