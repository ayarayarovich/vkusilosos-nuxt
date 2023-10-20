import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Dish } from "~/interfaces/dishes";

export const useCartStore = defineStore("cart", () => {
  const items = ref<Dish[]>([]);

  const itemsCount = computed(() => items.value.length);
  const totalCost = computed(() =>
    items.value.reduce((acc, curr) => acc + curr.newPrice, 0),
  );
  const dishes = computed<Dish[]>(() =>
    Object.values(
      // eslint-disable-next-line no-sequences
      items.value.reduce((c, dish) => ((c[dish.id] = dish), c), {} as any),
    ),
  );
  const dishesCount = computed<{ [key: string]: number }>(() =>
    items.value.reduce(
      // eslint-disable-next-line no-sequences
      (c, { id }) => ((c[id] = (c[id] || 0) + 1), c),
      {} as any,
    ),
  );

  function addDish(dish: Dish) {
    items.value.push(dish);
  }

  function removeAll(dishID: Dish["id"]) {
    items.value = items.value.filter((dish) => dish.id !== dishID);
  }

  function removeOne(dishID: Dish["id"]) {
    const index = items.value.findIndex((dish) => dish.id === dishID);
    if (index !== -1) items.value.splice(index, 1);
  }

  return {
    products: items,
    itemsCount,
    totalCost,
    dishesCount,
    dishes,
    addDish,
    removeAll,
    removeOne,
  };
});
