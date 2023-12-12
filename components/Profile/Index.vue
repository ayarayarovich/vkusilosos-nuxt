<template>
  <ProfileDesktopDialog v-if="isLargeScreen" />
  <ProfileMobileDialog v-else-if="!isLargeScreen" />
</template>

<script setup lang="ts">
const isLargeScreen = useTailwindBreakpoint('lg')
</script>
