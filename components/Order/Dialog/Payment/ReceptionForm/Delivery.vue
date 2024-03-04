<template>
  <form>
    <div class="mb-4 flex flex-col gap-4 lg:flex-row">
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
    <OrderDialogSelectAddress
      name="reception_way"
      class="mb-4"
      @location-changed="emit('locationChanged')"
    />
    <InputTextarea
      class="mb-8"
      name="comment"
      label="Комментарий к заказу"
      :rows="2"
    />

    <p class="mb-4">Когда доставить?</p>
    <OrderDialogSelectTime />
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['locationChanged'])
</script>
