<template>
  <HeadlessTransitionRoot
    appear
    :show="profileDialogStore.isOpen"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="profileDialogStore.close()"
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
            <HeadlessDialogPanel class="absolute left-0 h-full w-full max-w-5xl bg-white shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="relative h-full w-full"
              >
                <HeadlessTabGroup vertical>
                  <div class="flex h-full w-full">
                    <HeadlessTabList class="flex flex-col shrink-0 items-stretch bg-gray">
                      <div class="mx-6 mb-4 mt-10 flex items-center gap-2">
                        <IconUserDark class="h-8" />
                        <span class="text-xl font-medium">{{ formatPhone(user?.phone || '') }}</span>
                      </div>
                      <div class="mx-4 mb-8 h-px bg-[#252321] opacity-10"></div>
                      <ProfileDesktopDialogTab>История заказов</ProfileDesktopDialogTab>
                      <ProfileDesktopDialogTab>Данные</ProfileDesktopDialogTab>
                      <ProfileDesktopDialogTab>Адреса</ProfileDesktopDialogTab>
                      <ProfileDesktopDialogTab>Бонусная система</ProfileDesktopDialogTab>
                      <div class="mx-4 mt-auto h-px bg-[#252321] opacity-10"></div>
                      <ProfileDesktopDialogExit />
                    </HeadlessTabList>
                    <HeadlessTabPanels class="grow bg-whitegray">
                      <HeadlessTabPanel class="h-full">
                        <ProfileDesktopDialogOrdersHistory />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDesktopDialogInfo />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDesktopDialogAddresses />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDesktopDialogBonuses />
                      </HeadlessTabPanel>
                    </HeadlessTabPanels>
                  </div>
                </HeadlessTabGroup>
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
import { useProfileDialogStore } from '~/store/profileDialog'
import { formatPhone } from '~/utils'

const profileDialogStore = useProfileDialogStore()

const { data: user } = useUser((v) => v)

const dialogPanelEl = ref()

type AuthDialogViewType = 'auth' | 'recovery'
const view = ref<AuthDialogViewType>('auth')
const changeView = (newView: AuthDialogViewType) => {
  view.value = newView
}

provide('view', {
  view,
  changeView,
})

useSwipe(dialogPanelEl, {
  onSwipeEnd(_, direction) {
    if (direction === 'left') {
      profileDialogStore.close()
    }
  },
})
</script>
