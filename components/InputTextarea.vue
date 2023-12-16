<template>
  <div class="relative">
    <textarea
      :id="inputID"
      v-model="value"
      :rows="rows"
      class="peer w-full min-h-[6rem] select-none rounded-xl border-2 border-transparent bg-white px-4 pb-3 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
      :class="{
        '!border-red': errorMessage,
      }"
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
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  name: string
  label: string
  rows: number
}>()

const inputID = uuidv4()

const { name, label, rows } = toRefs(props)

const { value, handleBlur, handleChange, errorMessage } = useField<string>(name)
</script>
