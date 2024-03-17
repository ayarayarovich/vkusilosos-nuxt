<template>
  <button
    class="text-start outline-none transition-colors hover:bg-white focus-visible:bg-white"
    @click="isModalOpen = true"
  >
    Удалить аккаунт
    <!-- teleported out of button, so its fine -->
    <ConfirmDialog
      :show="isModalOpen"
      message="Вы уверены, что хотите удалить аккаунт?"
      @close="closeModal"
      @confirmed="deleteAccount"
      @rejected="closeModal"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProfileDialogStore } from '~/store/profileDialog'

const isModalOpen = ref(false)

const closeModal = () => (isModalOpen.value = false)

const profileDialogStore = useProfileDialogStore()
const userDeleteAccount = useDeleteAccount()

const deleteAccount = () => {
  profileDialogStore.close()
  userDeleteAccount()
}
</script>
