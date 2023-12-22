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
                <HeadlessTabGroup
                  vertical
                  :selected-index="activeTabIndex"
                  @change="activeTabIndex = $event"
                >
                  <div class="flex h-full w-full">
                    <HeadlessTabList class="flex shrink-0 flex-col items-stretch bg-gray">
                      <div class="mx-6 mb-4 mt-10 flex items-center gap-2">
                        <IconUserDark class="h-8" />
                        <span class="text-xl font-medium">{{ formatPhone(user?.phone || '') }}</span>
                      </div>
                      <div class="mx-4 mb-8 h-px bg-[#252321] opacity-10"></div>
                      <ProfileDesktopDialogTab
                        v-for="tab in tabs"
                        :key="tab.name"
                      >
                        {{ tab.label }}
                      </ProfileDesktopDialogTab>
                      <div class="mx-4 mt-auto h-px bg-[#252321] opacity-10"></div>
                      <ProfileDesktopDialogExit />
                    </HeadlessTabList>
                    <HeadlessTabPanels class="grow bg-whitegray">
                      <HeadlessTabPanel
                        v-for="tab in tabs"
                        :key="tab.name"
                        class="h-full"
                      >
                        <component :is="tab.component" />
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
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import ProfileDesktopDialogAddresses from './Addresses.vue'
import ProfileDesktopDialogBonuses from './Bonuses.vue'
import ProfileDesktopDialogInfo from './Info.vue'
import ProfileDesktopDialogNotifications from './Notifications.vue'
import ProfileDesktopDialogOrdersHistory from './OrdersHistory/Index.vue'

import { useProfileDialogStore, type ProfileDialogView } from '~/store/profileDialog'
import { formatPhone } from '~/utils'

const profileDialogStore = useProfileDialogStore()
const { currentView, openCallCount } = storeToRefs(profileDialogStore)

const tabs = shallowRef<
  {
    name: ProfileDialogView
    label: string
    component: Component
  }[]
>([
  {
    name: 'orders_history',
    label: 'История заказов',
    component: ProfileDesktopDialogOrdersHistory,
  },
  {
    name: 'info',
    label: 'Данные',
    component: ProfileDesktopDialogInfo,
  },
  {
    name: 'addresses',
    label: 'Адреса',
    component: ProfileDesktopDialogAddresses,
  },
  {
    name: 'bonus_system',
    label: 'Бонусная система',
    component: ProfileDesktopDialogBonuses,
  },
  {
    name: 'notifications',
    label: 'Уведомления',
    component: ProfileDesktopDialogNotifications,
  },
])

const activeTabIndex = shallowRef(0)
watch(
  [currentView, openCallCount],
  () => {
    const index = tabs.value.findIndex((v) => v.name === currentView.value)
    if (index !== -1) {
      activeTabIndex.value = index
    }
  },
  { immediate: true }
)

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
