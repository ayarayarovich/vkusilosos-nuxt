import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore(
  'location',
  () => {
    const receptionWay = ref<'delivery' | 'restaurant'>('delivery')

    return { receptionWay }
  },
  { persist: true }
)
