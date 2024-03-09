<template>
  <div class="group flex gap-4 border-b-2 border-black/40 transition-colors focus-within:border-orange-200">
    <input
      v-model="promocode"
      class="peer w-full bg-transparent py-1 font-normal outline-none"
      :disabled="isDisabled"
      :placeholder="placeholder"
    />
    <button
      class="hidden text-orange-200 group-focus-within:block"
      :class="{
        '!block': value,
      }"
      type="button"
      @click="action()"
    >
      <span v-if="value"> Отменить </span>
      <span v-else>Применить</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  placeholder?: string
}>()

const promocode = ref('')

const isDisabled = ref(false)

const { value, setValue } = useField<string>(() => props.name)

watch(
  [value],
  () => {
    if (value.value !== promocode.value) {
      promocode.value = value.value
    }
  },
  {
    immediate: true,
  }
)

const applyPromocode = () => {
  if (promocode.value) {
    isDisabled.value = true
    setValue(promocode.value)
  }
}

const cancelPromocode = () => {
  setValue('')
  isDisabled.value = false
}

const action = () => {
  if (!value.value) {
    applyPromocode()
  } else {
    cancelPromocode()
  }
}
</script>
