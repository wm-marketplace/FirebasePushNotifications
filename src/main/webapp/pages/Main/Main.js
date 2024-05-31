/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/*
 * This function will be invoked when any of this prefab's property is changed
 * @key: property name
 * @newVal: new value of the property
 * @oldVal: old value of the property
 */
let url = window.location.pathname;
let path = 'app/prefabs/Firebase_push_notifications/resources/firebase-dependencies/';
let swPath = url + path + 'firebase-messaging-sw.js';
let pushScope = url + path + 'firebase-cloud-messaging-push-scope';
let firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

Prefab.onPropertyChange = function(key, newVal, oldVal) {


};

Prefab.onReady = function() {
    firebaseConfig.apiKey = Prefab.apikey;
    firebaseConfig.authDomain = Prefab.authdomain;
    firebaseConfig.projectId = Prefab.projectid;
    firebaseConfig.storageBucket = Prefab.storagebucket;
    firebaseConfig.messagingSenderId = Prefab.messagingsenderid;
    firebaseConfig.appId = Prefab.appid;
    // this method will be triggered post initialization of the prefab.
    if (Prefab.appkey && firebaseConfig) {
        requestPermission();
    }
};

function registerServiceWorker() {
    const firebaseApp = firebase.initializeApp(firebaseConfig);

    navigator.serviceWorker
        .register(swPath, {
            scope: pushScope
        })
        .then((registration) => {
            console.info("Registration successful, scope is:", registration.scope);
            registration.active.postMessage({
                type: 'config',
                data: firebaseConfig //Prefab.firebaseconfig
            });
            const messaging = firebase.messaging();
            getToken();
            receiveMessage();

        })
        .catch(function(err) {
            if (err) {
                registerServiceWorker();
            }
        });

}

function requestPermission() {
    // [START messaging_request_permission]
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.info("Notification permission granted.");
            //Retrieve a registration token for use with FCM.
            registerServiceWorker();
        } else {
            console.warn("Unable to get permission to notify.");
        }
    });
    // [END messaging_request_permission]
}

function getToken() {
    const messaging = firebase.messaging();
    messaging
        .getToken(messaging, {
            vapidKey: Prefab.appkey,
        })
        .then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                Prefab.firebasetoken = currentToken;
            } else {
                // Show permission request UI
                console.info(
                    "No registration token available. Request permission to generate one."
                );
            }
        })
        .catch((err) => {
            console.error("An error occurred while retrieving token. ", err);
        });
}

function receiveMessage() {
    const messaging = firebase.messaging();
    // [START messaging_receive_message]
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.onBackgroundMessage` handler.
    messaging.onMessage((payload) => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.image,
        };
        const notification = new Notification(notificationTitle, notificationOptions)
        console.info("Message received. ", payload);
    });
    // [END messaging_receive_message]
}

Prefab.buttonGenerateTokenClick = function($event, widget) {
    if (Prefab.appkey && firebaseConfig) {
        requestPermission()
    } else {
        alert('Please provide all in-bound properties to the prefab');
    }
};
