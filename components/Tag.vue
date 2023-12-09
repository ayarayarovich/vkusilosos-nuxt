<template>
  <button
    type="button"
    class="border-2 border-transparent overflow-hidden rounded-full bg-orange-200 transition"
    :class="{
      'bg-opacity-50': !checked
    }"
  >
    <div class="bg-white flex gap-2 items-center py-2 px-6">
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
