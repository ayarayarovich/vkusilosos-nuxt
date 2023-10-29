<template>
  <button
    class="my-4 py-4 px-6 text-start transition-colors hover:bg-white"
    @click="isModalOpen = true"
  >
    Выйти <IconExit class="h-6 inline-block" />
  </button>
  <ProfileDialogExitDialog
    :show="isModalOpen"
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
