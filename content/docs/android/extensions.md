---
title: Extensions
description: Optional extra manga sources on Android, how I load them, how updates and adult content work, and where they still break.
section: Android
order: 2
---

# Extensions

Manga, manhwa and manhua work in PlayzAnime without installing anything: the built-in sources cover most titles. Extensions are optional, for when you want more sites.

![Your manga sources](/screenshots/mobile/browse.webp "phone")
![Extensions you can add](/screenshots/mobile/installed.webp "phone")
![Browsing one extension source](/screenshots/mobile/extension.webp "phone")

## Where they come from

I took inspiration from how [Mihon](https://mihon.app) handles extensions, and PlayzAnime can load the ones published in the [keiyoushi repo](https://github.com/keiyoushi/extensions). They weren't made for PlayzAnime, so I wrote a small Android layer that loads them next to my Flutter app. Nothing is installed as a separate app.

> **It's still buggy.** Flutter and Dart can't run these extensions on their own, so everything goes through that Android layer. Most sources work, but some fail to load, time out or need a retry. If you find one that breaks, please [open an issue](https://github.com/PlayzAe/playz_anime_app/issues) or, even better, a [pull request](https://github.com/PlayzAe/playz_anime_app/pulls). I'd love the help.

## Getting started

The first time you open **Manga**, I offer you ten popular English extensions (Asura Scans, Weeb Central, MangaFire, Manganato and others). Keep the ones you want and tap **Install**, or skip it.

You can add more any time in **Settings → Manga → Extensions**:

- **Install** one, or **Install all** in the list you're looking at.
- **Remove** takes an extension off again.
- Filter by language, or search by name.
- The globe button adds another repo that uses the same `index.json` format.

Installed extensions only load when you use them, so having a lot installed doesn't slow the app down.

## Updates

Sites change often, and extensions are updated to keep up. PlayzAnime checks the repo once a day and updates your extensions automatically. Switch this off in **Settings → Manga** if you'd rather tap **Update all** yourself.

## Reading with extensions

- **Manga → Browse** lists your sources. Tap one to see its popular and latest titles, or search it.
- Opening a title from AniList asks your built-in sources and installed extensions at once and reads from whichever is furthest along. **Source** next to the chapter list lets you pick another, or **Search every extension**.
- Searching for manga also searches your extensions and shows a row per source.

## Switching sources

If you change source partway through, PlayzAnime asks **Continue where you left off?** and opens the same chapter number on the new source.

If an extension you were reading from is removed, the title shows a notice: reinstall it with one tap, or carry on from the same chapter on another source. This only affects titles you were reading on that extension.

## Missing chapters

When your sources stop short of the latest chapter, or have none at all, the title offers **Install an extension**, which opens the extension list.

## Adult content

Extensions the repo rates **NSFW** carry an 18+ tag. With **Settings → Privacy → Hide adult content** on, they're hidden from the list, from search and from automatic source picks. They stay installed and come back when you switch the setting off. Sites rated *mixed* (most big aggregators) are always shown.
