<template>
  <div></div>
</template>

<script setup lang="ts">
navigateTo(
  {
    path: '/',
    query: {
      user_agreement: 'show',
    },
  },
  {
    redirectCode: 301,
  }
)
</script>
