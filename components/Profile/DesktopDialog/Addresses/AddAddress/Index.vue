<template>
  <SimpleButton
    class="w-full px-8 py-4"
    @click="isModalOpen = true"
  >
    Добавить адресс
  </SimpleButton>

  <ProfileDesktopDialogAddressesAddAddressDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
