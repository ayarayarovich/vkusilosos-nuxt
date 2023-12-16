<template>
  <button
    type="button"
    class="overflow-hidden rounded-full border-2 border-transparent bg-orange-200 transition"
    :class="{
      'bg-opacity-50': !checked,
    }"
  >
    <div class="flex items-center gap-2 bg-white px-6 py-2">
      <img
        v-if="props.img"
        class="aspect-square h-4 object-cover"
        :src="props.img"
      />
      <span>
        {{ props.name }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: number
  img?: string
  name: string
  checked?: boolean
}>()
</script>
