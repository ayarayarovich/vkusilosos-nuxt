<template>
  <div
    ref="el"
    class="h-full w-full"
  >
    <img
      v-if="loaded || wasInView"
      class="h-full w-full object-contain object-center opacity-0 transition-opacity delay-100"
      :class="{
        '!opacity-100': loaded,
      }"
      :src="props.src"
      :srcset="props.srcset"
      :alt="props.alt"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { isElementInViewport } from '~/utils'

const props = defineProps<{
  src?: string
  srcset?: string
  alt?: string
}>()

const el = ref()
const wasInView = ref(false)
const loaded = ref(false)

const { isScrolling } = useScroll(document || null)

let timeoutId: any

watch(
  [isScrolling],
  () => {
    if (window && el.value) {
      if (!isScrolling.value && isElementInViewport(el.value, true)) {
        timeoutId = undefined
        wasInView.value = true
      }
    }
  },
  {
    immediate: true,
  }
)

useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          wasInView.value = true
        }, 500)
      }
    } else {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  },
  {
    threshold: 0,
  }
)
</script>
