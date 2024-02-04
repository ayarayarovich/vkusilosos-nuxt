<template>
  <form>
    <div class="flex flex-col gap-4 lg:flex-row mb-4">
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
      class="mb-4"
      @location-changed="emit('locationChanged')"
    />
    <InputTextarea
      class="mb-8"
      name="comment"
      label="Комментарий к заказу"
      :rows="2"
    />


    <p class="mb-4">Когда заберете заказ?</p>
    <OrderCartDialogSelectTime />
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['locationChanged'])
</script>
