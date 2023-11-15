<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="emit('close')"
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

      <div class="fixed inset-0 overflow-y-auto overflow-x-hidden">
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
                    <HeadlessTabList class="flex flex-col items-stretch bg-gray">
                      <div class="mx-6 mb-4 mt-10 flex items-center gap-2">
                        <IconUserDark class="h-8" />
                        <span class="text-xl font-medium">+7 (864) 974 - 83 - 44</span>
                      </div>
                      <div class="mx-4 mb-8 h-px bg-[#252321] opacity-10"></div>
                      <ProfileDialogTab>История заказов</ProfileDialogTab>
                      <ProfileDialogTab>Данные</ProfileDialogTab>
                      <ProfileDialogTab>Адреса</ProfileDialogTab>
                      <ProfileDialogTab>Бонусная система</ProfileDialogTab>
                      <div class="mx-4 mt-auto h-px bg-[#252321] opacity-10"></div>
                      <ProfileDialogExit />
                    </HeadlessTabList>
                    <HeadlessTabPanels class="grow bg-whitegray">
                      <HeadlessTabPanel class="h-full">
                        <ProfileDialogOrdersHistory />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDialogInfo />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDialogAddresses />
                      </HeadlessTabPanel>
                      <HeadlessTabPanel class="h-full">
                        <ProfileDialogBonuses />
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
import { ref, toRefs } from 'vue'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref()
const { top, bottom, width } = useElementBounding(dialogPanelEl, {
  immediate: true,
  windowScroll: false,
})

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
      emit('close')
    }
  },
})
</script>
