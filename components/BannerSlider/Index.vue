<template>
  <div
    ref="container"
    class="sm relative isolate aspect-[30/9] overflow-hidden rounded-3xl shadow-lg"
  >
    <!-- eslint-disable vue/require-toggle-inside-transition -->
    <Transition
      name="fade"
      mode="in-out"
    >
      <div
        :key="activeSlideIndex"
        :class="`
                    absolute inset-0 flex items-center justify-center text-4xl transition-opacity
                `"
      >
        <div
          class="block h-full w-full"
          :to="slides[activeSlideIndex].link"
        >
          <img
            class="h-full w-full object-cover"
            :src="slides[activeSlideIndex].imgSrc"
            alt=""
          />
        </div>
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
const slides = ref([
  {
    imgSrc: '/banner-1.png',
    link: '/promo/banner1',
  },
  {
    imgSrc: '/banner-2.png',
    link: '/promo/banner2',
  },
])
const slidesCount = computed(() => slides.value.length)
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

<!-- <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 13C10.0898 13 13 10.0898 13 6.5C13 2.91016 10.0898 0 6.5 0C2.91016 0 0 2.91016 0 6.5C0 10.0898 2.91016 13 6.5 13ZM6.5 11C8.98535 11 11 8.98535 11 6.5C11 4.01465 8.98535 2 6.5 2C4.01465 2 2 4.01465 2 6.5C2 8.98535 4.01465 11 6.5 11Z" fill="#D9D9D9"/>
</svg> -->
