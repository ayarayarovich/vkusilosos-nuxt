<template>
  <div class="flex h-full flex-col items-stretch">
    <div class="mx-8 mb-4 mt-10 flex items-center justify-between">
      <button
        class="flex items-center gap-2"
        @click="emit('go-back')"
      >
        <IconArrowRight class="size-8 rotate-180 md:hidden" />
        <h2 class="block text-xl font-medium leading-none">Бонусная система</h2>
      </button>
      <BonusCoins />
    </div>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <div class="relative my-2 h-0 grow">
      <div class="absolute top-0 z-10 h-8 w-full bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-whitegray to-transparent"></div>
      <div class="h-full overflow-y-scroll py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray">
        <div class="mx-8 flex flex-col items-stretch gap-4">
          <div class="rounded-xl bg-white shadow-main">
            <HeadlessDisclosure
              v-slot="{ open }"
              as="div"
            >
              <HeadlessDisclosureButton class="w-full px-6 py-4">
                <div class="flex items-center justify-between gap-8">
                  <span>Правила использования</span>
                  <IconArrowRight
                    class="h-6 invert transition-transform"
                    :class="{
                      'rotate-90': !open,
                      '-rotate-90': open,
                    }"
                  />
                </div>
              </HeadlessDisclosureButton>
              <HeadlessDisclosurePanel static>
                <div
                  class="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows]"
                  :class="{
                    '!grid-rows-[1fr]': open,
                  }"
                >
                  <div class="min-h-0">
                    <div class="article p-6 pt-0">
                      <p>
                        Бонусы начисляются пользователю в качестве меры поощрения активности и/или в качестве меры
                        компенсации в следующих случаях:
                      </p>
                      <ul>
                        <li>в качестве поощрения в случае проведения Исполнителем рекламных акций;</li>
                        <li>
                          в размере до 30% от стоимости Товаров, имеющих пометку в виде монеты при условии оплаты их без
                          использования бонусов и скидок пользователя.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </HeadlessDisclosurePanel>
            </HeadlessDisclosure>
          </div>

          <div class="rounded-xl bg-white shadow-main">
            <HeadlessDisclosure
              v-slot="{ open }"
              as="div"
            >
              <HeadlessDisclosureButton class="w-full px-6 py-4">
                <div class="flex items-center justify-between gap-8">
                  <span>Бонусная система</span>
                  <IconArrowRight
                    class="h-6 invert transition-transform"
                    :class="{
                      'rotate-90': !open,
                      '-rotate-90': open,
                    }"
                  />
                </div>
              </HeadlessDisclosureButton>
              <HeadlessDisclosurePanel static>
                <div
                  class="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows]"
                  :class="{
                    '!grid-rows-[1fr]': open,
                  }"
                >
                  <div class="min-h-0">
                    <div class="article p-6 pt-0">
                      <p>
                        Бонусная система — функциональность Приложения, предоставляющая пользователю возможность
                        получить Скидку на Товары и Услуги в размере и на условиях, указанных в приложении.
                      </p>
                    </div>
                  </div>
                </div>
              </HeadlessDisclosurePanel>
            </HeadlessDisclosure>
          </div>

          <div class="rounded-xl bg-white shadow-main">
            <HeadlessDisclosure
              v-slot="{ open }"
              as="div"
            >
              <HeadlessDisclosureButton class="w-full px-6 py-4">
                <div class="flex items-center justify-between gap-8">
                  <span>Срок хранения бонусов</span>
                  <IconArrowRight
                    class="h-6 invert transition-transform"
                    :class="{
                      'rotate-90': !open,
                      '-rotate-90': open,
                    }"
                  />
                </div>
              </HeadlessDisclosureButton>
              <HeadlessDisclosurePanel static>
                <div
                  class="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows]"
                  :class="{
                    '!grid-rows-[1fr]': open,
                  }"
                >
                  <div class="min-h-0">
                    <div class="p-6 pt-0">
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
                    </div>
                  </div>
                </div>
              </HeadlessDisclosurePanel>
            </HeadlessDisclosure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])
</script>
