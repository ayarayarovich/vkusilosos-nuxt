<template>
  <IconVisa v-if="type === 'visa'" />
  <IconMasterCard v-else-if="type === 'mastercard'" />
  <IconMaestro v-else-if="type === 'maestro'" />
  <IconMir v-else-if="type === 'mir'" />
  <IconCard v-else />
</template>

<script setup lang="ts">
import creditCardType from 'credit-card-type'

const props = defineProps<{
  cardNumber: string
}>()

const type = computed(() => {
  const types = creditCardType(props.cardNumber.slice(0, 4))
  if (types.length > 0) {
    return types[0].type
  }
})
</script>
