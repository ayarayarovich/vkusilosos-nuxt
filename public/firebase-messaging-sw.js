importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDI9FGAbA5e49lw2rKnF_ye8mbLLcgz4c0',
  authDomain: 'vkusilosos-28d37.firebaseapp.com',
  projectId: 'vkusilosos-28d37',
  storageBucket: 'vkusilosos-28d37.appspot.com',
  messagingSenderId: '863002177874',
  appId: '1:863002177874:web:6e17d3fa533dc0971d0a8b',
  measurementId: 'G-QGG1P5ZG27',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage(({ data }) => {
  console.log('[firebase-messaging-sw.js] Received background message ', data)
  // Customize notification here
  const notificationTitle = data['gcm.notification.x']
  const notificationOptions = {
    body: data['gcm.notification.y'],
    icon: '/icon-512x512.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
