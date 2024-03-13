<template>
  <div></div>
</template>

<script setup lang="ts">
navigateTo(
  {
    path: '/',
    query: {
      privacy_policy: 'show',
    },
  },
  {
    redirectCode: 301,
  }
)
</script>
