<template>
  <button
    class="accent-gradient-bg group rounded-xl text-white outline-none transition-all focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
    :class="props.disabled ? 'opacity-50' : ''"
    :disabled="props.disabled"
    @click.stop="emit('click', $event)"
  >
    <div class="flex items-center justify-center leading-none">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style></style>
