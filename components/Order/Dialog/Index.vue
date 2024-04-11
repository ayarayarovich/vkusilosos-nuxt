<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="close()"
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
        <div class="min-h-full">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-x-full"
            enter-to="opacity-100 translate-x-0"
            leave="duration-200 -mr-[17px] ease-in"
            leave-from="opacity-100 translate-x-0"
            leave-to="opacity-0 translate-x-full"
          >
            <HeadlessDialogPanel class="absolute right-0 h-full w-full max-w-3xl bg-whitegray shadow-xl transition-all">
              <MessageDialog
                message="К сожалению, сюда доставка не осуществляется"
                :show="showNotDeliveringMessage"
                @close="showNotDeliveringMessage = false"
              />
              <form
                ref="dialogPanelEl"
                class="h-full w-full"
                @submit="onSubmit"
              >
                <Transition
                  name="fade"
                  mode="out-in"
                >
                  <OrderDialogCart
                    v-if="stage == 'cart'"
                    @procced-to-payment="stage = 'payment'"
                  />
                  <OrderDialogPayment
                    v-else-if="stage == 'payment'"
                    @back-to-cart="stage = 'cart'"
                  />
                  <OrderDialogThanksForOrder v-else-if="stage == 'thanks'" />
                  <OrderDialogRestClosed v-else-if="stage == 'rest_closed'" />
                  <OrderDialogCantDeliver v-else-if="stage == 'cant_deliver'" />
                </Transition>
              </form>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref, toRefs } from 'vue'
import * as yup from 'yup'
import { formatPhone } from '~/utils'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref()

const stage = ref<'cart' | 'payment' | 'thanks' | 'rest_closed' | 'cant_deliver'>('cart')

const validationSchema = computed(() => {
  if (stage.value === 'cart') {
    return yup.object({
      cart_id: yup.number().required(),
      coupon: yup.string().label('Промокод'),
      use_coins: yup.boolean().label('Вкусоины'),
      guests_count: yup.number().label('Количество гостей'),
    })
  } else if (stage.value === 'payment') {
    return yup.object({
      name: yup.string().label('Имя'),
      phone: yup.string().label('Телефон'),
      comment: yup.string().label('Комментарий к заказу'),
      cashback: yup
        .number()
        .label('Сдача')
        .when(['no_cashback', 'cart_id'], {
          is: (noCashback: boolean, cartId: number) => !noCashback && cartId === -2,
          then: (schema) => schema.required(),
        }),
      no_cashback: yup.boolean(),
    })
  }
})

const { handleSubmit, resetForm } = useForm<any>({
  validationSchema,
  initialValues: computed(() => ({
    cart_id: -1,
    no_cashback: true,
    time_deliver: 'soon',
    use_coins: false,
    guests_count: 1,
  })),
  keepValuesOnUnmount: true,
})

const { data: user } = useUser((v) => v)

watch(
  [user],
  () => {
    if (user.value) {
      resetForm({
        values: {
          name: user.value.name,
          phone: formatPhone(user.value.phone || ''),
        },
      })
    }
  },
  {
    immediate: true,
  }
)

const { mutateAsync } = useCreateOrder()
const invalidateOrders = useInvalidateOrders()
const invalidateBasket = useInvalidateBasket()
const basketTotalPrice = useBasket((v) => v.total_price)

const showNotDeliveringMessage = ref(false)

const close = () => {
  stage.value = 'cart'
  emit('close')
}

const onSubmit = handleSubmit((v: any) => {
  if (v.time_deliver === 'soon') {
    v.time_deliver = DateTime.now().plus({ minutes: 30 }).toISO()
  }

  if (v.no_cashback) {
    v.cashback = 0
  }

  const ph: string = v.phone
  v.phone = ph.replace(/\D/g, '')

  delete v.no_cashback
  delete v.reception_way

  mutateAsync(v).then((response) => {
    if (response.link || response.action === 'success') {
      try {
        ym(94201196, 'reachGoal', 'zakazfinish', {
          order_price: basketTotalPrice.data.value!.toFixed(2).toString(),
          currency: 'RUB',
        })
      } catch {}
    }
    if (response.link) {
      navigateTo(response.link, {
        external: true,
      })
    }
    if (response.action === 'success') {
      stage.value = 'thanks'
      invalidateOrders()
      invalidateBasket()
    } else {
      if (response.action === 'not found adres') {
        showNotDeliveringMessage.value = true
      }
      if (response.action === 'rest closed') {
        stage.value = 'rest_closed'
      }
      if (response.action === 'cant deliver') {
        stage.value = 'cant_deliver'
      }
    }
  })
})

useSwipe(dialogPanelEl, {
  onSwipeEnd(_, direction) {
    if (direction === 'right') {
      emit('close')
    }
  },
})
</script>
