<template>
  <button
    class="group rounded-xl accent-gradient-bg text-white outline-none transition-opacity focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
    :class="props.disabled ? 'opacity-50' : ''"
    :disabled="props.disabled"
    @click.stop="emit('click', $event)"
  >
    <div class="leading-none flex items-center justify-center">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<style></style>
