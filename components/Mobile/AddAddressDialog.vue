<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      :initial-focus="dialogPanelEl"
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
        <div class="flex h-full items-center justify-center text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-y-95 translate-y-16"
            enter-to="opacity-100 scale-y-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-y-100 translate-y-0"
            leave-to="opacity-0 scale-y-95 translate-y-16"
          >
            <HeadlessDialogPanel class="h-full w-full transition-all">
              <div
                ref="dialogPanelEl"
                class="flex h-full w-full transform flex-col items-stretch overflow-hidden bg-whitegray"
              >
                <button
                  class="flex items-center gap-4 px-4 py-5 text-start text-xl font-medium text-black"
                  type="button"
                  @click="emit('close')"
                >
                  <IconArrowRight class="h-6 rotate-180 invert md:hidden" /> Добавить адрес
                </button>

                <ClientOnly>
                  <YandexMap
                    :coordinates="coordinates"
                    :zoom="17"
                    :controls="['zoomControl', 'geolocationControl']"
                    class="aspect-[15/8] overflow-hidden"
                  >
                    <YandexMarker
                      :coordinates="coordinates"
                      :marker-id="1"
                      :options="{
                        iconLayout: 'default#image',
                        iconImageSize: [34, 40],
                        iconOffset: [0, 0],
                        iconImageHref: '/map-marker.png',
                      }"
                    />
                  </YandexMap>
                </ClientOnly>

                <form
                  class="flex w-full grow flex-col items-stretch justify-between p-4"
                  @submit="onSubmit"
                >
                  <div class="flex shrink flex-col items-stretch gap-4">
                    <div>
                      <InputAutocomplete
                        v-model:query="query"
                        name="adres"
                        class="z-20"
                        label="Город, улица и дом"
                        :options="data || []"
                        :is-loading="isLoadingAddressSearch"
                        :display-value="(option: any) => option.display_name"
                      />
                    </div>

                    <div class="flex gap-4">
                      <InputText
                        class="flex-1"
                        name="podezd"
                        label="Подьезд"
                      />
                      <InputText
                        class="flex-1"
                        name="code"
                        label="Код двери"
                      />
                    </div>

                    <div class="flex gap-4">
                      <InputNumber
                        class="flex-1"
                        name="floor"
                        label="Этаж"
                      />
                      <InputText
                        class="flex-1"
                        name="house"
                        label="Номер квартиры"
                      />
                    </div>

                    <InputTextarea
                      name="comment"
                      label="Комментарий"
                      :rows="3"
                      disable-resize
                    />
                  </div>

                  <div>
                    <SimpleButton
                      class="w-full px-4 py-4 text-sm font-medium uppercase"
                      type="submit"
                      :disabled="isPendingAddAddress"
                    >
                      Сохранить
                    </SimpleButton>
                  </div>
                </form>
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
import * as yup from 'yup'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    adres: yup
      .object({
        lat: yup.string(),
        lon: yup.string(),
        display_name: yup.string(),
      })
      .default(undefined)
      .required()
      .label('Город, улица и дом'),
    podezd: yup.string().label('Подъезд'),
    code: yup.string().label('Код двери'),
    floor: yup.string().label('Этаж'),
    house: yup.string().label('Номер квартиры'),
    comment: yup.string().label('Комментарий'),
  }),
})

const adres = useFieldValue<{ lat: string; lon: string; display_name: string }>('adres')
const coordinates = computed(() => {
  if (adres.value) {
    return [Number(adres.value.lat), Number(adres.value.lon)]
  }
  return [55.755864, 37.617698]
})

const query = ref('')
const throttledQuery = refThrottled(query, 500, undefined, false)

const { data, isLoading: isLoadingAddressSearch } = useAddressSearch(throttledQuery, (v) => v, show)
const { mutateAsync, isPending: isPendingAddAddress } = useAddAddress()

const dialogPanelEl = ref<HTMLElement>()

const onSubmit = handleSubmit((vals: any) => {
  let fullName = vals.adres.display_name
  if (vals.code) fullName += `, код двери ${vals.code}`
  if (vals.house) fullName += `, кв. ${vals.house}`
  if (vals.podezd) fullName += `, подъезд ${vals.podezd}`

  const body = {
    podezd: vals.podezd,
    code: vals.code,
    floor: vals.floor,
    house: vals.house,
    comment: vals.comment,
    latitude: vals.adres.lat,
    longitude: vals.adres.lon,
    adres: vals.adres.display_name,
    full_name: fullName,
  }
  mutateAsync(body).then(() => emit('close'))
})
</script>
