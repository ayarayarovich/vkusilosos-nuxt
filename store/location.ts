import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore(
  'location',
  () => {
    const canDeliver = ref<boolean | null>(null)

    return { canDeliver }
  },
  { persist: true }
)
