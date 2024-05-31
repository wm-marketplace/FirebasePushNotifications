importScripts(
    "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-app-compat.min.js"
);
importScripts(
    "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-messaging-compat.min.js"
);

self.addEventListener('message', (event) => {
    if (event.data.type === 'config') {
        const firebaseConfig = event.data.data;
        firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
        messaging.onBackgroundMessage((payload) => {
            console.info("[firebase-messaging-sw.js] Received background message ", payload);
        });
    }
});
