<template>
  <div class="relative h-full w-full">
    <div
      class="absolute left-0 top-0 h-full w-1/2 opacity-50"
      @click="prevSlide()"
    ></div>
    <div
      class="absolute right-0 top-0 h-full w-1/2 opacity-50"
      @click="nextSlide()"
    ></div>

    <img
      class="h-full w-full object-cover"
      :src="slides[currentSlide].img"
      alt=""
    />

    <div class="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent"></div>

    <div class="absolute left-0 right-0 top-0 flex items-center gap-2 px-4 pt-4">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="relative h-1 grow overflow-hidden rounded-full bg-[rgba(255,255,255,0.5)]"
      >
        <div
          class="absolute left-0 top-0 h-full w-full rounded-full bg-white"
          :class="index < currentSlide ? 'translate-x-0' : '-translate-x-full'"
        ></div>
      </div>
      <button
        class="md:hidden"
        @click="emit('close')"
      >
        <IconCloseGray class="h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{
//   id: number;
// }>();

const emit = defineEmits(['reachedEnd', 'reachedStart', 'close'])

const currentSlide = ref(0)
const slides = ref([{ img: '/storis.png' }, { img: '/storis-2.png' }, { img: '/storis.png' }, { img: '/storis-2.png' }])

const prevSlide = () => {
  if (currentSlide.value === 0) {
    emit('reachedStart')
  } else {
    currentSlide.value -= 1
  }
}

const nextSlide = () => {
  if (currentSlide.value === slides.value.length - 1) {
    emit('reachedEnd')
  } else {
    currentSlide.value += 1
  }
}
</script>
