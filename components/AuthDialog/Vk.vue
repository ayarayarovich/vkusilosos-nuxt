<template>
  <button
  type="button"
        class="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#6B78EE] px-8 py-3 text-sm font-bold uppercase text-[#6B78EE]"
        @click="redirect"
      >
        <IconVKBlue class="h-3" /> Войти через вконтакте
      </button>
</template>

<script setup lang="ts">
const publicAxios = usePublicAxiosInstance()
const redirect = () => {
  publicAxios.get<{ link: string }>('auth/vk').then((r) => {
    navigateTo(r.data.link, {
      external: true,
    })
  })
}
</script>