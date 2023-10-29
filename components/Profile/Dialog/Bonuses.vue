<template>
  <div class="flex flex-col items-stretch h-full">
    <button
      class="flex items-center mt-10 mx-8 mb-4 gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 md:hidden invert rotate-180" />
      <h2 class="block text-xl font-medium leading-none">Бонусная система</h2>
    </button>

    <div class="h-px bg-black opacity-10 mx-4 mb-8"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])
</script>
