<script setup>
import { ref, watch } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const date = ref(props.modelValue)

watch(date, (newDate) => {
  emits('update:modelValue', newDate)
})
</script>

<template>
  <div>
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
  </div>
</template>
