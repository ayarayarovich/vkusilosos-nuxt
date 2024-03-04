<template>
  <HeadlessRadioGroupOption
    v-slot="{ active, checked }"
    :value="props.value"
    class="cursor-pointer outline-none"
  >
    <div class="flex items-center gap-4">
      <div class="rounded-full border border-black border-opacity-50 p-0.5">
        <div
          class="aspect-square h-2 rounded-full border border-transparent transition-colors"
          :class="{
            'bg-orange-100': active,
            '!bg-orange-400': checked,
          }"
        ></div>
      </div>
      <div class="flex items-center gap-2">
        <slot></slot>
        <span>{{ label }}</span>
      </div>
    </div>
  </HeadlessRadioGroupOption>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: any
  label: string
  icon?: string
}>()
</script>
