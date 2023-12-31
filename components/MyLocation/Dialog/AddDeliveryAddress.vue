<template>
  <form
    class="flex w-full flex-col items-stretch justify-between p-8"
    @submit="onSubmit"
  >
    <div class="flex shrink flex-col items-stretch gap-4">
      <button
        class="mb-4 flex items-center gap-4 text-start text-xl font-medium text-black"
        type="button"
        @click="emit('goBack')"
      >
        <IconArrowRight class="h-6 rotate-180 invert" /> Добавить адрес
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
        :disabled="isPendingAddAddress"
      >
        Сохранить
      </SimpleButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup'

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
})

const adres = useFieldValue<{ lat: string; lon: string; display_name: string }>('adres')
const coordinates = computed(() => {
  if (adres.value) {
    return [Number(adres.value.lat), Number(adres.value.lon)]
  }
  return [55.755864, 37.617698]
})

watchEffect(() => emit('updateCoords', coordinates.value))

const query = ref('')
const throttledQuery = refThrottled(query, 500, undefined, false)

const { data, isLoading: isLoadingAddressSearch } = useAddressSearch(throttledQuery, (v) => v, true)
const { mutateAsync, isPending: isPendingAddAddress } = useAddAddress()

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
  mutateAsync(body).then(() => emit('goBack'))
})
</script>
