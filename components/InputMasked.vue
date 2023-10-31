<template>
  <div class="group relative">
    <label
      v-if="label"
      class="absolute pointer-events-none top-1/2 group-focus-within:left-4 group-focus-within:-translate-y-6 group-focus-within:text-sm group-focus-within:font-light transition-all max-w-full leading-none break-words text-[#777675]"
      :class="{
        'left-4 -translate-y-1/2 font-base text-base': props.modelValue.length === 0,
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
      class="w-full outline-none focus:border-orange-200 transition-all bg-white border-2 border-transparent rounded-xl pl-4 pb-4 leading-none text-black shadow-main"
      :class="{
        '!border-red': props.errorMessage,
        'pr-16': locked,
        'pr-4': !locked,
        'py-8': label,
        'py-4': !label,
        'text-center': props.textCenter
      }"
    />
    <IconLock
      v-if="locked"
      class="absolute top-1/2 -translate-y-1/2 right-4 h-6"
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
