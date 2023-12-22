<template>
  <div>
    <p class="font-bold flex items-center gap-2"><img src="~/assets/check-mark.png" class="h-4 w-auto" /> {{ props.title }}</p>
    <p>{{ props.detail }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  detail: string
}>()
</script>
