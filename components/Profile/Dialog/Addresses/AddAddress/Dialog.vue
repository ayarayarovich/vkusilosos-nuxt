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
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <HeadlessDialogPanel class="w-full max-w-5xl rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="flex w-full transform items-stretch justify-between overflow-hidden rounded-2xl bg-whitegray"
              >
                <ClientOnly>
                  <div class="p-8 w-full flex flex-col items-stretch justify-between">
                    <div class="flex flex-col items-stretch gap-4 shrink">
                      <h1 class="text-black text-xl text-start font-medium mb-4">Добавить адрес</h1>
                      <div>
                        <InputText
                          v-model="form.address"
                          label="Город, улица и дом"
                        />
                      </div>
                      <div class="flex gap-4">
                        <InputText
                          v-model="form.podyezd"
                          class="flex-1"
                          label="Подьезд"
                        />
                        <InputText
                          v-model="form.doorCode"
                          class="flex-1"
                          label="Код двери"
                        />
                      </div>
                      <div class="flex gap-4">
                        <InputText
                          v-model="form.floor"
                          class="flex-1"
                          label="Этаж"
                        />
                        <InputText
                          v-model="form.appartment"
                          class="flex-1"
                          label="Квартира"
                        />
                      </div>
                      <div>
                        <InputText
                          v-model="form.comment"
                          label="Комментарий"
                        />
                      </div>
                    </div>

                    <div>
                      <SimpleButton class="w-full py-4 px-4 uppercase text-sm font-medium" @click="emit('close')">Сохранить</SimpleButton>
                    </div>
                  </div>

                  <YandexMap
                    :coordinates="[55.755864, 37.617698]"
                    :zoom="13"
                    class="h-[36rem] aspect-square shrink-0 rounded-xl overflow-hidden"
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
import { ref, toRefs } from 'vue'
import { YandexMap, YandexMarker } from 'vue-yandex-maps'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const form = reactive({
  address: '',
  podyezd: '',
  doorCode: '',
  floor: '',
  appartment: '',
  comment: '',
})

const dialogPanelEl = ref<HTMLElement>()

const { top, bottom, right, left } = useElementBounding(dialogPanelEl)
</script>
