<template>
  <button
    class="uppercase"
    @click="isOpen = true"
  >
    ЛИЧНЫЙ КАБИНЕТ
  </button>
  <ProfileDialog
    :show="isOpen"
    @close="closeDialog"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
function closeDialog() {
  isOpen.value = false
}
</script>
