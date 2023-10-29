<template>
  <button
    class="focus:ring-2 ring-offset-2 transition-shadow ring-orange-200 rounded-lg p-1 outline-none"
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
