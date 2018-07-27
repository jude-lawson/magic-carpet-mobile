# Magic Carpet (Mobile Frontend)

This repo contains the mobile version of the Magic Carpet app interface that is designed to utilize the Rails API backend.

This repo is setup to use the Expo tool for demoing the application on mobile devices.

_Please note that this app has the potential to actually call ride share services and should be used in production with due caution in order to avoid incurring fees for which the user is olely responsible for._

## Installation & Setup

Clone down the repo:

```shell
git clone git@github.com:jude-lawson/magic-carpet-mobile.git MagicCarpet
```

Install necessary dependencies:

```shell
yarn install
```

-or-

```shell
npm install
```
Install the necesary cli tools for Expo:

```shell
yarn global add expo-cli
```

[Install the Expo Client app on your mobile device](https://docs.expo.io/versions/v29.0.0/introduction/installation#mobile-client-expo-for-ios-and-android)

Run expo packager (the necessary files will be installed the first time):

```shell
expo start
```

Open the Expo Client on your phone and either select the app if it appears in the dashboard, scan the QR code in your terminal, or access the provided URL on your phone.

For more information on running the app, please check out [the Expo documentation](https://docs.expo.io/versions/v29.0.0/workflow/up-and-running#open-the-app-on-your-phone-or).

You should be good to go!



