<template>
  <div class="flex min-h-screen flex-col text-black">
    <AuthDialog />
    <Profile />
    <SetUserDataDialog />

    <DeliveryConditions
      :show="modalsState.delivery_conditions"
      @close="closeModal('delivery_conditions')"
    />
    <UserAgreement
      :show="modalsState.user_aggreement"
      @close="closeModal('user_aggreement')"
    />
    <PrivacyPolicy
      :show="modalsState.privacy_policy"
      @close="closeModal('privacy_policy')"
    />
    <PublicOffer
      :show="modalsState.public_offerta"
      @close="closeModal('public_offerta')"
    />

    <header
      id="header"
      class="sticky left-0 right-0 top-0 z-30 h-16 bg-white bg-opacity-30 shadow-main backdrop-blur-sm lg:h-20"
    >
      <!-- desktop -->
      <div class="container mx-auto hidden h-full px-4 lg:flex lg:items-center">
        <div class="flex flex-1 items-center justify-start gap-4">
          <button
            class="group relative inline-block aspect-square h-8"
            @click="profileDialogStore.open()"
          >
            <IconUserDark class="absolute left-0 top-0 h-full opacity-100 transition-opacity group-hover:opacity-0" />
            <IconUserColor class="absolute left-0 top-0 h-full opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <ClientOnly>
            <MyLocation v-if="userCredentials.isAuthenticated" />
          </ClientOnly>
        </div>

        <div class="flex shrink grow-0 justify-center">
          <NuxtLink to="/">
            <img
              src="/main-logo.svg"
              class="h-10"
              alt="ВкусиЛосось"
            />
          </NuxtLink>
        </div>

        <div class="flex flex-1 items-center justify-end gap-2">
          <ClientOnly>
            <Order v-if="userCredentials.isAuthenticated" />
          </ClientOnly>
          <!-- <BonusCoins v-if="userCredentials.isAuthenticated" /> -->
        </div>
      </div>

      <!-- mobile -->
      <div class="container mx-auto flex h-full items-center justify-between px-4 lg:hidden">
        <div class="flex shrink grow-0 justify-center">
          <NuxtLink to="/">
            <img
              src="/main-logo.svg"
              class="h-8"
              alt="ВкусиЛосось"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center justify-end gap-2">
          <ClientOnly>
            <Order v-if="userCredentials.isAuthenticated" />
          </ClientOnly>
          <!-- <BonusCoins v-if="userCredentials.isAuthenticated" /> -->
          <button
            class="group relative inline-block aspect-square h-8"
            @click="profileDialogStore.open()"
          >
            <IconUserDark class="absolute left-0 top-0 h-full opacity-100 transition-opacity group-hover:opacity-0" />
            <IconUserColor class="absolute left-0 top-0 h-full opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </header>

    <div class="flex-1 basis-0">
      <NuxtPage />
    </div>

    <footer>
      <!-- desktop -->
      <div class="hidden bg-white py-9 shadow-[0_0_35px_0_rgba(0,0,0,0.05)] lg:block">
        <div class="container mx-auto flex items-center gap-8">
          <img
            src="/main-logo.svg"
            class="h-14"
            alt="ВкусиЛосось"
          />
          <div class="flex flex-col items-start gap-2 text-sm font-normal uppercase">
            <NuxtLink to="/promo">АКЦИИ</NuxtLink>
            <button
              type="button"
              @click="openModal('delivery_conditions')"
            >
              УСЛОВИЯ ДОСТАВКИ
            </button>
            <NuxtLink to="/blog">БЛОГ</NuxtLink>
          </div>
          <div class="mr-auto flex flex-col items-start gap-2 text-sm font-normal uppercase">
            <LeaveFeedback />
            <WriteUs />
            <button
              class="uppercase"
              @click="profileDialogStore.open()"
            >
              ЛИЧНЫЙ КАБИНЕТ
            </button>
          </div>
          <div class="flex flex-col gap-2 text-sm font-normal">
            <a
              v-if="siteInfo?.phone"
              :href="`tel:${siteInfo.phone}`"
              class="flex items-center gap-2"
            >
              <IconPhoneCalling class="inline h-8" /> {{ formatPhone(siteInfo.phone) }}
            </a>
            <a
              v-if="siteInfo?.email"
              :href="`mailto:${siteInfo.email}`"
              class="flex items-center gap-2"
            >
              <IconMail class="inline h-8" /> {{ siteInfo.email }}
            </a>
          </div>
          <div
            v-if="[siteInfo?.youtube, siteInfo?.vk, siteInfo?.whatsapp, siteInfo?.viber].some((t) => !!t)"
            class="flex flex-col gap-4 text-sm font-normal uppercase"
          >
            <div>мы в соцсетях</div>
            <div class="flex items-center gap-4">
              <a
                v-if="siteInfo?.youtube"
                :href="siteInfo.youtube"
                target="_blank"
              >
                <IconYouTube class="h-8" />
              </a>
              <a
                v-if="siteInfo?.vk"
                :href="siteInfo.vk"
                target="_blank"
              >
                <IconVK class="h-8" />
              </a>
              <a
                v-if="siteInfo?.whatsapp"
                :href="siteInfo.whatsapp"
                target="_blank"
              >
                <IconWhatsApp class="h-8" />
              </a>
              <a
                v-if="siteInfo?.viber"
                :href="siteInfo.viber"
                target="_blank"
              >
                <IconViber class="h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- mobile -->
      <div class="bg-white py-5 shadow-[0_0_35px_0_rgba(0,0,0,0.05)] lg:hidden">
        <div class="container mx-auto flex justify-around gap-4 px-4">
          <div class="flex flex-col items-start justify-between gap-4">
            <img
              src="/main-logo.svg"
              class="h-8"
              alt="ВкусиЛосось"
            />
            <div class="flex flex-col gap-2 text-sm font-normal">
              <a
                v-if="siteInfo?.phone"
                :href="`tel:${siteInfo.phone}`"
                class="flex items-center gap-2"
              >
                <IconPhoneCalling class="inline h-4" /> {{ formatPhone(siteInfo.phone) }}
              </a>
              <a
                v-if="siteInfo?.email"
                :href="`mailto:${siteInfo.email}`"
                class="flex items-center gap-2"
              >
                <IconMail class="inline h-4" /> {{ siteInfo.email }}
              </a>
            </div>
            <div
              v-if="[siteInfo?.youtube, siteInfo?.vk, siteInfo?.whatsapp, siteInfo?.viber].some((t) => !!t)"
              class="flex flex-col gap-2 text-sm font-normal uppercase"
            >
              <div>мы в соцсетях</div>
              <div class="flex items-center gap-2">
                <a
                  v-if="siteInfo?.youtube"
                  :href="siteInfo.youtube"
                  target="_blank"
                >
                  <IconYouTube class="h-8" />
                </a>
                <a
                  v-if="siteInfo?.vk"
                  :href="siteInfo.vk"
                  target="_blank"
                >
                  <IconVK class="h-8" />
                </a>
                <a
                  v-if="siteInfo?.whatsapp"
                  :href="siteInfo.whatsapp"
                  target="_blank"
                >
                  <IconWhatsApp class="h-8" />
                </a>
                <a
                  v-if="siteInfo?.viber"
                  :href="siteInfo.viber"
                  target="_blank"
                >
                  <IconViber class="h-8" />
                </a>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-start justify-between gap-2 leading-none">
            <NuxtLink to="/promo">АКЦИИ</NuxtLink>
            <button
              type="button"
              @click="openModal('delivery_conditions')"
            >
              УСЛОВИЯ ДОСТАВКИ
            </button>
            <NuxtLink to="/blog">БЛОГ</NuxtLink>

            <LeaveFeedback />
            <WriteUs />
            <button
              class="uppercase"
              @click="profileDialogStore.open()"
            >
              ЛИЧНЫЙ КАБИНЕТ
            </button>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-orange-200 to-orange-600 py-5">
        <div
          class="container mx-auto flex flex-col items-center gap-2 text-xs font-medium text-white lg:flex-row lg:gap-8"
        >
          <span>&copy; 2023 «ВкусиЛосось». Все права защищены.</span>
          <a
            class="lg:mr-auto"
            href="https://впереди.рф/"
            >Разработано агентством Впереди</a
          >
          <button
            type="button"
            @click="openModal('public_offerta')"
          >
            Публичная оферта
          </button>
          <button
            type="button"
            @click="openModal('user_aggreement')"
          >
            Пользовательское соглашение
          </button>
          <button
            type="button"
            @click="openModal('privacy_policy')"
          >
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useProfileDialogStore } from '~/store/profileDialog'
import { formatPhone } from '~/utils'
import { useSetDataDialog } from '~/store/setDataDialog'
import { useAuthDialogStore } from '~/store/authDialog'

const router = useRouter()

const modalsState = computed(() => ({
  delivery_conditions: 'delivery_conditions' in router.currentRoute.value.query,
  user_aggreement: 'user_aggreement' in router.currentRoute.value.query,
  privacy_policy: 'privacy_policy' in router.currentRoute.value.query,
  public_offerta: 'public_offerta' in router.currentRoute.value.query,
}))
const openModal = (key: string) => {
  router.push({
    query: {
      [key]: 'show',
    },
  })
}
const closeModal = (key: string) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      [key]: undefined,
    },
  })
}

const profileDialogStore = useProfileDialogStore()

const { userCredentials } = useUserCredentials()
const setDataDialogStore = useSetDataDialog()
const authDialogStore = useAuthDialogStore()

const { data: user } = useUser((v) => v as any)
watch(
  [user, userCredentials],
  () => {
    if (userCredentials.value.isAuthenticated) {
      authDialogStore.close()
      if (user.value?.action === 'set data') {
        setDataDialogStore.open()
      }
    }
  },
  {
    immediate: true,
  }
)

const { data: siteInfo, suspense } = useSiteInfo((v) => v)

onServerPrefetch(async () => {
  await suspense()
})
</script>
