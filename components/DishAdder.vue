<template>
  <div class="accent-gradient-bg overflow-hidden rounded-xl">
    <div
      class="outer-bg-color flex h-full w-full items-center justify-center rounded-xl border-2 border-transparent bg-clip-padding"
    >
      <button
        class="rounded-full px-2 text-black"
        @click.stop="emit('decrement')"
      >
        -
      </button>
      <span class="mx-1 inline-block min-w-[2ch] text-center text-black lg:mx-2">{{ props.value || 0 }}</span>
      <button
        class="rounded-full px-2 text-black"
        @click.stop="emit('increment')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number
}>()

const emit = defineEmits(['increment', 'decrement'])
</script>
