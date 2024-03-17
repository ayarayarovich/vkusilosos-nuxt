<template>
  <button
    class="text-start outline-none transition-colors hover:bg-white focus-visible:bg-white"
    @click="isModalOpen = true"
  >
    Выйти <IconExit class="inline-block h-6" />
    <!-- teleported out of button, so its fine -->
    <ConfirmDialog
      :show="isModalOpen"
      message="Вы уверены, что хотите выйти?"
      @close="closeModal"
      @confirmed="signOut"
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
const userSignOut = useSignOut()

const signOut = () => {
  profileDialogStore.close()
  userSignOut()
}
</script>
