import { ref } from "vue";
import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", () => {
  const reciptionWay = ref<"delivery" | "restaurant">("delivery");
  return { reciptionWay };
});
