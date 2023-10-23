<template>
  <div class="relative w-full h-full">
    <div
      class="absolute w-1/2 h-full top-0 left-0 opacity-50"
      @click="prevSlide()"
    ></div>
    <div
      class="absolute w-1/2 h-full top-0 right-0 opacity-50"
      @click="nextSlide()"
    ></div>

    <img
      class="w-full h-full object-cover"
      :src="slides[currentSlide].img"
      alt=""
    />

    <div
      class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent"
    ></div>

    <div
      class="absolute top-0 left-0 right-0 flex items-center pt-4 px-4 gap-2"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="h-1 rounded-full relative overflow-hidden bg-[rgba(255,255,255,0.5)] grow"
      >
        <div
          class="absolute top-0 left-0 h-full w-full bg-white rounded-full"
          :class="index < currentSlide ? 'translate-x-0' : '-translate-x-full'"
        ></div>
      </div>
      <button class="md:hidden" @click="emit('close')">
        <IconCloseGray class="h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{
//   id: number;
// }>();

const emit = defineEmits(["reachedEnd", "reachedStart", "close"]);

const currentSlide = ref(0);
const slides = ref([
  { img: "/storis.png" },
  { img: "/storis-2.png" },
  { img: "/storis.png" },
  { img: "/storis-2.png" },
]);

const prevSlide = () => {
  if (currentSlide.value === 0) {
    emit("reachedStart");
  } else {
    currentSlide.value -= 1;
  }
};

const nextSlide = () => {
  if (currentSlide.value === slides.value.length - 1) {
    emit("reachedEnd");
  } else {
    currentSlide.value += 1;
  }
};
</script>
