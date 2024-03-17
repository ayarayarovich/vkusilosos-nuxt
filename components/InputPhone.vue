<template>
  <div class="relative">
    <input
      :id="inputID"
      inputmode="tel"
      v-model="maskedValue"
      v-maska:[options]="bindedObject"
      class="peer w-full select-none rounded-xl border-2 border-transparent bg-white px-4 pb-3 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
      :class="{
        '!border-red': errorMessage,
        '!pr-14': locked,
      }"
      :disabled="locked"
      type="text"
      :name="name"
      placeholder="Введите"
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
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  label?: string
  name: string
  locked?: boolean
  textCenter?: boolean
}>()

const inputID = uuidv4()

const { label, name, locked } = toRefs(props)

// watch([unmasked], () => {
//   resetField({
//     value: unmasked.value || undefined,
//   })
// })

const maskedValue = ref('')
const bindedObject = reactive<any>({})

const options = reactive({
  mask: '+7 (###) ###-##-##',
  eager: false,
  tokensReplace: true,
})

watch([maskedValue], () => {
  if (maskedValue.value) {
    const phoneSanitazied = maskedValue.value.replace(/\D/g, '')
    value.value = phoneSanitazied
  }
})

const {
  errorMessage,
  value,
  meta: { initialValue },
} = useField<string | undefined>(name)

watch(
  [() => initialValue],
  () => {
    if (initialValue) {
      const phoneSanitazied = initialValue.replace(/\D/g, '')
      if (phoneSanitazied.length === 11) {
        maskedValue.value = phoneSanitazied.slice(1)
      } else {
        maskedValue.value = phoneSanitazied
      }
    }
  },
  {
    immediate: true,
  }
)
</script>
