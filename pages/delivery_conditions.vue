<template>
  <div></div>
</template>

<script setup lang="ts">
navigateTo(
  {
    path: '/',
    query: {
      delivery_conditions: 'show',
    },
  },
  {
    redirectCode: 301,
  }
)
</script>
