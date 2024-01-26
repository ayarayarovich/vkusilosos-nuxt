<template>
  <div
    ref="mouseFollowerEl"
    class="pointer-events-none fixed left-0 top-0 z-50 -my-4 -ml-4 aspect-square h-8 rounded-full"
  >
    <IconCloseGray class="h-8" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  hideWhenOverEl?: HTMLElement
}>()

const { hideWhenOverEl } = toRefs(props)

const mouseFollowerEl = ref()

const { apply } = useMotion(mouseFollowerEl, {
  initial: {
    scale: 0,
  },
})

const { x, y } = useMouse({
  type: 'client',
  initialValue: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  window,
})

const isOutside = ref(true)
useEventListener(hideWhenOverEl, 'mouseenter', () => {
  isOutside.value = false
})
useEventListener(hideWhenOverEl, 'mouseover', () => {
  isOutside.value = false
})
useEventListener(hideWhenOverEl, 'mouseleave', () => {
  isOutside.value = true
})

watch([x, y], () => {
  if (isOutside.value) {
    apply({
      x: x.value,
      y: y.value,
      scale: 1,
    })
  } else {
    apply({
      x: x.value,
      y: y.value,
      scale: 0,
    })
  }
})
</script>
