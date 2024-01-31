<template>
  <button
    class="flex items-center rounded-xl p-2 font-light"
    @click="isModalOpen = true"
  >
    <IconMap class="mr-2 inline h-8" />
    <Transition
      name="fade"
      mode="out-in"
    >
      <span
        v-if="currentReceptionWay?.type === 'delivery'"
        class="flex items-center gap-2"
      >
        <span>{{ transformAddress(currentReceptionWay.adres) }}</span>
        <span
          v-if="locationStore.canDeliver != null"
          class=""
          >|</span
        >
        <span
          v-if="locationStore.canDeliver === true"
          class="text-[#999700]"
          >~ {{ '30 минут' }}</span
        >
        <span v-else-if="locationStore.canDeliver === false">
          <IconDangerTriangle class="inline" />
        </span>
      </span>
      <span v-else-if="currentReceptionWay?.type === 'restaurant'">
        <span>{{ currentReceptionWay.name }}</span>
        <span class="mx-2">|</span>
        <span class="text-[#999700]">~ {{ '30 минут' }}</span>
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
import { ref } from 'vue'
import { useLocationStore } from '~/store/location'
import { nthIndex } from '~/utils'

const isModalOpen = ref(false)

const { data: currentReceptionWay } = useCurrentReceptionWay()

const locationStore = useLocationStore()

const transformAddress = (address: string) => {
  let count = 0
  for (let i = 0; i < address.length; ++i) {
    if (address[i] === ',') count++
  }
  return address.slice(nthIndex(address, ',', Math.max(2, count - 1)) + 1).trim()
}

const closeModal = () => (isModalOpen.value = false)
</script>
