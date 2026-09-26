---
title: Install on Windows
description: Choose between the installer and the portable exe, install PlayzAnime, and get past the SmartScreen warning.
section: Getting started
order: 2
---

# Install on Windows

PlayzAnime runs on Windows 10 and Windows 11, 64-bit. Downloads are linked from [github.com/PlayzAe](https://github.com/PlayzAe) until the project has its own download page.

## Installer or portable?

There are two files. Pick one.

| | Installer | Portable |
|---|---|---|
| File | `PlayzAnime-Setup-<version>.exe` | `PlayzAnime-Portable-<version>.exe` |
| Installs | Yes, with an uninstaller | No, it's one file you run |
| Shortcuts | Desktop and Start menu | None |
| Settings and history | `%APPDATA%\PlayzAnime` | A `PlayzAnime Data` folder next to the exe |
| Double-click a `.playzanime` file to import it | Yes | No (drag it onto the window instead) |
| Good for | Everyday use | USB sticks, trying it out, PCs where you can't install |

For example, version 0.1.0 is `PlayzAnime-Setup-0.1.0.exe` or `PlayzAnime-Portable-0.1.0.exe`.

> [!NOTE]
> The installer is about 100 MB. One more thing is fetched later: the first time you download an episode, PlayzAnime fetches ffmpeg (about 80 MB) once, checks it against a known checksum, and keeps it. It's only needed for episode downloads, so it isn't bundled.

## Use the installer

1. Run `PlayzAnime-Setup-<version>.exe`.
2. If Windows shows **Windows protected your PC**, choose **More info**, then **Run anyway**. See [SmartScreen](#smartscreen) below.
3. Choose who to install for. **Only for me** is the default and doesn't need admin rights.
4. Keep the suggested folder or pick another one. A per-user install goes to `%LOCALAPPDATA%\Programs\PlayzAnime` by default, for example `C:\Users\Sam\AppData\Local\Programs\PlayzAnime`.
5. Finish. PlayzAnime starts straight away, and you'll find it on the desktop and in the Start menu.

The installer also tells Windows that `.playzanime` files belong to PlayzAnime, so double-clicking a friend's profile opens it.

## Use the portable exe

1. Put `PlayzAnime-Portable-<version>.exe` in a folder of its own, for example `D:\Apps\PlayzAnime\`.
2. Double-click it. Get past SmartScreen the same way as above.

The first run creates `PlayzAnime Data` in the same folder. That folder holds your settings, lists, history and profile, so keep it with the exe if you move it.

> [!TIP]
> Your downloads don't go into `PlayzAnime Data`. They go to `Desktop\PlayzAnime` and `Desktop\PlayzManga` like the installed app. If you carry the portable app on a USB stick and want downloads to travel with it, pick folders on the stick. See [Folders and file names](/docs/downloads/folders-and-naming).

## SmartScreen

PlayzAnime isn't code-signed yet, so Windows doesn't recognise the publisher. The first time you run the installer or the portable exe, Windows may show **Windows protected your PC**.

1. Choose **More info**.
2. Check that the app name is the file you downloaded.
3. Choose **Run anyway**.

Your browser may also flag the download because the file isn't commonly downloaded. If you got it from the official link, keep the file.

> [!WARNING]
> Only download PlayzAnime from the link on [github.com/PlayzAe](https://github.com/PlayzAe). A copy from anywhere else could be modified.

## Next

Read what happens on [first launch](/docs/getting-started/first-launch).
