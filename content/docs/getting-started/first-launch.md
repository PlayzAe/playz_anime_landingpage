---
title: First launch
description: What the one-time setup does, what it asks you, and how to set up your profile.
section: Getting started
order: 3
---

# First launch

Every launch opens with a short animation of the PlayzAnime seal. The very first launch follows it with a one-time setup. It usually takes under a minute and never shows again.

![First launch: one-time setup](/screenshots/setup.png)

## 1. Getting things ready

Setup runs three steps and shows each one as it finishes:

1. **Making your PlayzAnime and PlayzManga folders.** It creates `Desktop\PlayzAnime` for episodes and `Desktop\PlayzManga` for chapters, and writes a test file to prove they work.
2. **Checking Windows folder protection.** It checks whether Windows Defender's Controlled folder access is on.
3. **Fetching this season's catalogue.** It loads the anime and manga home pages so they're ready when setup ends.

A step that can't finish shows a warning under it instead of stopping setup:

| Note | What it means |
|---|---|
| Using your Downloads folder for now | The Desktop folder couldn't be written to, so downloads go to `Downloads\PlayzAnime` and `Downloads\PlayzManga` instead. |
| Controlled folder access is on | Windows is guarding your Desktop. The next screen offers a fix. |
| Audit mode only: nothing is blocked | Controlled folder access only logs. Nothing to do. |
| You're offline. It loads when you reconnect. | No internet right now. The catalogue loads later. |
| Slow connection. It will finish in the background. | The catalogue took more than 25 seconds. Setup moves on without waiting. |

## 2. Windows folder protection (only if needed)

If Controlled folder access blocked your folders, setup shows **Windows is guarding your Desktop** with the folders it wanted and where downloads will go instead.

- **Allow PlayzAnime** asks Windows to add PlayzAnime to its allow list. Windows shows its own admin prompt, and nothing changes unless you approve it there. If it works, your Desktop folders are used.
- **Use Downloads instead** keeps downloads in your Downloads folder, which Windows leaves open.

If a folder failed for another reason, you'll see **That folder isn't writable** and a **Continue** button. You can pick a different folder later.

More detail, including two other ways to allow it: [Controlled folder access](/docs/downloads/controlled-folder-access).

## 3. Make it yours

The last step sets up your profile: a name, a picture, a line about you and your favourites. It stays on your computer. You only share it if you export it as a file.

- **Save and start watching** saves the profile. A name is required.
- **Skip for now** leaves it empty. You can create it later from **Profiles**, the picture at the bottom of the left rail.

Favourites are picked from titles you've already saved or watched, so on a fresh install that list starts empty. See [Your profile](/docs/profiles/your-profile).

## After setup

Setup closes into the app. The left rail has:

| Rail item | What it opens |
|---|---|
| Anime | The anime home: continue watching, top 10 this week, this season, all-time favourites |
| Manga | The manga home: continue reading, trending, manhwa, highest rated |
| Discover | Filtered browsing of everything on AniList |
| Schedule | This week's airing episodes, in your time zone |
| Library | Your lists and history |
| Downloads | The download queue and everything saved on this computer |
| Heart | Opens the PlayzAnime GitHub page |
| Settings | All settings |
| Your picture | Profiles |

Next: [Search, library and schedule](/docs/getting-started/search-library-and-schedule).
