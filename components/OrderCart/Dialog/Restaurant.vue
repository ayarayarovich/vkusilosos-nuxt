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

    <p class="mb-4">Когда заберете заказ?</p>
    <OrderCartDialogSelectTime />
  </form>
</template>
