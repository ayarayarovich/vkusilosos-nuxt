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
              v-if="myCurrentView === 'menu'"
              @change-view="myCurrentView = $event"
            />
            <ProfileMobileDialogInfo
              v-else-if="myCurrentView === 'info'"
              @go-back="myCurrentView = 'menu'"
            />
            <ProfileMobileDialogAddresses
              v-else-if="myCurrentView === 'addresses'"
              @go-back="myCurrentView = 'menu'"
            />
            <ProfileMobileDialogBonuses
              v-else-if="myCurrentView === 'bonus_system'"
              @go-back="myCurrentView = 'menu'"
            />
            <ProfileMobileDialogOrdersHistory
              v-else-if="myCurrentView === 'orders_history'"
              @go-back="myCurrentView = 'menu'"
            />
            <ProfileMobileDialogNotifications
              v-else-if="myCurrentView === 'notifications'"
              @go-back="myCurrentView = 'menu'"
            />
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileDialogStore, type ProfileDialogView } from '~/store/profileDialog'

const profileDialogStore = useProfileDialogStore()
const { currentView, openCallCount } = storeToRefs(profileDialogStore)

const myCurrentView = ref<ProfileDialogView | 'menu'>('menu')
watch(
  [currentView, openCallCount],
  () => {
    myCurrentView.value = currentView.value
  }
)

const closeDialog = () => {
  profileDialogStore.close()
  myCurrentView.value = 'menu'
}
</script>
