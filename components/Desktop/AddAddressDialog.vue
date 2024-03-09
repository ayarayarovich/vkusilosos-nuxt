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

                <div class="aspect-square h-[36rem] shrink-0 overflow-hidden rounded-xl">
                  <MyYandexMap
                    show-center-marker
                    :coordinates="coordinates"
                    @update-coords-drag="updateCoords"
                  />
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
import { ref, toRefs } from 'vue'
import { VueYandexMaps } from 'vue-yandex-maps'
import * as yup from 'yup'
import type { MyCoords } from '~/interfaces/common'

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
    return [Number(adres.value.lon), Number(adres.value.lat)]
  }
  return [37.617698, 55.755864]
})

const axiosPrivate = usePrivateAxiosInstance()

const updateCoords = (c: MyCoords) => {
  axiosPrivate
    .get('user/adres/search/geo', {
      params: {
        latitude: c.Lat,
        longitude: c.Lng,
      },
    })
    .then((res) => {
      setFieldValue('adres', res.data)
    })
}

onMounted(() => {
  VueYandexMaps.ymaps()
    .geolocation.getPosition()
    .then(({ coords }) => {
      updateCoords({
        Lng: coords[0],
        Lat: coords[1],
      })
    })
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
