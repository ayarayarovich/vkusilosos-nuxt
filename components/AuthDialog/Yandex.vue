<template>
  <button
    type="button"
    class="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#FC3F1D] px-8 py-3 text-sm font-bold uppercase text-[#FC3F1D]"
    @click="redirect"
  >
    <IconYandex class="h-4" /> Войти по яндекс ID
  </button>
</template>

<script setup lang="ts">
const publicAxios = usePublicAxiosInstance()
const redirect = () => {
  publicAxios.get<{ link: string }>('auth/yandex').then((r) => {
    navigateTo(r.data.link, {
      external: true,
    })
  })
}
</script>