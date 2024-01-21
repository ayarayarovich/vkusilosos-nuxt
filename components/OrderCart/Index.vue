<template>
  <button
    class="flex items-center gap-1 rounded-xl p-2 text-sm font-light"
    @click="isOpen = true"
  >
    <IconCart class="inline h-8" /> <AnimatedNumber :number="data || 0" />
    <span class="font-medium">&#8381;</span>
  </button>
  <OrderCartDialog
    :show="isOpen"
    @close="closeDialog"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { data } = useBasket((v) => v.total_price)

const isOpen = ref(false)
function closeDialog() {
  isOpen.value = false
}
</script>
