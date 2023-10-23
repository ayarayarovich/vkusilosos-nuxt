import { defu } from "defu";
import { useUserStore } from "~/store/user";

export function useAPI(key: string, url: string, options: any = {}) {
  return useAsyncData(key, async () => {
    const pinia = usePinia();
    const userStore = useUserStore(pinia);

    const defaults = {
      baseURL: "https://api.losos.ayarayarovich.tech",
    };

    const params = defu(defaults, options) as any;

    const response = await $fetch(url, params);
    console.log(response);
  });
}
