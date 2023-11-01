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
                  <div class="flex w-full flex-col items-stretch justify-between p-8">
                    <div class="flex shrink flex-col items-stretch gap-4">
                      <h1 class="mb-4 text-start text-xl font-medium text-black">Изменить адрес</h1>
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

                    <div class="flex gap-4">
                      <button
                        class="flex-1 rounded-xl bg-gray px-4 py-4 outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
                        @click="emit('close')"
                      >
                        <span class="font-medium text-black opacity-50">Удалить</span>
                      </button>
                      <SimpleButton
                        class="w-full flex-1 px-4 py-4 text-sm font-medium uppercase"
                        @click="emit('close')"
                        >Сохранить</SimpleButton
                      >
                    </div>
                  </div>

                  <YandexMap
                    :coordinates="[55.755864, 37.617698]"
                    :zoom="13"
                    class="aspect-square h-[36rem] shrink-0 overflow-hidden rounded-xl"
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
