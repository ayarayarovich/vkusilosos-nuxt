<template>
  <SimpleButton class="px-8 py-4 w-full" @click="isModalOpen = true">
    Добавить адресс
  </SimpleButton>

  <ProfileDialogAddressesAddAddressDialog
    :show="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const isModalOpen = ref(false);

const closeModal = () => (isModalOpen.value = false);
</script>
