<template>
  <button
    class="text-orange-200"
    @click="isModalOpen = true"
  >
    Посмотреть
  </button>
  <ProfileDialogOrdersHistoryReceiptDialog
    :show="isModalOpen"
    :order-id="orderId"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
