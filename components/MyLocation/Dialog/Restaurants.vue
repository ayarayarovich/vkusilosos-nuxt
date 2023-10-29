<template>
  <div class="flex flex-col items-stretch h-full gap-2 mt-2">
    <div class="grow h-0 relative">
      <div class="flex flex-col items-stretch gap-2 overflow-y-auto scrollbar-hide scroll-smooth h-full py-2">
        <button
          v-for="(restaurant, index) in restaurantsLocations"
          :key="index"
          class="p-2 bg-white outline-none border-2 border-transparent rounded-xl focus:border-orange-200 shadow-main"
          @focus="currentRestaurantSelected = restaurant"
        >
          <div class="flex mb-1">
            <IconMapPoint class="w-5 mr-2" />
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

      <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>

    <SimpleButton
      class="py-4 px-4 uppercase font-medium"
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
