<template>
  <div class="bg-[#EB001B] p-4 text-white">
    <p class="flex items-center gap-2 font-bold">
      {{ props.title }}
    </p>
    <p>{{ props.detail }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  detail: string
}>()
</script>
