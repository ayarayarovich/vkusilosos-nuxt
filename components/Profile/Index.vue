<template>
  <button
    class="relative group inline-block h-8 aspect-square"
    @click="isOpen = true"
  >
    <IconUserDark
      class="absolute top-0 left-0 h-full transition-opacity opacity-100 group-hover:opacity-0"
    />
    <IconUserColor
      class="absolute top-0 left-0 h-full transition-opacity opacity-0 group-hover:opacity-100"
    />
  </button>
  <ProfileDialog :show="isOpen" @close="closeDialog" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
function closeDialog() {
  isOpen.value = false;
}
</script>
