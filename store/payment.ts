import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', () => {
  const receptionWay = ref<'delivery' | 'restaurant'>('delivery')
  return { receptionWay }
})
