<template>
  <div class="flex min-h-screen flex-col text-black">
    <header
      id="header"
      class="sticky left-0 right-0 top-0 z-40 bg-white bg-opacity-30 py-2 shadow-main backdrop-blur-sm lg:py-4"
    >
      <!-- mobile -->
      <div
        class="container mx-auto flex items-center justify-between px-4 lg:hidden"
      >
        <div class="flex shrink grow-0 justify-center">
          <RouterLink to="/">
            <img src="/main-logo.svg" class="h-8" />
          </RouterLink>
        </div>

        <div class="flex items-center justify-end gap-2">
          <OrderCart />
          <BonusCoins />
          <Auth />
        </div>
      </div>

      <!-- desktop -->
      <div class="container mx-auto hidden px-4 lg:flex lg:items-center">
        <div class="flex flex-1 items-center justify-start gap-4">
          <Profile v-if="isAuthenticated" />
          <Auth v-else />
          <MyLocation />
        </div>

        <div class="flex shrink grow-0 justify-center">
          <RouterLink to="/">
            <img src="/main-logo.svg" class="h-10" />
          </RouterLink>
        </div>

        <div class="flex flex-1 items-center justify-end gap-2">
          <OrderCart />
          <BonusCoins />
        </div>
      </div>
    </header>

    <div class="flex-1 basis-0">
      <RouterView />
    </div>

    <footer>
      <!-- mobile -->
      <div class="bg-white py-5 shadow-[0_0_35px_0_rgba(0,0,0,0.05)] lg:hidden">
        <div class="container mx-auto flex justify-around gap-4 px-4">
          <div class="flex flex-col items-start justify-between gap-4">
            <img src="/main-logo.svg" class="h-8" />
            <div class="flex flex-col gap-2 text-sm font-normal">
              <a href="tel:+74951472999" class="flex items-center gap-2">
                <IconPhoneCalling class="inline h-4" /> +7 (495) 147 - 29 - 99
              </a>
              <a
                href="mailto:vkusilosos@gmail.com"
                class="flex items-center gap-2"
              >
                <IconMail class="inline h-4" /> vkusilosos@gmail.com
              </a>
            </div>
            <div class="flex flex-col gap-2 text-sm font-normal uppercase">
              <div>мы в соцсетях</div>
              <div class="flex items-center gap-2">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  ><IconYouTube class="h-8"
                /></a>
                <a href="#"><IconVK class="h-8" /></a>
                <a href="#"><IconWhatsApp class="h-8" /></a>
                <a href="#"><IconViber class="h-8" /></a>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-between gap-2 leading-none">
            <RouterLink to="/promo">АКЦИИ</RouterLink>
            <RouterLink to="/delivery">УСЛОВИЯ ДОСТАВКИ</RouterLink>
            <RouterLink to="/payment">СПОСОБ ОПЛАТЫ</RouterLink>
            <LeaveFeedback />
            <WriteUs />
            <RouterLink to="/profile">ЛИЧНЫЙ КАБИНЕТ</RouterLink>
          </div>
        </div>
      </div>

      <!-- desktop -->
      <div
        class="hidden bg-white py-9 shadow-[0_0_35px_0_rgba(0,0,0,0.05)] lg:block"
      >
        <div class="container mx-auto flex items-center gap-8">
          <img src="/main-logo.svg" class="h-14" />
          <div class="flex flex-col gap-2 text-sm font-normal uppercase">
            <RouterLink to="/promo">АКЦИИ</RouterLink>
            <RouterLink to="/delivery">УСЛОВИЯ ДОСТАВКИ</RouterLink>
            <RouterLink to="/payment">СПОСОБ ОПЛАТЫ</RouterLink>
          </div>
          <div
            class="mr-auto flex flex-col gap-2 text-sm font-normal uppercase"
          >
            <LeaveFeedback />
            <WriteUs />
            <RouterLink to="/profile">ЛИЧНЫЙ КАБИНЕТ</RouterLink>
          </div>
          <div class="flex flex-col gap-2 text-sm font-normal">
            <a href="tel:+74951472999" class="flex items-center gap-2"
              ><IconPhoneCalling class="inline h-8" /> +7 (495) 147 - 29 - 99</a
            >
            <a
              href="mailto:vkusilosos@gmail.com"
              class="flex items-center gap-2"
              ><IconMail class="inline h-8" /> vkusilosos@gmail.com</a
            >
          </div>
          <div class="flex flex-col gap-4 text-sm font-normal uppercase">
            <div>мы в соцсетях</div>
            <div class="flex items-center gap-4">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                ><IconYouTube class="h-8"
              /></a>
              <a href="#"><IconVK class="h-8" /></a>
              <a href="#"><IconWhatsApp class="h-8" /></a>
              <a href="#"><IconViber class="h-8" /></a>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-orange-200 to-orange-600 py-5">
        <div
          class="container mx-auto flex flex-col items-center gap-2 text-xs font-medium text-white lg:flex-row lg:gap-8"
        >
          <span class="lg:mr-auto"
            >&copy; 2023 «ВкусиЛосось». Все права защищены.</span
          >
          <a href="#">Публичная оферта</a>
          <a href="#">Пользовательское соглашение</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
</script>
