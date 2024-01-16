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
                  <IconArrowRight class="h-6 rotate-180 invert md:hidden" /> Изменить адрес
                </button>

                <div class="aspect-[15/8]">
                  <MyYandexMap
                    show-center-marker
                    :coordinates="coordinates"
                  />
                </div>

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

                  <div class="flex gap-4">
                    <button
                      class="flex-1 rounded-xl bg-gray px-4 py-4 outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
                      type="button"
                      @click="deleteAddress(props.address.id)"
                    >
                      <span class="font-medium text-black opacity-50">Удалить</span>
                    </button>
                    <SimpleButton
                      class="w-full flex-1 px-4 py-4 text-sm font-medium uppercase"
                      type="submit"
                      :disabled="isPendingUpdateAddress"
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
import * as yup from 'yup'
import type { Address } from '~/interfaces/main'

const props = defineProps<{
  show?: boolean
  address: Address
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref<HTMLElement>()

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
  initialValues: computed(() => ({
    adres: {
      lat: props.address.latitude,
      lon: props.address.longitude,
      display_name: props.address.adres,
    },
    podezd: props.address.podezd,
    code: props.address.code,
    floor: props.address.floor,
    house: props.address.house,
    comment: props.address.comment,
  })),
  keepValuesOnUnmount: true,
})

const adres = useFieldValue<{ lat: string; lon: string; display_name: string }>('adres')
const coordinates = computed(() => {
  if (adres.value) {
    return [Number(adres.value.lat), Number(adres.value.lon)]
  }
  return [37.617698, 55.755864]
})

const query = ref('')
const throttledQuery = refThrottled(query, 500, undefined, false)

const { data, isLoading: isLoadingAddressSearch } = useAddressSearch(throttledQuery, (v) => v, show)
const { mutateAsync: updateAddressAsync, isPending: isPendingUpdateAddress } = useUpdateAddress()
const { mutateAsync: deleteAddressAsync } = useDeleteAddress()

const onSubmit = handleSubmit((vals: any) => {
  let fullName = vals.adres.display_name
  if (vals.code) fullName += `, код двери ${vals.code}`
  if (vals.house) fullName += `, кв. ${vals.house}`
  if (vals.podezd) fullName += `, подъезд ${vals.podezd}`

  const body = {
    id: props.address.id,

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
  updateAddressAsync(body).then(() => emit('close'))
})

const deleteAddress = (addressID: number) => {
  deleteAddressAsync(addressID).then(() => emit('close'))
}
</script>
