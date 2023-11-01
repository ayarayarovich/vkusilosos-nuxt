<template>
  <div class="flex h-full flex-col items-stretch">
    <button
      class="mx-8 mb-4 mt-10 flex items-center gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
      <h2 class="block text-xl font-medium leading-none">Бонусная система</h2>
    </button>

    <div class="mx-4 mb-8 h-px bg-black opacity-10"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])
</script>
