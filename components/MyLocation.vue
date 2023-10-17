<template>
    <button
        @click="isModalOpen = true"
        class="flex items-center rounded-xl p-2 font-light"
    >
        <IconMap class="mr-2 inline h-8" />
        <Transition
            name="fade"
            mode="out-in"
        >
            <span v-if="locationStore.location">
                <span>{{ locationStore.location }}</span>
                <span class="mx-2">|</span>
                <span class="text-[#999700]">~ {{ locationStore.deliveryTime }}</span>
            </span>
            <span v-else>Выберите адрес</span>
        </Transition>
    </button>
    <MyLocationDialog
        :show="isModalOpen"
        @close="closeModal"
    />
</template>

<script setup lang="ts">
import { useLocationStore } from '~/store/location'
import { ref } from 'vue'

const locationStore = useLocationStore()
const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
