<template>
  <div class="flex h-full flex-col items-stretch gap-2 pt-2">
    <div class="relative h-0 grow">
      <HeadlessRadioGroup
        v-model="selectedRestaurant"
        class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto scroll-smooth py-2"
      >
        <HeadlessRadioGroupOption
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          v-slot="{ active, checked }"
          as="template"
          :value="restaurant"
        >
          <button
            class="rounded-xl border-2 border-transparent bg-white p-2 shadow-main outline-none transition-colors"
            :class="{
              '!border-orange-200': checked,
              'border-orange-100': active,
            }"
          >
            <div class="mb-1 flex">
              <IconMapPoint class="mr-2 w-5" />
              <div>
                {{ restaurant.adres }}
              </div>
            </div>
            <div class="flex text-sm">
              <div class="ml-7 opacity-50">
                {{ restaurant.from_hour }}
              </div>
            </div>
          </button>
        </HeadlessRadioGroupOption>
      </HeadlessRadioGroup>

      <div class="absolute left-0 right-0 top-0 h-2 bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>

    <SimpleButton
      class="px-4 py-4 font-medium uppercase"
      :disabled="!selectedRestaurant"
      @click="selectRestaurant"
    >
      Выбрать
    </SimpleButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocationStore } from '~/store/location'

const emit = defineEmits(['updateCoords'])

const locationStore = useLocationStore()

const { data: restaurants } = useRestaurants((v) => v)

const { rest } = storeToRefs(locationStore)
const selectedRestaurant = ref<IRestaurant>()

watch(
  [rest],
  () => {
    if (rest.value) {
      selectedRestaurant.value = rest.value
    }
  },
  {
    immediate: true,
  }
)

watchEffect(() => {
  if (selectedRestaurant.value) {
    emit('updateCoords', [selectedRestaurant.value.lat, selectedRestaurant.value.lng])
  }
})

const selectRestaurant = () => {
  if (selectedRestaurant.value) {
    rest.value = selectedRestaurant.value
  }
}
</script>
