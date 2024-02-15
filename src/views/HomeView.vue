<script setup>
import { RouterLink } from 'vue-router'
import * as ROUTES from '@/lib/definitions/routes/main'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
</script>

<template>
  <!-- <div class="flex-col md:flex">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Home Page</h2>
      </div>
    </div>
  </div> -->
  <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
    <div class="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
      <RouterLink
        to="#"
        class="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
        target="_blank"
      >
        Follow along on Twitter
      </RouterLink>
      <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
        Explore the power of our API services platform
      </h1>
      <p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Built with Node.js, Express, Sequelize, PostgreSQL, Vue, shadcn-vue and Tailwind CSS. Join
        us on the journey of seamless integration and efficient management.
      </p>
      <div class="space-x-4">
        <RouterLink :to="ROUTES.dashboard.path" :class="cn(buttonVariants({ size: 'lg' }))">
          Get Started
        </RouterLink>
        <RouterLink
          to="#"
          target="_blank"
          rel="noreferrer"
          :class="cn(buttonVariants({ variant: 'outline', size: 'lg' }))"
        >
          GitHub
        </RouterLink>
      </div>
    </div>
  </section>
  <section
    id="features"
    class="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
  >
    <div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        This project is an experiment to see how a modern app, with features like auth,
        subscriptions, API routes, and static pages would work in Node, Express, Vue 3 and
        PostgreSQL.
      </p>
    </div>
    <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg viewBox="0 0 261.76 226.69" class="h-12 w-12 fill-current">
            <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
              <g transform="translate(178.06 235.01)">
                <path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" />
              </g>
              <g transform="translate(178.06 235.01)">
                <path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" />
              </g>
            </g>
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Vue 3</h3>
            <p class="text-sm text-muted-foreground">
              App, Routing, Layouts, UI. Deployed on Netlify.
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
            <path
              d="M15.6491 0.00582604C12.9679 -0.120371 10.7133 1.81847 10.3286 4.373C10.3134 4.49154 10.2905 4.60627 10.2715 4.72099C9.67356 7.90268 6.88955 10.3119 3.5457 10.3119C2.35364 10.3119 1.23395 10.006 0.258977 9.47058C0.140914 9.40557 0 9.4897 0 9.62354V10.3081V20.6218H10.2677V12.8894C10.2677 11.4668 11.4178 10.3119 12.8346 10.3119H15.4015C18.3074 10.3119 20.6458 7.89121 20.5315 4.94662C20.4287 2.29649 18.2884 0.132023 15.6491 0.00582604Z"
            ></path>
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Node.js</h3>
            <p class="text-sm text-muted-foreground">
              Server Components, API routes. Deployed on Render.
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-12 w-12"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Database</h3>
            <p class="text-sm text-muted-foreground">
              PostgreSQL ORM using Sequelize and deployed on ElephantSQL.
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
            <path
              d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
            />
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Components</h3>
            <p class="text-sm text-muted-foreground">
              UI components built using Radix UI and styled with Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            class="h-12 w-12 fill-current"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Authentication</h3>
            <p class="text-sm text-muted-foreground">
              Authentication using JWT, Express Session and middlewares.
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background p-2">
        <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
          <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
            <path
              d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
            />
          </svg>
          <div class="space-y-2">
            <h3 class="font-bold">Subscriptions</h3>
            <p class="text-sm text-muted-foreground">Free and paid subscriptions using Stripe.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center md:max-w-[58rem]">
      <p class="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        The API Project also includes a full-featured documentation site built using Postman.
      </p>
    </div>
  </section>
  <section id="open-source" class="container py-8 md:py-12 lg:py-24">
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
      <h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Proudly Open Source
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        The API Project is open source and powered by open source software. <br />
        The code is available on
        <RouterLink to="#" target="_blank" rel="noreferrer" class="underline underline-offset-4">
          GitHub
        </RouterLink>
      </p>
    </div>
  </section>
</template>
