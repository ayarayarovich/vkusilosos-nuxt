<template>
  <CheckboxRoot
    v-model:checked="value"
    class="flex h-6 w-6 appearance-none items-center justify-center border-2 border-black focus-within:border-orange-200 transition-colors rounded-md outline-none"
  >
    <Transition
      mode="out-in"
      name="fade"
      :duration="100"
    >
      <CheckboxIndicator class="appearance-none">
        <IconCheckMark class="h-3.5 w-3.5 text-orange-200" />
      </CheckboxIndicator>
    </Transition>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'

const props = defineProps<{
  name: string
}>()

const { value } = useField<boolean>(() => props.name)
</script>
