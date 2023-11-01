<template>
  <div class="flex h-full w-full flex-col items-stretch justify-between">
    <div class="flex grow flex-col items-stretch justify-between pb-6">
      <div>
        <p class="mb-4">Повторная отправка возможна через {{ secondsLeft }} секунд</p>
        <div class="flex items-stretch gap-2 lg:gap-4">
          <input
            v-for="(_, index) in 6"
            :key="index"
            :ref="setItemRef"
            v-imask="{
              mask: '0',
              lazy: false,
              placeholderChar: '_',
            }"
            :disabled="index !== currentIndex"
            type="text"
            class="w-full rounded-xl border-2 border-transparent p-4 text-center text-sm shadow-main outline-none transition-colors focus:border-orange-200"
            :class="{
              'bg-gray': index !== currentIndex,
            }"
            @keydown="onKeyDown($event, index)"
            @complete="onComplete(index)"
          />
        </div>
      </div>

      <button
        class="mb-2 w-full rounded-xl px-4 py-4 text-sm font-bold uppercase transition-colors"
        :class="secondsLeft > 0 ? 'bg-gray text-[rgba(0,0,0,0.5)]' : 'accent-gradient-bg text-white'"
        @click="emit('proceed')"
      >
        {{ secondsLeft > 0 ? 'Повторно отправить можно через ' + minutesLeft : 'Отправить' }}
      </button>
    </div>

    <div class="text-xs">
      <div class="h-px bg-gray"></div>
      <div class="py-8 text-center">
        <button class="text-orange-200">Пропустить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskDirective } from 'vue-imask'

const vImask = IMaskDirective

let itemRefs: HTMLInputElement[] = []
const setItemRef = (el: any) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})

const currentIndex = ref(0)

const onKeyDown = (e: any, index: number) => {
  const value = e.target.value
  if (e.key === 'Backspace' && value === '_' && index > 0) {
    currentIndex.value = index - 1
    itemRefs[index - 1].disabled = false
    itemRefs[index - 1].focus()
  }
}

const onComplete = (index: number) => {
  if (index + 1 < itemRefs.length) {
    currentIndex.value = index + 1
    itemRefs[index + 1].disabled = false
    itemRefs[index + 1].focus()
  }
}

const timeout = 120
const secondsLeft = ref(timeout)
const minutesLeft = computed(() => {
  return `${Math.floor(secondsLeft.value / 60)}:${secondsLeft.value % 60}`
})

const { pause } = useIntervalFn(
  () => {
    secondsLeft.value = Math.max(0, secondsLeft.value - 1)
  },
  1000,
  {
    immediate: true,
  }
)

watch([secondsLeft], () => {
  if (secondsLeft.value === 0) pause()
})
</script>
