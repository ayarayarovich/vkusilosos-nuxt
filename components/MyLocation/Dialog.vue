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

      <MouseFollower :top="top" :bottom="bottom" :right="right" :left="left" />

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-md rounded-2xl shadow-xl transition-all"
            >
              <div
                ref="dialogPanelEl"
                class="flex w-full transform flex-col items-start overflow-hidden rounded-2xl bg-white p-6"
              >
                <HeadlessDialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-black"
                >
                  Укажите адрес
                </HeadlessDialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-black">Типо указали адрес ...</p>
                </div>

                <div class="mt-4 self-end">
                  <button
                    type="button"
                    class="border-transparent flex justify-center rounded-md border bg-gradient-to-t from-orange-200 to-orange-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:to-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-2"
                    @click="selectAddress"
                  >
                    Готово
                  </button>
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
import { useLocationStore } from "~/store/location";

const props = defineProps<{
  show?: boolean;
}>();
const { show } = toRefs(props);
const emit = defineEmits(["close"]);

const locationStore = useLocationStore();
const dialogPanelEl = ref<HTMLElement>();

const { top, bottom, right, left } = useElementBounding(dialogPanelEl);

const selectAddress = () => {
  locationStore.determineUsersLocation();
  emit("close");
};
</script>
