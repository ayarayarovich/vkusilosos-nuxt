<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'vue-toastification/dist/index.css'
import 'tippy.js/animations/scale.css'

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
// script: [
// {
//   children: `
//   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
// m[i].l=1*new Date();
// for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
// k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
// (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

// ym(94201196, "init", {
//     clickmap:true,
//     trackLinks:true,
//     accurateTrackBounce:true,
//     webvisor:true,
//     ecommerce:"dataLayer"
// });`,
// },
// {
//   children: `
//     var _tmr = window._tmr || (window._tmr = []);
//     _tmr.push({id: "3503086", type: "pageView", start: (new Date()).getTime()});
//     (function (d, w, id) {
//       if (d.getElementById(id)) return;
//       var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
//       ts.src = "https://top-fwz1.mail.ru/js/code.js";
//       var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
//       if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
//     })(document, window, "tmr-code");
//   `,
// },
// ],
// noscript: [
// {
//   innerHTML:
//     '<div><img src="https://mc.yandex.ru/watch/94201196" style="position:absolute; left:-9999px;" alt="" /></div>',
// },
// {
//   innerHTML:
//     '<div><img src="https://top-fwz1.mail.ru/counter?id=3503086;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>',
// },
// ],
})
</script>

<style>
.Vue-Toastification__toast {
  padding: 0 !important;
  min-height: 0 !important;
}
</style>
