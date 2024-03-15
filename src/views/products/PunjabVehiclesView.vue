<script setup>
import { ref } from 'vue'
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

const VehiclesMappings = {
  VEHICLE_REG_NO: 'VEH_REG_NO',
  VEHICLE_CHASSIS_NO: 'VEHICLE_CHASSIS_NO',
  VEHICLE_ENGINE_NO: 'VEHICLE_ENGINE_NO',
  OWNER_CNIC: 'OWNER_CNIC'
}

const selectedField = ref('')
const searchInput = ref('')
const isLoading = ref(false)
const vehicleResult = ref('')

const handleSearch = (event) => {
  searchInput.value = event.target.value
}

const fieldRequired = () => {
  if (!selectedField.value) {
    throw new Error('Please select a field.')
  }

  if (!searchInput.value) {
    throw new Error('Search query is required.')
  }
}

const onSubmit = async () => {
  try {
    // Validate
    fieldRequired()

    isLoading.value = true

    if (selectedField.value === VehiclesMappings.VEHICLE_REG_NO) {
      const result = await api.pk.fetchPunjabVehicleByRegistration(searchInput.value)
      vehicleResult.value = result
    }

    if (selectedField.value === VehiclesMappings.VEHICLE_CHASSIS_NO) {
      // const result = await api.pk.searchGiphy(searchInput.value)
      // vehicleResult.value = result
    }

    if (selectedField.value === VehiclesMappings.VEHICLE_ENGINE_NO) {
      // const result = await api.pk.getRandomGiphyById(searchInput.value)
      // vehicleResult.value = result
    }

    if (selectedField.value === VehiclesMappings.OWNER_CNIC) {
      // const result = await api.pk.getRandomGiphyByGifId(searchInput.value)
      // vehicleResult.value = result
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
    <h2 class="text-3xl font-bold tracking-tight mb-4">Punjab Vehicles</h2>

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
                <SelectItem :value="VehiclesMappings.VEHICLE_REG_NO">
                  Vehicle Registration Number
                </SelectItem>
                <SelectItem :value="VehiclesMappings.VEHICLE_CHASSIS_NO">
                  Vehicle Chassis Number
                </SelectItem>
                <SelectItem :value="VehiclesMappings.VEHICLE_ENGINE_NO">
                  Vehicle Engine Number
                </SelectItem>
                <SelectItem :value="VehiclesMappings.OWNER_CNIC"> Owner CNIC </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <!-- <FormDescription> Description </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="search">
        <FormItem class="mt-2">
          <FormLabel>Search</FormLabel>
          <FormControl>
            <Input type="text" @change="handleSearch" />
          </FormControl>
          <!-- <FormDescription> Description </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full mt-4" type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Search
      </Button>
    </form>

    <Card v-if="vehicleResult" class="mt-4 p-6">
      <CardContent>
        <div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Registration No:</span>
            <span class="text-lg font-semibold text-muted-foreground">{{
              vehicleResult.VEH_REG_NO
            }}</span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Registration Date:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.REGISTRATION_DATE }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Chassis No:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.VEH_CHASIS_NO }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Engine No:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ parseFloat(vehicleResult.VEH_ENGINE_NO) }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Body Type:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.BODYTYPE }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Colour:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.COLOR }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Owner Name:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.OWN_NAME }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Father Name:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.F_H_NAME }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Owner CNIC:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ parseFloat(vehicleResult.OWN_NEW_NO) }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Owner Street:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.OWN_STREET }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Owner City:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.OWN_CITY }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Make:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.MAKE_MAKER }}
            </span>
          </div>
          <div
            class="rounded-sm shadow p-3 gap-2 hover:shadow-lg transition delay-50 duration-150 ease-in-out hover:scale-105 transform flex"
          >
            <span class="text-lg font-semibold min-w-[120px]">Registration Date:</span>
            <span class="text-lg font-semibold text-muted-foreground">
              {{ vehicleResult.REG_DATE }}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
