import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore(
  'location',
  () => {
    const reciptionWay = ref<'delivery' | 'restaurant'>('delivery')

    return { reciptionWay }
  },
  { persist: true }
)
