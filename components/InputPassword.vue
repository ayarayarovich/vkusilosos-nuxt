<template>
  <div class="relative">
    <input
      :id="inputID"
      v-model="value"
      class="peer w-full rounded-xl border-2 border-transparent bg-white pb-3 pl-4 pr-14 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
      :class="{
        '!border-red': errorMessage,
      }"
      :type="inputType"
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
      class="absolute right-4 top-1/2 -translate-y-1/2"
      type="button"
      @click.stop="toggleInputType"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <IconEye
          v-if="inputType === 'text'"
          class="aspect-square h-6"
        />
        <IconEyeClosed
          v-else-if="inputType === 'password'"
          class="aspect-square h-6"
        />
      </Transition>
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
const inputType = ref<'text' | 'password'>('password')

const { name, label } = toRefs(props)

const { value, handleBlur, handleChange, errorMessage } = useField(name)

const toggleInputType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
</script>
