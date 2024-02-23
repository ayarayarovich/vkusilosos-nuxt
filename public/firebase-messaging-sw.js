importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCzKrxX3WMvl4voOfbeCLdx4W6v4KK2pEs',
  authDomain: 'vkusilosos-c3bbf.firebaseapp.com',
  projectId: 'vkusilosos-c3bbf',
  storageBucket: 'vkusilosos-c3bbf.appspot.com',
  messagingSenderId: '799735561746',
  appId: '1:799735561746:web:8e3b229c6d16b7c5dba2cb',
  measurementId: 'G-NFEGSK0DMV',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(({data}) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = data['gcm.notification.x'];
  const notificationOptions = {
    body: data['gcm.notification.y'],
    icon: '/icon-512x512.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});