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

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto overflow-x-hidden">
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
                <h1 class="mx-8 mb-4 text-start text-xl font-medium">Заказ № {{ order.id }}</h1>
                <div class="mx-4 h-px bg-gray"></div>
                <ul class="m-8 text-start text-sm">
                  <template v-if="isSuccess">
                    <template
                      v-for="(p, index) in data?.list"
                      :key="index"
                    >
                      <li class="flex items-center gap-2">
                        <p class="shrink-0 grow-[4] basis-0">{{ p.name }}</p>
                        <p class="shrink-0 grow-[2] basis-0 text-end">{{ p.count }} шт</p>
                        <p class="shrink-0 grow-[2] basis-0 text-end">{{ p.price }} &#8381;</p>
                      </li>
                      <div class="my-2 h-px bg-gray last:hidden"></div>
                    </template>
                  </template>

                  <template v-else>
                    <template
                      v-for="i in 3"
                      :key="i"
                    >
                      <Skeleton
                        height="1.25rem"
                        width="100%"
                      />
                      <div class="my-2 h-px bg-gray last:hidden"></div>
                    </template>
                  </template>
                </ul>
                <div class="mx-4 mb-4 h-px bg-gray"></div>
                <p class="mx-8 text-start text-xl font-medium">Итого: {{ order.price }} &#8381;</p>
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
import type { Order } from '~/interfaces/users'

const props = defineProps<{
  show?: boolean
  order: Order
}>()
const { show, order } = toRefs(props)
const emit = defineEmits(['close'])

const { data, isSuccess } = useOrder({
  enabled: show,
  orderID: order.value.id,
  select: (v) => v,
})

const dialogPanelEl = ref<HTMLElement>()
</script>
