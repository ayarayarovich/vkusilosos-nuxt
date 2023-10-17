import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore(
    'location',
    () => {
        const location = ref<string | null>(null)
        const deliveryTime = ref<string | null>(null)

        function determineUsersLocation() {
            location.value = 'Маяковского, 53'
            deliveryTime.value = '30 минут'
        }

        return { location, deliveryTime, determineUsersLocation }
    },
    { persist: true }
)
