import { defineNuxtPlugin } from 'nuxt/app'
import { getMessaging, getToken } from 'firebase/messaging'

export default defineNuxtPlugin(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('firebase-messaging-sw.js')
      .then((reg) => {
        console.log(`Service Worker Registration (Scope: ${reg.scope})`)
      })
      .catch((error) => {
        const msg = `Service Worker Error (${error})`
        console.error(msg)
      })
  } else {
    // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
    console.warn('Service Worker not available')
  }

  const firebaseApp = useFirebaseApp()
  const messaging = getMessaging(firebaseApp)

  // messaging.onMessage((payload) => {
  //   console.log('Message received. ', payload);
  // });

  const token = useState<string | undefined>('fbToken')

  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      getToken(messaging)
        .then((currentToken) => {
          if (currentToken) {
            token.value = currentToken
          } else {
            console.log('No registration token available. Request permission to generate one.')
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
        })
    }
  })
})
