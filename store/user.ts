import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userID = ref<string>();
  const userPhone = ref<string>();

  const accessToken = ref<string>();
  const refreshToken = ref<string>();

  const isAuthenticated = ref(true);

  return { userID, userPhone, accessToken, refreshToken, isAuthenticated };
});
