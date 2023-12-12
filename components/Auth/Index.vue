<template>
  <button
    class="group relative inline-block aspect-square h-8"
    @click="authDialogStore.open()"
  >
    <IconUserDark class="absolute left-0 top-0 h-full opacity-100 transition-opacity group-hover:opacity-0" />
    <IconUserColor class="absolute left-0 top-0 h-full opacity-0 transition-opacity group-hover:opacity-100" />
  </button>
</template>

<script setup lang="ts">
import { useAuthDialogStore } from '~/store/authDialog'
const authDialogStore = useAuthDialogStore()
</script>
