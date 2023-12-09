<template>
  <div>
    <SimpleButton
      v-if="!props.hideButton && (count === 0 || props.alwaysButton)"
      class="h-full w-full rounded-xl text-[0.7rem] font-medium uppercase text-white lg:text-sm"
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
          class="h-full aspect-square rounded-full px-2 text-black flex items-center justify-center"
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
          class="h-full aspect-square rounded-full px-2 text-black flex items-center justify-center"
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
const props = defineProps<{
  dishId: number
  hideButton?: boolean
  alwaysButton?: boolean
}>()


const { mutate } = useAddToBasket()

const count = ref(0)

const addLocalCount = () => {
  count.value += 1
  if (count.value === 1) {
    addNewPosition()
  } else {
    updatePosition(count.value)
  }
}
const removeLocalCount = () => {
  count.value = Math.max(0, count.value - 1)
  updatePosition(count.value)
}

const updatePosition = _Debounce((count: number) => {
  if (dishInBasket.value) {
    mutate({
      id: dishInBasket.value.id,
      dish_id: dishInBasket.value.dish_id,
      count,
    })
  }
}, 500)

const addNewPosition = () => {
  mutate({
    dish_id: props.dishId,
    count: 1,
  })
}

const buttonAction = () => {
  if (props.alwaysButton) {
    addLocalCount()
  }
  else {
    addNewPosition()
  }
}

const { data: dishInBasket } = useBasket((v) => v.list.find((d) => d.dish_id === props.dishId))
watchEffect(() => {
  if (dishInBasket.value) {
    count.value = dishInBasket.value.count
  }
  else {
    count.value = 0
  }
})
</script>
