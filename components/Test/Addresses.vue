<template>
  <div class="h-full w-full flex flex-col items-stretch justify-end">
    <div
      class="h-full w-full bg-whitegray"
      @click.stop=""
    >
      <ProfileDialogAddresses @go-back="emit('go-back')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])
</script>
