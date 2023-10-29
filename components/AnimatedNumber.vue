<template>
  <span>{{ displayNumber }}</span>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  number: number
}>()
const { number } = toRefs(props)

const tweenedNumber = ref(number.value)
const displayNumber = computed(() => tweenedNumber.value.toFixed(0))

watch([number], () => {
  gsap.to(tweenedNumber, { value: number.value })
})
</script>
