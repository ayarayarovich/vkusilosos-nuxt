<template>
  <button
    class="group relative inline-block aspect-square h-8"
    @click="isOpen = true"
  >
    <IconUserDark class="absolute left-0 top-0 h-full opacity-100 transition-opacity group-hover:opacity-0" />
    <IconUserColor class="absolute left-0 top-0 h-full opacity-0 transition-opacity group-hover:opacity-100" />
  </button>
  <TestDialog
    :show="isOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const closeModal = () => (isOpen.value = false)
</script>
