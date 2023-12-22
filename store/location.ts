import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Address } from '~/interfaces/main'

export const useLocationStore = defineStore(
  'location',
  () => {
    const adres = ref<Address>()
    const rest = ref<IRestaurant>()
    const reciptionWay = ref<'delivery' | 'restaurant'>('delivery')

    const deliveryTime = ref<string | null>()

    return { deliveryTime, adres, rest, reciptionWay }
  },
  { persist: true }
)
