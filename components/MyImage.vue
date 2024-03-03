<template>
  <div
    ref="el"
    class="h-full w-full"
  >
    <img
      v-if="wasInView"
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
const props = defineProps<{
  src?: string
  srcset?: string
  alt?: string
}>()

const el = ref()
const wasInView = ref(false)
const loaded = ref(false)

let timeoutId: any

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
