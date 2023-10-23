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
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <HeadlessDialogPanel
              class="w-full max-w-5xl rounded-2xl shadow-xl transition-all"
            >
              <div
                ref="dialogPanelEl"
                class="flex w-full transform items-stretch justify-between overflow-hidden rounded-2xl bg-whitegray"
              >
                <ClientOnly>
                  <div class="p-8 w-full flex flex-col items-stretch">
                    <div class="rounded-xl bg-current bg-gray p-1.5 text-sm">
                      <div class="relative">
                        <div
                          class="absolute bottom-0 left-0 top-0 w-1/2 rounded-lg bg-white shadow-main transition-transform"
                          :class="{
                            'translate-x-0': reciptionWay == 'delivery',
                            'translate-x-full': reciptionWay == 'restaurant',
                          }"
                        ></div>
                        <button
                          class="hover isolate h-10 w-1/2 rounded-lg"
                          @click="reciptionWay = 'delivery'"
                        >
                          Доставка
                        </button>
                        <button
                          class="isolate h-10 w-1/2 rounded-lg"
                          @click="reciptionWay = 'restaurant'"
                        >
                          В ресторане
                        </button>
                      </div>
                    </div>

                    <div class="grow h-0">
                      <Transition name="fade" mode="out-in">
                        <MyLocationDialogRestaurants
                          v-if="reciptionWay === 'restaurant'"
                        />
                        <MyLocationDialogDelivery
                          v-else-if="reciptionWay === 'delivery'"
                        />
                      </Transition>
                    </div>
                  </div>

                  <YandexMap
                    :coordinates="[55.755864, 37.617698]"
                    :zoom="13"
                    class="h-[32rem] aspect-square w-full rounded-xl overflow-hidden"
                  >
                    <YandexMarker
                      :coordinates="[45.019627, 39.031206]"
                      :marker-id="1"
                    />
                  </YandexMap>
                </ClientOnly>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, toRefs } from "vue";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import { useLocationStore } from "~/store/location";

const props = defineProps<{
  show?: boolean;
}>();
const { show } = toRefs(props);
const emit = defineEmits(["close"]);

const locationStore = useLocationStore();
const { reciptionWay } = storeToRefs(locationStore);
const dialogPanelEl = ref<HTMLElement>();

const { top, bottom, right, left } = useElementBounding(dialogPanelEl);
</script>
