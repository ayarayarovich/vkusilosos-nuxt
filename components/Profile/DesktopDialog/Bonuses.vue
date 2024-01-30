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
        <div class="mx-8 mb-8 flex justify-end">
          <div class="flex items-center gap-2 rounded-xl bg-white p-4 text-red shadow-main">
            <IconDangerTriangle class="h-6" /> 23.10.23 сгорит 35 бонуса
          </div>
        </div>

        <div class="mx-8 flex flex-col items-stretch gap-4">
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
                    <div class="p-6 pt-0">
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
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
                    <div class="p-6 pt-0">
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
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

          <div class="rounded-xl bg-white shadow-main">
            <HeadlessDisclosure
              v-slot="{ open }"
              as="div"
            >
              <HeadlessDisclosureButton class="w-full px-6 py-4">
                <div class="flex items-center justify-between gap-8">
                  <span>Сгорание бонусов</span>
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
                      <p>
                        Если в течение 6 месяцев со дня последней покупки по карте клиент больше не производил расходные
                        операции, пропадают все бонусы.
                      </p>
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
