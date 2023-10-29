<template>
  <button
    class="flex items-center rounded-xl uppercase"
    @click="isModalOpen = true"
  >
    Напишите нам
  </button>
  <WriteUsDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
