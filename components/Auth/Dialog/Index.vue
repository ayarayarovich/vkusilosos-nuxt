import { AuthDialogAuthView } from '#build/components';
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
              class="absolute bg-white left-0 h-full w-full max-w-md shadow-xl transition-all"
            >
              <div ref="dialogPanelEl" class="h-full w-full relative">
                <Transition name="fade" mode="out-in">
                  <AuthDialogAuthView v-if="view === 'auth'" />
                  <AuthDialogPasswordRecoveryView
                    v-else-if="view === 'recovery'"
                  />
                </Transition>

                <div
                  class="absolute top-2 text-black opacity-50 text-center text-sm w-full md:hidden"
                >
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
