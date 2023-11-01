<template>
  <div class="group relative">
    <label
      v-if="label"
      class="pointer-events-none absolute top-1/2 max-w-full break-words leading-none text-[#777675] transition-all group-focus-within:left-4 group-focus-within:-translate-y-6 group-focus-within:text-sm group-focus-within:font-light"
      :class="{
        'font-base left-4 -translate-y-1/2 text-base': props.modelValue.length === 0,
        'left-4 -translate-y-6 text-sm font-light': props.modelValue.length > 0,
      }"
    >
      <Transition
        name="fade"
        mode="out-in"
        :duration="100"
      >
        <span
          v-if="errorMessage"
          class="text-red"
        >
          {{ props.errorMessage }}
        </span>
        <span v-else> {{ props.label }} </span>
      </Transition>
    </label>
    <input
      ref="el"
      type="text"
      :disabled="locked"
      class="w-full rounded-xl border-2 border-transparent bg-white pb-4 pl-4 leading-none text-black shadow-main outline-none transition-all focus:border-orange-200"
      :class="{
        '!border-red': props.errorMessage,
        'pr-16': locked,
        'pr-4': !locked,
        'py-8': label,
        'py-4': !label,
        'text-center': props.textCenter,
      }"
    />
    <IconLock
      v-if="locked"
      class="absolute right-4 top-1/2 h-6 -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { useIMask } from 'vue-imask'

const props = defineProps<{
  modelValue: string
  label?: string
  name: string
  locked?: boolean
  mask: any
  errorMessage?: string
  textCenter?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const { el, unmasked } = useIMask({
  mask: props.mask,
  lazy: false,
})

watch([unmasked], () => {
  emit('update', unmasked.value)
})
</script>
