<template>
  <button
    class="relative group inline-block h-8 aspect-square"
    @click="isOpen = true"
  >
    <IconUserDark class="absolute top-0 left-0 h-full transition-opacity opacity-100 group-hover:opacity-0" />
    <IconUserColor class="absolute top-0 left-0 h-full transition-opacity opacity-0 group-hover:opacity-100" />
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
