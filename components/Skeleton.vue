<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <slot v-if="props.showContent"></slot>
    <div
      v-else
      class="max-w-full animate-pulse rounded-md bg-black bg-opacity-20"
      :style="`height: ${height}; width: ${width}`"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  showContent: boolean
  height: string
  width: string
}>()
</script>
