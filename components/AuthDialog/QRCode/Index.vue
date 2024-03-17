<template>
  <button
    class="text-orange-200"
    @click="isModalOpen = true"
  >
    Вход по QR-коду
  </button>
  <AuthDialogQRCodeDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
