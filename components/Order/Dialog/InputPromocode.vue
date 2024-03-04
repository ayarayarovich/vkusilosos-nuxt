<template>
  <div class="flex gap-4 border-b-2 border-black/40 transition-colors focus-within:border-orange-200">
    <input
      v-model="value"
      class="peer w-full py-1 font-normal outline-none"
      :placeholder="placeholder"
    />
    <button
      class="text-orange-200 opacity-0 transition-opacity peer-focus:opacity-100"
      type="button"
    >
      Применить
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  placeholder?: string
}>()

const { value } = useField<string>(() => props.name)
</script>
