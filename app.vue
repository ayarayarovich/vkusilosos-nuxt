<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'vue-toastification/dist/index.css'

useHead({
  title: 'ВкусиЛосось',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }],
})
</script>
