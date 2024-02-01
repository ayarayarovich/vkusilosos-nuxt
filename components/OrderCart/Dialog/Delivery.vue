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
      @location-changed="emit('locationChanged')"
    />

    <p class="mb-4">Когда доставить?</p>
    <OrderCartDialogSelectTime />
  </form>
</template>

<script setup lang="ts">

const emit = defineEmits(['locationChanged'])

</script>
