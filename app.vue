<template>
  <NuxtLayout>
    <noscript>
      <div>
        <img
          src="https://mc.yandex.ru/watch/94201196"
          style="position: absolute; left: -9999px"
          alt=""
        />
      </div>
    </noscript>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'vue-toastification/dist/index.css'

useHead({
  title: 'ВкусиЛосось',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [
    {
      children: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(94201196, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });`,
    },
  ],
})
</script>

<style>

.Vue-Toastification__toast {
  padding: 0 !important;
  min-height: 0 !important;
}

</style>
