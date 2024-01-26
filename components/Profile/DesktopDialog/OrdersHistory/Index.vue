<template>
  <div class="flex h-full flex-col items-stretch">
    <MyLocationDialog
      :show="showMyLocationDialog"
      @close="closeMyLocationDialog"
    />
    <div class="mx-8 mb-4 mt-10 flex flex-col items-start">
      <button
        class="flex items-center gap-2"
        @click="emit('go-back')"
      >
        <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
        <h2 class="block text-xl font-medium leading-none">История заказов</h2>
      </button>
      <h3 class="ml-10 block text-sm font-medium text-black opacity-50 md:ml-0">
        Последние 20 заказов за последние 90 дней
      </h3>
    </div>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="!orders?.total || !orders?.active_orders.length"
        class="flex h-0 grow items-center justify-center p-8"
      >
        <div>
          <img
            src="~/assets/samoe-vremya-zakazat.svg"
            alt=""
            class="mb-6 h-48 w-full object-contain object-center"
          />
          <strong class="mb-2 block text-center text-2xl font-medium">
            Самое время заказать <br />
            что-то вкусное
          </strong>
          <p class="mb-8 text-center">Укажите адрес доставки на карте и выберете ресторан</p>
          <SimpleButton
            class="w-full px-8 py-4 font-medium uppercase"
            @click="showMyLocationDialog = true"
          >
            Выбрать адрес
          </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="relative my-2 h-0 grow"
      >
        <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
        <div
          class="flex h-full flex-col items-stretch gap-8 overflow-y-auto pt-8 text-xs md:gap-16 md:pt-16 md:text-base"
        >
          <ul
            v-if="orders?.active_orders.length"
            class="flex flex-col gap-4"
          >
            <li
              v-for="o in orders.active_orders"
              :key="o.id"
              class="mx-4 rounded-xl bg-white p-4 shadow-main lg:mx-8"
            >
              <div class="mb-4 flex items-center justify-between">
                <div>Активный заказ</div>
                <div class="text-[#999700]">{{ displayStatus(o.status) }}</div>
              </div>
              <div class="flex w-full">
                <div class="shrink-0 grow-[1] basis-0">{{ o.id }}</div>
                <div class="shrink-0 grow-[2] basis-0">{{ formatDate(o.created_at) }}</div>
                <div class="shrink-0 grow-[1] basis-0">{{ o.price }} &#8381;</div>
                <div class="shrink grow-0 basis-0">
                  <ProfileDesktopDialogOrdersHistoryReceipt :order="o" />
                </div>
              </div>
            </li>
          </ul>

          <div class="grow px-4 pb-8 lg:px-8">
            <div class="flex h-full flex-col items-stretch">
              <div class="mb-2 flex w-full rounded-xl bg-gray px-4 py-2">
                <div class="shrink-0 grow-[1] basis-0">№</div>
                <div class="shrink-0 grow-[2] basis-0">Время заказа</div>
                <div class="shrink-0 grow-[1] basis-0">Сумма</div>
                <div class="shrink grow-0 basis-[10ch]">Чек</div>
              </div>

              <div class="relative h-0 flex-auto">
                <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
                <ul class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto scroll-smooth py-4">
                  <li
                    v-for="o in orders?.last_orders"
                    :key="o.id"
                    class="flex w-full rounded-xl bg-white px-4 py-2 shadow-main"
                  >
                    <div class="shrink-0 grow-[1] basis-0">{{ o.id }}</div>
                    <div class="shrink-0 grow-[2] basis-0">{{ formatDate(o.created_at) }}</div>
                    <div class="shrink-0 grow-[1] basis-0">{{ o.price }} &#8381;</div>
                    <div class="shrink grow-0 basis-0">
                      <ProfileDesktopDialogOrdersHistoryReceipt :order="o" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { pad } from '~/utils'
import { useProfileDialogStore } from '~/store/profileDialog'

const emit = defineEmits(['go-back'])

const { data: orders } = useOrders(
  (v) => v,
  (query) => {
    if (query.state.data?.active_orders.length) {
      return 60 * 1000
    }
    return false
  }
)

const profileDialogStore = useProfileDialogStore()

const displayStatus = (s: string) => {
  const map = {
    'accepted': 'Выполнен',
    'delivered': 'Доставлен',
    'waitAdmin': 'Ожидает подтверждения',
    'rejectedByUser': 'Отменён клиентом',
    'rejectedByAdmin': 'Отменён админом',
    'rejected': 'Отменён',
    'wait pay': 'Ожидает оплаты',
    'cooking': 'Готовится',
    'process': 'В процессе',
    'deliver': 'В пути',
  } as any

  return map[s]
}

const formatDate = (d: string) => {
  const date = new Date(Date.parse(d))

  const day = pad(date.getDate(), 2)
  const month = pad(date.getMonth(), 2)
  const year = date.getFullYear()

  const hour = pad(date.getHours(), 2)
  const minutes = pad(date.getMinutes(), 2)

  return `${day}.${month}.${year}, ${hour}:${minutes}`
}

const showMyLocationDialog = ref(false)
const closeMyLocationDialog = () => {
  showMyLocationDialog.value = false
  profileDialogStore.close()
}
</script>
