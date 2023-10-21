<template>
  <HeadlessTransitionRoot appear :show="show" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="emit('close')">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <MouseFollower :top="top" :bottom="bottom" :right="width" :left="0" />

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
            <HeadlessDialogPanel
              class="absolute bg-white left-0 h-full w-full max-w-4xl shadow-xl transition-all"
            >
              <div ref="dialogPanelEl" class="h-full w-full relative">
                <HeadlessTabGroup vertical>
                  <div class="flex h-full w-full">
                    <HeadlessTabList
                      class="flex flex-col items-stretch bg-gray"
                    >
                      <div class="flex items-center mt-10 mb-4 mx-6 gap-2">
                        <IconUserDark class="h-8" />
                        <span class="font-medium text-xl"
                          >+7 (864) 974 - 83 - 44</span
                        >
                      </div>
                      <div class="h-px bg-[#252321] opacity-10 mx-4 mb-8"></div>
                      <ProfileDialogTab>История заказов</ProfileDialogTab>
                      <ProfileDialogTab>Данные</ProfileDialogTab>
                      <ProfileDialogTab>Адреса</ProfileDialogTab>
                      <ProfileDialogTab>Бонусная система</ProfileDialogTab>
                      <div
                        class="h-px bg-[#252321] opacity-10 mx-4 mt-auto"
                      ></div>
                      <button
                        class="my-4 py-4 px-6 text-start transition-colors hover:bg-white"
                      >
                        Выйти <IconExit class="h-6 inline-block" />
                      </button>
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
import { ref, toRefs } from "vue";

const props = defineProps<{
  show?: boolean;
}>();
const { show } = toRefs(props);
const emit = defineEmits(["close"]);

const dialogPanelEl = ref();
const { top, bottom, width } = useElementBounding(dialogPanelEl, {
  immediate: true,
  windowScroll: false,
});

type AuthDialogViewType = "auth" | "recovery";
const view = ref<AuthDialogViewType>("auth");
const changeView = (newView: AuthDialogViewType) => {
  view.value = newView;
};

provide("view", {
  view,
  changeView,
});

useSwipe(dialogPanelEl, {
  onSwipeEnd(_, direction) {
    if (direction === "left") {
      emit("close");
    }
  },
});
</script>
