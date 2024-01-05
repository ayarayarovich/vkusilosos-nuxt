<template>
  <form>
    <div class="flex flex-col gap-4 lg:flex-row">
      <InputText
        class="flex-1"
        label="Имя"
        name="name"
      />
      <InputText
        class="flex-1"
        label="Номер телефона"
        name="phone"
        locked
      />
    </div>
    <OrderCartDialogSelectedAddress
      name="reception_way"
      class="mb-8 mt-4"
    />

    <template v-if="locationStore.receptionWay === 'delivery'">
      <p class="mb-4">Когда доставить?</p>
      <OrderCartDialogSelectTime />
    </template>
  </form>
</template>

<script setup lang="ts">
import { useLocationStore } from '~/store/location';
import { formatPhone } from '~/utils'

const { data } = useUser((v) => v)

const locationStore = useLocationStore()

const { handleSubmit } = useForm({
  initialValues: computed(() => ({
    name: data.value?.name,
    phone: formatPhone(data.value?.phone || ''),
  })),
})
</script>
