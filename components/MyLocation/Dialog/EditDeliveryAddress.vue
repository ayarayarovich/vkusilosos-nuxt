<template>
  <form
    class="flex w-full flex-col items-stretch justify-between p-4 lg:p-8"
    @submit="onSubmit"
  >
    <div class="flex shrink flex-col items-stretch gap-4">
      <button
        class="lg:mb-4 flex items-center gap-4 text-start text-base lg:text-xl font-medium text-black"
        type="button"
        @click="emit('goBack')"
      >
        <IconArrowRight class="h-4 lg:h-6 rotate-180 invert" /> Изменить адрес
      </button>
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
        :disabled="isPendingUpdateAddress"
      >
        Сохранить
      </SimpleButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import type { Address } from '~/interfaces/main'

const props = defineProps<{
  address: Address
}>()

const emit = defineEmits(['updateCoords', 'goBack'])

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
})

const adres = useFieldValue<{ lat: string; lon: string; display_name: string }>('adres')
const coordinates = computed(() => {
  if (adres.value) {
    return [Number(adres.value.lon), Number(adres.value.lat)]
  }
  return [37.617698, 55.755864]
})

watchEffect(() => emit('updateCoords', coordinates.value))

const query = ref('')
const throttledQuery = refThrottled(query, 500, undefined, false)

const { data, isLoading: isLoadingAddressSearch } = useAddressSearch(throttledQuery, (v) => v, true)
const { mutateAsync: updateAddressAsync, isPending: isPendingUpdateAddress } = useUpdateAddress()

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
  updateAddressAsync(body).then(() => emit('goBack'))
})
</script>
