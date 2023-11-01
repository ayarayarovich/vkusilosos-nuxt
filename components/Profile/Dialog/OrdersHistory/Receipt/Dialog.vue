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
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <MouseFollower
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
      />

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="w-full max-w-2xl rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="w-full transform overflow-hidden rounded-2xl bg-white py-8"
              >
                <h1 class="mx-8 mb-4 text-start text-xl font-medium">Заказ № {{ orderId }}</h1>
                <div class="mx-4 h-px bg-gray"></div>
                <ul class="m-8 text-start text-sm">
                  <li class="flex items-center gap-2">
                    <p class="shrink-0 grow-[4] basis-0">Ролл авокадо с креветками</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">2 шт</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">540 &#8381;</p>
                  </li>
                  <div class="my-2 h-px bg-gray"></div>
                  <li class="flex items-center gap-2">
                    <p class="shrink-0 grow-[4] basis-0">Фурай маки</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">2 шт</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">540 &#8381;</p>
                  </li>
                  <div class="my-2 h-px bg-gray"></div>
                  <li class="flex items-center gap-2">
                    <p class="shrink-0 grow-[4] basis-0">Суши с тунцом</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">2 шт</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">5409 &#8381;</p>
                  </li>
                  <div class="my-2 h-px bg-gray"></div>
                  <li class="flex items-center gap-2">
                    <p class="shrink-0 grow-[4] basis-0">Филадельфия с манго</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">2 шт</p>
                    <p class="shrink-0 grow-[2] basis-0 text-end">540 &#8381;</p>
                  </li>
                </ul>
                <div class="mx-4 mb-4 h-px bg-gray"></div>
                <h1 class="mx-8 text-start text-xl font-medium">Итого: 2185 &#8381;</h1>
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
  orderId: number
}>()
const { show, orderId } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref<HTMLElement>()

const { top, bottom, right, left } = useElementBounding(dialogPanelEl)
</script>
