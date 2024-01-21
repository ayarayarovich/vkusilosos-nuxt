<template>
  <InputSwitchRaw v-model="value" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { value } = useField<boolean>(() => props.name)
</script>
