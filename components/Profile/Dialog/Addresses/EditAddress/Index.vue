<template>
  <button
    class="rounded-lg p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
    @click="isModalOpen = true"
  >
    <IconEditPen class="h-full" />
  </button>

  <ProfileDialogAddressesEditAddressDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
