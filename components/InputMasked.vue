<template>
  <div class="relative">
    <input
      :id="inputID"
      ref="el"
      class="peer w-full select-none rounded-xl border-2 border-transparent bg-white px-4 pb-3 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
      :class="{
        '!border-red': errorMessage,
        '!pr-14': locked,
      }"
      :disabled="locked"
      type="text"
      :name="name"
      placeholder="Введите"
      @change="handleChange"
      @blur="handleBlur"
    />
    <label
      :for="inputID"
      class="pointer-events-none absolute left-4 top-3 select-none text-xs text-[#777675] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs"
      :class="{
        'text-red': errorMessage,
      }"
    >
      {{ errorMessage || label }}
    </label>

    <button
      v-if="locked"
      class="absolute right-4 top-1/2 -translate-y-1/2"
      type="button"
      disabled
    >
      <IconLock class="aspect-square h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useIMask } from 'vue-imask'

const props = defineProps<{
  label?: string
  name: string
  locked?: boolean
  mask: any
  textCenter?: boolean
}>()

const { label, name, locked } = toRefs(props)

const { el, unmasked } = useIMask({
  mask: props.mask,
  lazy: false,
  normalizeZeros: true,
})

watch([unmasked], () => {
  setValue(unmasked.value || undefined)
})

const { setValue, errorMessage, value } = useField<string | undefined>(name)

watch([value], () => {
  unmasked.value = value.value || ''
})
</script>
