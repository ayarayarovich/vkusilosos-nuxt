<template>
  <h3 class="mb-5 block text-xl font-medium">Привязанные карты</h3>
  <Skeleton
    :show-content="isSuccess"
    width="100%"
    height="3.5rem"
  >
    <ul class="flex flex-col items-stretch gap-4">
      <template v-if="creditCardsWithTypes?.length">
        <li
          v-for="(cart, index) in creditCardsWithTypes"
          :key="index"
          class="flex items-center rounded-xl bg-white p-4 shadow-main"
        >
          <IconVisa
            v-if="cart.type === 'visa'"
            class="aspect-[4/3] h-6 object-contain"
          />
          <IconMasterCard
            v-else-if="cart.type === 'mastercard'"
            class="aspect-[4/3] h-6 object-contain"
          />
          <IconMaestro
            v-else-if="cart.type === 'maestro'"
            class="aspect-[4/3] h-6 object-contain"
          />
          <IconMir
            v-else-if="cart.type === 'mir'"
            class="aspect-[4/3] h-6 object-contain"
          />
          <IconCreditCard
            v-else
            class="aspect-[4/3] h-6 object-contain"
          />
          <span class="ml-4">{{ cart.cart }}</span>
          <button
            class="ml-auto"
            @click="deleteCart(cart.id)"
          >
            <IconTrashbin class="h-6" />
          </button>
        </li>
      </template>
      <li
        v-else
        class="rounded-xl bg-white p-5 text-sm text-[#777675] shadow-main"
      >
        У вас пока нет привязанных карт, привязать можно при оплате заказа
      </li>
    </ul>
  </Skeleton>
</template>

<script setup lang="ts">
import creditCardType from 'credit-card-type'

const { data, isSuccess } = useCarts((v) => v.list)

const { mutate } = useDeleteCart()

const deleteCart = (id: number) => {
  mutate({ id })
}

const creditCardsWithTypes = computed(() => {
  if (data.value) {
    return data.value.map((v) => {
      let type = 'general'
      const types = creditCardType(v.cart.slice(0, 4))
      if (types.length > 0) {
        type = types[0].type
      }
      return {
        ...v,
        type,
      }
    })
  }
})
</script>
