---
title: Updating and uninstalling
description: How to move to a new version of PlayzAnime and how to remove it, with or without your data.
section: Getting started
order: 5
---

# Updating and uninstalling

## Check your version

Open **Settings** and scroll to **About**. It shows the version, for example `PlayzAnime 0.1.0`.

## Update

PlayzAnime doesn't update itself. When a new version is out, download it from [github.com/PlayzAe](https://github.com/PlayzAe).

**Installer:** run the new `PlayzAnime-Setup-<version>.exe`. It replaces the old version. Your settings, lists, history, profile and downloads stay where they are.

**Portable:** close PlayzAnime, then put the new `PlayzAnime-Portable-<version>.exe` in the same folder as the old one and delete the old exe. The new version finds the `PlayzAnime Data` folder beside it and carries on.

> [!IMPORTANT]
> If downloads are running, let them finish or quit PlayzAnime first. PlayzAnime asks before closing with downloads running, and unfinished ones can be resumed later. See [Resume and errors](/docs/downloads/resume-and-errors).

## Uninstall the installed app

1. Open Windows **Settings**, then **Apps**, then **Installed apps**.
2. Find **PlayzAnime**, open its menu, and choose **Uninstall**.

The uninstaller removes the app and its shortcuts. It deliberately leaves two things behind:

- **Your data** in `%APPDATA%\PlayzAnime` (settings, lists, history, profile, friends' profiles). Reinstalling picks it all up again.
- **Your downloads** in your anime and manga folders.

To remove everything, also delete:

- `%APPDATA%\PlayzAnime` (paste it into File Explorer's address bar)
- Your download folders, by default `Desktop\PlayzAnime` and `Desktop\PlayzManga`

## Remove the portable app

Close PlayzAnime and delete the exe and the `PlayzAnime Data` folder next to it. Delete your download folders too if you don't want the files.

## Controlled folder access after uninstalling

If you allowed PlayzAnime through Windows Controlled folder access, the entry stays in Windows' allow list. You can remove it under **Windows Security**, **Virus & threat protection**, **Ransomware protection**, **Allow an app through Controlled folder access**.
