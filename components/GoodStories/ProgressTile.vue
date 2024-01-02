<template>
  <div class="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30">
    <div
      ref="el"
      class="absolute inset-0 -translate-x-full bg-white/80"
      :class="{
        '!translate-x-0': props.index < currentNarrativeSlideIndex,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { StateInjectionKey } from './state'

const props = defineProps<{
  index: number
}>()

const el = ref<HTMLDivElement>()

const { currentNarrativeSlideIndex, currentNarrativeIndex, goToNextNarrativeSlide } = inject(StateInjectionKey)!

let animation: GSAPTween | undefined

watch(
  [currentNarrativeIndex, currentNarrativeSlideIndex, el],
  () => {
    if (el.value && props.index === unref(currentNarrativeSlideIndex)) {
      animation = gsap.to(el.value, {
        xPercent: 100,
        duration: 5,
        ease: 'none',
        onComplete: goToNextNarrativeSlide,
      })
    } else if (props.index !== unref(currentNarrativeSlideIndex)) {
      animation?.revert()
    }
  },
  {
    immediate: true,
  }
)

onUnmounted(() => {
  animation?.revert()
})
</script>
