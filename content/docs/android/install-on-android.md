---
title: Install on Android
description: Download the APK, get past the "unknown app" and Play Protect prompts, and set up PlayzAnime on your phone.
section: Android
order: 1
badge: New
---

# Install on Android

PlayzAnime for Android runs on Android 7 and newer, on phones, tablets and foldables. There is one APK for every device (the "universal" build), about 64 MB.

> **Right now the Android app is my most up-to-date version.** It gets new features first and handles extensions reasonably well, but it still has issues. I'm looking for people to help me with it: if something breaks, please [open an issue](https://github.com/PlayzAe/playz_anime_app/issues) or a [pull request](https://github.com/PlayzAe/playz_anime_app/pulls).

## Download

1. Open the [latest release](https://github.com/PlayzAe/playz_anime_app/releases/latest) on your phone.
2. Tap **PlayzAnime-…-universal.apk** under *Assets*.
3. When the download finishes, tap it to install.

## "Install unknown apps"

PlayzAnime isn't on the Play Store, so Android asks once whether your browser may install apps. Tap **Settings**, switch on **Allow from this source**, then go back and tap **Install**.

## Play Protect

Play Protect may say it doesn't recognise the app. That's because it isn't from the Play Store, not because something is wrong with it. Tap **More details → Install anyway**. Every PlayzAnime build is signed with the same key, so updates install over the top without the warning getting worse.

## First launch

A short setup runs once:

![Setup: your name and accent colour](/screenshots/mobile/setup.webp "phone")
![Setup: permissions, asked one at a time](/screenshots/mobile/permissions.webp "phone")

- **Your name and colour.** The accent you pick colours the app, the logo and the home-screen icon.
- **Permissions.** *Files* lets downloads go to any folder you pick; *Notifications* shows download progress and the play/pause controls. Android asks you directly, and you can change both later in **Settings → Permissions**.
- **Folders.** You choose where anime goes and where manga goes. Nothing is picked for you.

If you installed PlayzAnime before, setup finds the `playzanime-settings.ini` it left in your downloads folder and offers to restore your accent, player and reader choices.

## Updating

Download the new APK and install it over the old one. Your list, history, downloads and extensions stay.

## Uninstalling

Android asks whether to **keep app data**. Keep it if you plan to come back. Downloaded episodes and chapters live in your own folders and are never deleted by uninstalling.
