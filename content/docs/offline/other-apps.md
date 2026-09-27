---
title: Open downloads in other apps
description: Episodes are MP4 and chapters are CBZ, so any video player or comic reader opens them.
section: Offline
order: 2
icon: folder
---

# Open downloads in other apps

PlayzAnime saves standard files, so you can watch and read them anywhere, copy them to a phone or a USB stick, and keep them if you ever uninstall.

## Where they are

On the **Downloads** page, open an item's menu and choose **Show in folder**, or click **Open** next to a folder at the top of the page. By default:

| Kind | Folder |
|---|---|
| Episodes | `Desktop\PlayzAnime\<Show>\` |
| Chapters | `Desktop\PlayzManga\<Series>\` |

The full naming scheme is in [Folders and file names](/docs/downloads/folders-and-naming).

## Episodes: MP4

Each episode is one MP4 file (H.264 video, AAC audio) with its subtitles inside, so they travel with the file.

- **Windows:** the Media Player app, VLC or MPV.
- **Phones and TVs:** VLC on Android and iPhone, or copy it to a USB stick for most smart TVs.

Pick the subtitle track from the player's subtitle menu if it doesn't show one on its own.

## Chapters: CBZ

Each chapter is one CBZ file: a ZIP of the page images, untouched, plus a small `ComicInfo.xml` with the series and chapter number.

- **Windows:** CDisplayEx, YACReader or Sumatra PDF.
- **Library apps:** Calibre, Komga or Kavita read the chapter details automatically.
- **Phones:** most comic reader apps open CBZ.

Rename `.cbz` to `.zip` and Windows opens it as a folder of images.

> [!TIP]
> Renaming or moving the files is fine, but PlayzAnime then can't find them: the **Downloads** page marks them **Missing**. Move them back, or download again.
