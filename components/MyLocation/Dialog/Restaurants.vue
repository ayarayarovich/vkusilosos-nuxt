<template>
  <div class="pt-2 flex h-full flex-col items-stretch gap-2">
    <div class="relative h-0 grow">
      <div class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto scroll-smooth py-2">
        <button
          v-for="(restaurant, index) in restaurantsLocations"
          :key="index"
          class="rounded-xl border-2 border-transparent bg-white p-2 shadow-main outline-none focus:border-orange-200"
          @focus="currentRestaurantSelected = restaurant"
        >
          <div class="mb-1 flex">
            <IconMapPoint class="mr-2 w-5" />
            <div>
              {{ restaurant.city }},
              {{ restaurant.address }}
            </div>
          </div>
          <div class="flex text-sm">
            <div class="ml-7 opacity-50">
              {{ restaurant.workingHours }}
            </div>
          </div>
        </button>
      </div>

      <div class="absolute left-0 right-0 top-0 h-2 bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>

    <SimpleButton
      class="px-4 py-4 font-medium uppercase"
      @click="console.log('current restaurant ' + JSON.stringify(currentRestaurantSelected))"
      >Выбрать</SimpleButton
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocationStore } from '~/store/location'

const locationStore = useLocationStore()

const { restaurantsLocations } = storeToRefs(locationStore)
const currentRestaurantSelected = ref<(typeof restaurantsLocations.value)[0]>()
</script>
