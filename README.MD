#   **DOCUMENTACIÓN DEL PROYECTO CARGAYA APP **

# 📦 Instalación:
1. npm i

# 🏃 Run (Local)
** version jdk 1.8
1. npm install -g ionic
2. npm install - g cordova
3. brew install gradle


- Android:   npm run android
- Navegador: npm start
              http://localhost:8100/ionic-lab
#    Comandos Git
- GIT Rep: https://gitlab.com/cargaya_dev/app_conductor.git
- git add -A .; git commit -am "__ : ____"; git push origin ___;
- git add -A .
- git commit -am "rama: descripción"
- git push origin rama

## Icon Launcher (Android)

add to Manifest.xml

android:icon="@mipmap/ic_launcher"
android:roundIcon="@mipmap/ic_launcher_round

# Compilacion apk:
0. ionic cordova platform add android
- - Android Studio
-> Clean
-> Build
-> Generate APK (v1 v2)
name file : cargaya.jks
password keystore: cargaya2017
alias: cargayaexpress
key password: cargaya2017

# Build from Ionic/Cordova CLI
ionic cordova build android --prod
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cargaya.jks app-release-unsigned.apk cargayaexpress
```

```
~/Library/Android/sdk/build-tools/26.0.3/zipalign -v 4 app-release-unsigned.apk cargaya.apk
```

# Google Store:
Usuario servicliente@cargaya.com
Clave Servicomex2019-

# Accesos
 * User:   14989044
 * Pass:   14989044

## Add android icon to Manifest

```
android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round"
```

## roadMap

* ~~pushNotification View byId~~
* pushNotification icon
* ~~show offer minor 6~~
* ~~show pdf major 7~~

si al asignar la oferta se le coloca valor del anticipo precargue,


orden de cargue enviada.
->

# Despliegues:
* Producción:
  - https://cargaya.live
* Pruebas:
  - https://api.cargaya.net



