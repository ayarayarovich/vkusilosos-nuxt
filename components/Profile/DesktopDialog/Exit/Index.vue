<template>
  <button
    class="my-4 px-6 py-4 text-start transition-colors hover:bg-white"
    @click="isModalOpen = true"
  >
    Выйти <IconExit class="inline-block h-6" />
  </button>
  <ProfileDesktopDialogExitDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
