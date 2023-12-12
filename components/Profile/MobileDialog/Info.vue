<template>
  <div class="flex h-full w-full flex-col items-stretch justify-end">
    <div
      class="h-full w-full bg-whitegray"
      @click.stop=""
    >
      <ProfileDesktopDialogInfo @go-back="emit('go-back')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])
</script>
