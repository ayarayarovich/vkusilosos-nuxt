<template>
  <button
    class="text-orange-200"
    @click="isModalOpen = true"
  >
    Посмотреть
  </button>
  <ProfileDesktopDialogOrdersHistoryReceiptDialog
    :show="isModalOpen"
    :order-id="props.orderId"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  orderId: number
}>()

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
