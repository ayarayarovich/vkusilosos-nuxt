<template>
  <button
    class="flex items-center gap-1 rounded-xl p-2 text-sm font-light"
    @click="isOpen = true"
  >
    <IconCart class="inline h-8" /> <AnimatedNumber :number="displayCost" />
    <span class="font-medium">&#8381;</span>
  </button>
  <OrderCartDialog
    :show="isOpen"
    @close="closeDialog"
  />
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useCartStore } from '~/store/cart'

const cartStore = toRefs(useCartStore())
const displayCost = cartStore.totalCost

const isOpen = ref(false)
function closeDialog() {
  isOpen.value = false
}
</script>
