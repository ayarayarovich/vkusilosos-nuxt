<template>
  <div class="h-full w-full flex flex-col items-stretch justify-between">
    <div class="grow flex flex-col items-stretch justify-between pb-6">
      <div>
        <p class="mb-4">Повторная отправка возможна через {{ secondsLeft }} секунд</p>
        <div class="flex items-stretch gap-2 lg:gap-4">
          <input
            v-for="(_, index) in 6"
            :key="index"
            type="text"
            :ref="setItemRef"
            v-imask="{
              mask: '0',
              lazy: false,
              placeholderChar: '_',
            }"
            class="w-full shadow-main p-4 text-center rounded-xl border-2 border-transparent focus:border-orange-200 transition-colors text-sm outline-none"
            @keydown="onKeyDown($event, index)"
            @complete="onComplete(index)"
          />
        </div>
      </div>

      <button
        class="py-4 px-4 mb-2 w-full uppercase font-bold rounded-xl text-sm transition-colors"
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

let itemRefs: HTMLElement[] = []
const setItemRef = (el: any) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})

const onKeyDown = (e: any, index: number) => {
  const value = e.target.value
  if (e.key === 'Backspace' && value === '_' && index > 0) {
    itemRefs[index - 1].focus()
  }
}

const onComplete = (index: number) => {
  if (index + 1 < itemRefs.length) {
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
