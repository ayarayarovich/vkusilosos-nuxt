<template>
  <HeadlessSwitch
    v-model="model"
    :class="model ? 'bg-orange-200' : 'bg-gray'"
    class="focus:ring-indigo-500 relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
  >
    <span
      :class="model ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
    />
  </HeadlessSwitch>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>
