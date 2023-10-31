<template>
  <div class="group relative">
    <label
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
      :type="_type"
      :disabled="locked"
      class="w-full outline-none focus:border-orange-200 transition-all bg-white border-2 border-transparent rounded-xl pl-4 py-8 pb-4 leading-none text-black shadow-main"
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
      class="absolute top-1/2 -translate-y-1/2 right-4 h-6"
    />
    <button
      v-else-if="props.type === 'password'"
      class="absolute top-1/2 -translate-y-1/2 right-4"
      @click.prevent="toggleInputType"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <IconEye
          v-if="_type === 'text'"
          class="h-6 aspect-square"
        />
        <IconEyeClosed
          v-else-if="_type === 'password'"
          class="h-6 aspect-square"
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
