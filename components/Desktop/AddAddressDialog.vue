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
            <HeadlessDialogPanel class="w-full max-w-5xl rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="flex w-full transform items-stretch justify-between overflow-hidden rounded-2xl bg-whitegray"
              >
                <ClientOnly>
                  <form
                    class="flex w-full flex-col items-stretch justify-between p-8"
                    @submit="onSubmit"
                  >
                    <div class="flex shrink flex-col items-stretch gap-4">
                      <h1 class="mb-4 text-start text-xl font-medium text-black">Добавить адрес</h1>
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

                  <YandexMap
                    :coordinates="coordinates"
                    :zoom="17"
                    :controls="['zoomControl', 'geolocationControl']"
                    class="aspect-square h-[36rem] shrink-0 overflow-hidden rounded-xl"
                    @click="updateCoords"
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

const { handleSubmit, setFieldValue } = useForm({
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

const axiosPrivate = usePrivateAxiosInstance()

const updateCoords = (a: any) => {
  const coords = a.get('coords')
  axiosPrivate
    .get('user/adres/search/geo', {
      params: {
        latitude: coords[0],
        longitude: coords[1],
      },
    })
    .then((res) => {
      setFieldValue('adres', res.data)
    })
}

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
