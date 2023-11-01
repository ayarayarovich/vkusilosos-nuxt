<template>
  <button
    class="group relative inline-block aspect-square h-8"
    @click="isOpen = true"
  >
    <IconUserDark class="absolute left-0 top-0 h-full opacity-100 transition-opacity group-hover:opacity-0" />
    <IconUserColor class="absolute left-0 top-0 h-full opacity-0 transition-opacity group-hover:opacity-100" />
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
