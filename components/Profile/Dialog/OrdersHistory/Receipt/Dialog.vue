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
              class="rounded-2xl shadow-xl w-full max-w-2xl transition-all"
            >
              <div
                ref="dialogPanelEl"
                class="w-full transform overflow-hidden rounded-2xl bg-white py-8"
              >
                <h1 class="text-xl font-medium mb-4 text-start mx-8">
                  Заказ № {{ orderId }}
                </h1>
                <div class="h-px bg-gray mx-4"></div>
                <ul class="m-8 text-start text-sm">
                  <li class="flex items-center gap-2">
                    <p class="grow-[4] shrink-0 basis-0">Ролл авокадо с креветками</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">2 шт</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">540 &#8381;</p>
                  </li>
                  <div class="h-px bg-gray my-2"></div>
                  <li class="flex items-center gap-2">
                    <p class="grow-[4] shrink-0 basis-0">Фурай маки</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">2 шт</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">540 &#8381;</p>
                  </li>
                  <div class="h-px bg-gray my-2"></div>
                  <li class="flex items-center gap-2">
                    <p class="grow-[4] shrink-0 basis-0">Суши с тунцом</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">2 шт</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">5409 &#8381;</p>
                  </li>
                  <div class="h-px bg-gray my-2"></div>
                  <li class="flex items-center gap-2">
                    <p class="grow-[4] shrink-0 basis-0">Филадельфия с манго</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">2 шт</p>
                    <p class="grow-[2] shrink-0 basis-0 text-end">540 &#8381;</p>
                  </li>
                </ul>
                <div class="h-px bg-gray mx-4 mb-4"></div>
                <h1 class="text-xl font-medium text-start mx-8">
                  Итого: 2185 &#8381;
                </h1>
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
  orderId: number;
}>();
const { show, orderId } = toRefs(props);
const emit = defineEmits(["close"]);

const dialogPanelEl = ref<HTMLElement>();

const { top, bottom, right, left } = useElementBounding(dialogPanelEl);
</script>
