<template>
  <div class="relative">
    <input
      :id="inputID"
      v-model="value"
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
      @click.stop="toggleInputType"
    >
      <IconLock class="aspect-square h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  name: string
  label: string
  locked?: boolean
}>()

const inputID = uuidv4()

const { name, label, locked } = toRefs(props)

const { value, handleBlur, handleChange, errorMessage } = useField(name)
</script>
