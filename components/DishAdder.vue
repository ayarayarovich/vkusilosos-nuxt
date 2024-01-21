<template>
  <div>
    <MyLocationDialog
      :show="showLocationDialog"
      @close="closeLocationDialog"
    />

    <SimpleButton
      v-if="!props.hideButton && (count === 0 || props.alwaysButton)"
      class="h-full w-full rounded-xl text-[0.7rem] font-medium uppercase text-white lg:text-sm"
      type="button"
      @click="buttonAction()"
    >
      <slot> В корзину </slot>
    </SimpleButton>
    <div
      v-else
      class="accent-gradient-bg h-full w-full overflow-hidden rounded-xl"
    >
      <div
        class="outer-bg-color flex h-full w-full items-center justify-center rounded-xl border-2 border-transparent bg-clip-padding"
      >
        <button
          type="button"
          class="flex aspect-square h-full items-center justify-center rounded-full px-2 text-black"
          @click.stop="removeLocalCount()"
        >
          <img
            class="aspect-square h-2"
            src="~/assets/minus.svg"
            alt=""
          />
        </button>
        <span class="mx-1 inline-block min-w-[2ch] text-center text-black lg:mx-2">{{ count }}</span>
        <button
          type="button"
          class="flex aspect-square h-full items-center justify-center rounded-full px-2 text-black"
          @click.stop="addLocalCount()"
        >
          <img
            class="aspect-square h-2"
            src="~/assets/plus.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthDialogStore } from '~/store/authDialog'
import { useUserCredentials } from '~/composables/api/user'

const props = defineProps<{
  dishId: number
  hideButton?: boolean
  alwaysButton?: boolean
}>()

const { userCredentials } = useUserCredentials()
const { data: receptionWay } = useCurrentReceptionWay()
const authDialogStore = useAuthDialogStore()
const { mutate } = useAddToBasket()

const showLocationDialog = ref(false)
const openLocationDialog = () => {
  showLocationDialog.value = true
}
const closeLocationDialog = () => {
  showLocationDialog.value = false
}

const count = ref(0)

const addLocalCount = () => {
  if (!userCredentials.value.isAuthenticated) {
    authDialogStore.open()
    return
  }

  if (!receptionWay.value) {
    openLocationDialog()
    return
  }

  count.value += 1
  if (count.value === 1) {
    addNewPosition()
  } else {
    updatePosition(count.value)
  }
}
const removeLocalCount = () => {
  if (!userCredentials.value.isAuthenticated) {
    authDialogStore.open()
    return
  }

  if (!receptionWay.value) {
    openLocationDialog()
    return
  }

  count.value = Math.max(0, count.value - 1)
  updatePosition(count.value)
}

const updatePosition = useDebounceFn((count: number) => {
  if (dishInBasket.value) {
    mutate({
      id: dishInBasket.value.id,
      dish_id: dishInBasket.value.dish_id,
      count,
    })
  }
}, 1000)

const addNewPosition = () => {
  if (!userCredentials.value.isAuthenticated) {
    authDialogStore.open()
    return
  }

  if (!receptionWay.value) {
    openLocationDialog()
    return
  }

  mutate({
    dish_id: props.dishId,
    count: 1,
  })
}

const buttonAction = () => {
  if (props.alwaysButton) {
    addLocalCount()
  } else {
    addNewPosition()
  }
}

const { data: dishInBasket } = useBasket((v) => v.list.find((d) => d.dish_id === props.dishId))
watchEffect(() => {
  if (dishInBasket.value) {
    count.value = dishInBasket.value.count
  } else {
    count.value = 0
  }
})

watchEffect(() => {
  if (!userCredentials.value.isAuthenticated) {
    count.value = 0
  }
})
</script>
