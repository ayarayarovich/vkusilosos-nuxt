<template>
  <div
    :class="isTall ? 'h-auto w-full' : 'h-full w-auto'"
    :style="{ aspectRatio: props.ratio }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  ratio: number
}>()

const parent = useParentElement()

const isTall = ref(false)

useResizeObserver(parent, ([entry]) => {
  const { width, height } = entry.contentRect
  isTall.value = width / height < 9 / 16
})
</script>
