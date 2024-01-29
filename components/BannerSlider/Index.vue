<template>
  <div
    ref="container"
    class="sm relative isolate aspect-[12/5] overflow-hidden rounded-3xl shadow-lg md:aspect-[11/3]"
  >
    <!-- eslint-disable vue/require-toggle-inside-transition -->
    <Transition
      name="fade"
      mode="in-out"
    >
      <div
        v-if="slides"
        :key="activeSlideIndex"
        class="absolute inset-0 flex items-center justify-center text-4xl transition-opacity"
      >
        <RouterLink
          class="block h-full w-full"
          :to="slides[activeSlideIndex].link"
        >
          <img
            class="hidden h-full w-full object-cover md:block"
            :src="slides[activeSlideIndex].img"
            alt=""
          />
          <img
            class="h-full w-full object-cover md:hidden"
            :src="slides[activeSlideIndex].phone_img"
            alt=""
          />
        </RouterLink>
      </div>
    </Transition>
    <!-- eslint-enable -->

    <div class="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      <BannerSliderButton
        v-for="(slide, index) in slides"
        :key="index"
        :active="activeSlideIndex == index"
        @click="activeSlideIndex = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue'
import { onKeyDown, onKeyUp } from '@vueuse/core'
import _ from 'lodash'

const props = defineProps<{
  autoplay?: boolean
  autoplayDelay: number
}>()
const { autoplay, autoplayDelay } = toRefs(props)

const container = ref(null)
const { data: slides } = useMain((v) => v.banners)
const slidesCount = computed(() => slides.value?.length || 0)
const activeSlideIndex = ref(0)

const nextSlide = () => {
  activeSlideIndex.value = (activeSlideIndex.value + 1) % slidesCount.value
}
const prevSlide = () => {
  if (activeSlideIndex.value === 0) activeSlideIndex.value = slidesCount.value - 1
  else activeSlideIndex.value -= 1
}

const { resume, pause } = useIntervalFn(nextSlide, autoplayDelay, {
  immediate: false,
})
const userInteractsWithSlider = ref(false)
watch([userInteractsWithSlider], () => {
  if (userInteractsWithSlider.value) pause()
  else resume()
})

const isMouseInside = useMouseInside(container)
onKeyStroke(
  'ArrowRight',
  _.throttle(() => {
    if (isMouseInside.value) {
      nextSlide()
    }
  }, 300)
)
onKeyStroke(
  'ArrowLeft',
  _.throttle(() => {
    if (isMouseInside.value) {
      prevSlide()
    }
  }, 300)
)

onKeyDown(['ArrowLeft', 'ArrowRight'], () => (userInteractsWithSlider.value = true))
onKeyUp(['ArrowLeft', 'ArrowRight'], () => (userInteractsWithSlider.value = false))

const debouncedStoppedInteracting = _.debounce(() => (userInteractsWithSlider.value = false), 1000)
useSwipe(container, {
  onSwipeStart() {
    userInteractsWithSlider.value = true
  },
  onSwipeEnd(_, direction) {
    if (['right', 'left'].includes(direction)) {
      if (direction === 'right') prevSlide()
      if (direction === 'left') nextSlide()
      debouncedStoppedInteracting()
    }
  },
})

watch(
  [autoplay],
  () => {
    if (autoplay.value) resume()
  },
  { immediate: true }
)
</script>
