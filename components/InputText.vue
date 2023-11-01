<template>
  <div class="group relative">
    <label
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
      :type="_type"
      :disabled="locked"
      class="w-full rounded-xl border-2 border-transparent bg-white py-8 pb-4 pl-4 leading-none text-black shadow-main outline-none transition-all focus:border-orange-200"
      :class="{
        '!border-red': props.errorMessage,
        'pr-16': props.type === 'password' || !!locked,
        'pr-4': props.type === 'text',
      }"
      :value="modelValue"
      @input="onInput($event as InputEvent)"
    />
    <IconLock
      v-if="!!locked"
      class="absolute right-4 top-1/2 h-6 -translate-y-1/2"
    />
    <button
      v-else-if="props.type === 'password'"
      class="absolute right-4 top-1/2 -translate-y-1/2"
      @click.prevent="toggleInputType"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <IconEye
          v-if="_type === 'text'"
          class="aspect-square h-6"
        />
        <IconEyeClosed
          v-else-if="_type === 'password'"
          class="aspect-square h-6"
        />
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label: string
  name: string
  locked?: boolean
  errorMessage?: string
  type: 'text' | 'password' | 'number'
}>()

const _type = ref(props.type)
const toggleInputType = () => {
  if (_type.value === 'text') _type.value = 'password'
  else if (_type.value === 'password') _type.value = 'text'
}

const emit = defineEmits(['update:modelValue', 'onInput', 'onKeyDown'])

const onInput = (e: InputEvent) => {
  emit('update:modelValue', (e as any).target.value)
}
</script>
