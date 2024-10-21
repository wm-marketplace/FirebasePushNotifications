# fcm-web-notifications

Prefab is used to register the device and it acts as consumer of web notifications using Firebase Cloud Messaging.

# Firebase Cloud Messaging

Firebase Cloud Messaging (FCM) is a cross-platform messaging solution that lets you reliably send messages at no cost.

Using FCM, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement and retention.

# Prerequistes

1.  Login to [Firebase console](https://console.firebase.google.com) and Create a project.
2.  Once the project has been created , Add a Web app to your project by selecting the respective icon as shown in the image below.
    ![sample](https://github.com/wm-marketplace/FirebasePushNotifications/assets/create_a_webapp.png)
3.  After the app is created, Please navigate to Project settings -> General -> Webapps -> Select your app -> Config -> Copy the **config**.
4.  Next step would be to get Web push Certificate from Project settings -> Cloud Messaging -> Web Configuration -> Web Push Certificates -> Show private key -> Copy the **key**.(**If private key is not present** => Click on Generate key pair).

# Using the Prefab

1. Download this project as a zip file and import in WMO.
2. Publish the prefab to your project.
3. Drag and drop the prefab on the required page.
4. Bind the input properties of the prefab with the values copied above.

   | Input Property         | Value to be binded  |
   | ---------------------- | ------------------- |
   | App Key                | **key**             |
   | Firebase Configuration | **from the config** |

5. Preview the app.
6. User will be asked to allow notifications, once allowed the firebase app will be initialised and device token will generated.
7. The generated token will be an out-bound property of the prefab, which can be accessed using **Page.Widgets.<Prefab_name>.firebasetoken**.
