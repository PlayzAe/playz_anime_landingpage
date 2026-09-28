---
title: Downloading chapters
description: Download single chapters or batches as CBZ files that open in any comic reader.
section: Downloads
order: 2
---

# Downloading chapters

## Start a download

- **One chapter:** click the download icon next to it in the chapter list. A message confirms **Downloading chapter 57**, with **View**.
- **Several chapters:** click **Download** above the chapter list and choose which:

| Option | What it downloads |
|---|---|
| **From chapter N on** | Where you're reading, to the latest (shown when you've started the series) |
| **Unread** | Every chapter you haven't read |
| **A range** | Chapter X to chapter Y. **Next 10**, **Next 50** and **Next 100** fill in the end for you |
| **All** | Every chapter in the list |

The dialog shows how many chapters that is before you start. How many download at the same time is set on the **Downloads** page (**At once**) or in **Settings**, **Downloads**.

## Pause, resume and cancel

Big batches are grouped on the **Downloads** page as one card per series, with how many are done, waiting and paused.

- **Pause** on a series card (or **Pause all** at the top) stops downloading and keeps what's saved. **Resume** carries on.
- **Cancel** stops and deletes the unfinished chapters of that series. **Cancel all** does it for everything unfinished. Finished chapters stay.
- Open a card to pause, resume or cancel single chapters.

Downloads left unfinished when you close PlayzAnime come back paused: press **Resume all** to carry on.

Chapters come from the source currently shown in the chapter list. To download from a different source, switch the **Source** first. See [Sources and auto-pick](/docs/reading/sources-and-auto-pick).

Chapters marked **Official site** can't be downloaded. They only exist on the publisher's site.

## The file you get

Each chapter becomes one `.cbz` file, the standard comic archive format:

```
C:\Users\Sam\Desktop\PlayzManga\Solo Leveling\Solo Leveling_Ch012.cbz
```

Inside are the pages, numbered in order (`001.jpg`, `002.jpg`, …), and a `ComicInfo.xml` with the series and chapter. Comic readers such as CDisplayEx, Komga and Kavita use it to show the series name and chapter number.

Pages are saved exactly as the source sent them. They're never decoded or re-compressed, so no quality is lost and unusual formats like AVIF can't break a download. Each page's file extension comes from the image itself, not from its web address.

## Reading downloaded chapters

Downloaded chapters read inside PlayzAnime from the Downloads page, with or without internet. Next and previous move between the chapters of that series you've downloaded. See [Offline mode](/docs/offline/offline-mode).

They also open in any comic reader. See [Open downloads in other apps](/docs/offline/other-apps).

## Data saver and chapter downloads

With [data saver](/docs/settings/data-saver) on, MangaDex serves its compressed versions of pages, often a third of the size. That applies to downloads from MangaDex too.
