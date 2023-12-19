<template>
  <HeadlessTransitionRoot
    appear
    :show="profileDialogStore.isOpen"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="closeDialog()"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-500 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-300 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <HeadlessDialogBackdrop class="fixed inset-0 z-40 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-x-hidden overflow-y-hidden">
        <HeadlessTransitionChild
          as="template"
          enter="duration-500 ease-out"
          enter-from="opacity-0 translate-y-full"
          enter-to="opacity-100 translate-y-0"
          leave="duration-300 ease-in"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 translate-y-full"
        >
          <HeadlessDialogPanel
            class="absolute bottom-0 h-full w-full shadow-xl transition-all"
            @click="profileDialogStore.close()"
          >
            <ProfileMobileDialogMenu
              v-if="currentView === 'menu'"
              @change-view="currentView = $event"
            />
            <ProfileMobileDialogInfo
              v-else-if="currentView === 'info'"
              @go-back="currentView = 'menu'"
            />
            <ProfileMobileDialogAddresses
              v-else-if="currentView === 'addresses'"
              @go-back="currentView = 'menu'"
            />
            <ProfileMobileDialogBonuses
              v-else-if="currentView === 'bonus'"
              @go-back="currentView = 'menu'"
            />
            <ProfileMobileDialogOrdersHistory
              v-else-if="currentView === 'orders-history'"
              @go-back="currentView = 'menu'"
            />
            <ProfileMobileDialogNotifications
              v-else-if="currentView === 'notifications'"
              @go-back="currentView = 'menu'"
            />
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProfileDialogStore } from '~/store/profileDialog'

const profileDialogStore = useProfileDialogStore()

const currentView = ref<'menu' | 'info' | 'orders-history' | 'addresses' | 'bonus'>('menu')

const closeDialog = () => {
  profileDialogStore.close()
  currentView.value = 'menu'
}
</script>
