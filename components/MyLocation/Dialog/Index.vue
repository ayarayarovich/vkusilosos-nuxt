<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="close()"
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

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto">
        <div class="flex h-full items-center justify-center text-center lg:h-auto lg:min-h-full lg:p-4">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="h-full w-full max-w-5xl shadow-xl transition-all lg:h-auto">
              <div
                ref="dialogPanelEl"
                class="flex h-full w-full transform flex-col items-stretch overflow-hidden bg-whitegray lg:h-auto lg:flex-row lg:rounded-2xl"
              >
                <button
                  class="flex items-center gap-2 p-4 text-lg font-medium lg:hidden"
                  type="button"
                  @click="close()"
                >
                  <IconArrowRight class="h-6 rotate-180 invert" />
                  Выберите адрес
                </button>

                <div class="aspect-square h-[12rem] shrink-0 overflow-hidden rounded-xl lg:order-3 lg:h-[36rem]">
                  <MyYandexMap
                    :coordinates="coordinates"
                    show-center-marker
                  />
                </div>

                <Transition
                  name="fade"
                  mode="out-in"
                >
                  <div
                    v-if="currentView === 'default'"
                    class="flex w-full flex-grow flex-col items-stretch p-4 lg:shrink lg:p-8"
                  >
                    <div class="rounded-xl bg-current bg-gray p-1.5 text-sm">
                      <div class="relative">
                        <div
                          class="absolute bottom-0 left-0 top-0 w-1/2 rounded-lg bg-white shadow-main transition-transform"
                          :class="{
                            'translate-x-0': myReceptionWay == 'delivery',
                            'translate-x-full': myReceptionWay == 'restaurant',
                          }"
                        ></div>
                        <button
                          type="button"
                          class="hover isolate h-10 w-1/2 rounded-lg"
                          @click="myReceptionWay = 'delivery'"
                        >
                          Доставка
                        </button>
                        <button
                          type="button"
                          class="isolate h-10 w-1/2 rounded-lg"
                          @click="myReceptionWay = 'restaurant'"
                        >
                          Самовывоз
                        </button>
                      </div>
                    </div>

                    <div class="h-0 grow">
                      <Transition
                        name="fade"
                        mode="out-in"
                      >
                        <MyLocationDialogRestaurants
                          v-if="myReceptionWay === 'restaurant'"
                          class="flex-grow lg:shrink"
                          @update-coords="coordinates = $event"
                          @close="emit('close')"
                        />
                        <MyLocationDialogDelivery
                          v-else-if="myReceptionWay === 'delivery'"
                          class="flex-grow lg:shrink"
                          @edit="editAddress($event)"
                          @new="currentView = 'new'"
                          @update-coords="coordinates = $event"
                          @close="emit('close')"
                        />
                      </Transition>
                    </div>
                  </div>
                  <MyLocationDialogEditDeliveryAddress
                    v-else-if="currentView === 'edit'"
                    class="flex-grow lg:shrink"
                    :address="editingAddress"
                    @update-coords="coordinates = $event"
                    @go-back="currentView = 'default'"
                  />
                  <MyLocationDialogAddDeliveryAddress
                    v-else-if="currentView === 'new'"
                    class="flex-grow lg:shrink"
                    @update-coords="coordinates = $event"
                    @go-back="currentView = 'default'"
                  />
                </Transition>
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
import type { LngLat } from '@yandex/ymaps3-types'
import type { Address } from '~/interfaces/main'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const currentView = ref<'edit' | 'new' | 'default'>('default')
const editingAddress = ref<Address>()

const editAddress = (address: Address) => {
  editingAddress.value = address
  currentView.value = 'edit'
}

const coordinates = ref<LngLat>([37.617698, 55.755864])

const close = () => {
  emit('close')
  if (currentView.value !== 'default') {
    setTimeout(() => {
      currentView.value = 'default'
    }, 300)
  }
}

const { data: usersReceptionWay } = useCurrentReceptionWay()

const myReceptionWay = ref<'delivery' | 'restaurant'>('delivery')

watch(
  [usersReceptionWay],
  () => {
    if (usersReceptionWay.value) {
      myReceptionWay.value = usersReceptionWay.value.type
    }
  },
  {
    immediate: true,
  }
)
const dialogPanelEl = ref<HTMLElement>()
</script>
