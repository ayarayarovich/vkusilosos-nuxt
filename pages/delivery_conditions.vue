<template>
  <DeliveryConditions
    :show="show"
    @close="close"
  />
</template>

<script setup lang="ts">
const show = ref(true)

const close = (closed: Promise<void>) => {
  show.value = false
  closed.then(() => {
    navigateTo('/')
  })
}

onMounted(() => {
  show.value = true
})

onBeforeUnmount(() => {
  show.value = false
})
</script>
