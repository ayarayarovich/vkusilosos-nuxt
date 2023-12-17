import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Address } from '~/interfaces/main'

export const useLocationStore = defineStore(
  'location',
  () => {
    const location = ref<Address>()
    const restaurantsLocations = ref([
      {
        city: 'Москва',
        address: 'Полтавская 12',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Маяковского 54',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Степная 87',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
      {
        city: 'Москва',
        address: 'Пушкина 165',
        workingHours: 'Пн-Вс: 9:00 - 22:00',
      },
    ])
    const reciptionWay = ref<'delivery' | 'restaurant'>('delivery')

    const deliveryTime = ref<string | null>()

    return { location, deliveryTime, restaurantsLocations, reciptionWay }
  },
  { persist: true }
)
