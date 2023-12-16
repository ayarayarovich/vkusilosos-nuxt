<template>
  <button
    class="text-orange-200"
    @click="isModalOpen = true"
  >
    Посмотреть
  </button>
  <ProfileDesktopDialogOrdersHistoryReceiptDialog
    :show="isModalOpen"
    :order="props.order"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Order } from '~/interfaces/users'

const props = defineProps<{
  order: Order
}>()

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)
</script>
