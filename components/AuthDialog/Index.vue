<template>
  <HeadlessTransitionRoot
    appear
    :show="authDialogStore.isOpen"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="authDialogStore.close()"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25">
          <MouseFollower :hide-when-over-el="dialogPanelEl" />
        </div>
      </HeadlessTransitionChild>

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto overflow-x-hidden">
        <div class="min-h-full">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 -translate-x-full"
            enter-to="opacity-100 translate-x-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-x-0"
            leave-to="opacity-0 -translate-x-full"
          >
            <HeadlessDialogPanel
              class="absolute left-0 flex min-h-full w-full max-w-md items-stretch bg-white shadow-xl transition-all"
            >
              <div
                ref="dialogPanelEl"
                class="w-full"
              >
                <Transition
                  name="fade"
                  mode="out-in"
                >
                  <AuthDialogAuthPhone
                    v-if="view === 'auth'"
                    @next-stage="nextStage"
                  />
                  <AuthDialogConfirmView
                    v-else-if="view === 'confirm'"
                    :phone="phoneNumber"
                    @edit-phone="view = 'auth'"
                  />
                </Transition>

                <div class="absolute top-2 w-full text-center text-sm text-black opacity-50 md:hidden">
                  Свайпай влево, чтобы закрыть
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthDialogStore } from '~/store/authDialog'

const authDialogStore = useAuthDialogStore()

const dialogPanelEl = ref()

type AuthDialogViewType = 'auth' | 'confirm'
const view = ref<AuthDialogViewType>('auth')

const phoneNumber = ref('')
const nextStage = (phone: string) => {
  phoneNumber.value = phone
  view.value = 'confirm'
}

useSwipe(dialogPanelEl, {
  onSwipeEnd(_, direction) {
    if (direction === 'left') {
      authDialogStore.close()
    }
  },
})
</script>
