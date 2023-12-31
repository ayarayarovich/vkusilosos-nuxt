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
      <span v-if="currentReciptionWay?.type === 'delivery'">
        <span>{{ transformAddress(currentReciptionWay.adres) }}</span>
        <span class="mx-2">|</span>
        <span class="text-[#999700]">~ {{ 'Нет данных' }}</span>
      </span>
      <span v-else-if="currentReciptionWay?.type === 'restaurant'">
        <span>{{ currentReciptionWay.name }}</span>
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
import { nthIndex } from '~/utils'

const isModalOpen = ref(false)

const currentReciptionWay = useCurrentReciptionWay()

const transformAddress = (address: string) => {
  return address.slice(nthIndex(address, ',', 1) + 1).trim()
}

const closeModal = () => (isModalOpen.value = false)
</script>
