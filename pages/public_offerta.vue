<template>
  <div></div>
</template>

<script setup lang="ts">
navigateTo(
  {
    path: '/',
    query: {
      public_offerta: 'show',
    },
  },
  {
    redirectCode: 301,
  }
)
</script>
