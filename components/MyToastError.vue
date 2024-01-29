<template>
  <div class="bg-[#fb7185] p-4 text-black">
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
