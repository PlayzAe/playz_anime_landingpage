---
title: Folders and file names
description: Where downloads are saved, how to change the folders, and exactly how episode and chapter files are named.
section: Downloads
order: 4
---

# Folders and file names

## Default folders

Episodes and chapters have separate folders:

| Kind | Default folder |
|---|---|
| Episodes | `C:\Users\<you>\Desktop\PlayzAnime` |
| Chapters | `C:\Users\<you>\Desktop\PlayzManga` |

If PlayzAnime can't write to a folder (it was on a drive that's gone, or Windows is blocking it), it falls back to one under your Downloads folder:

| Kind | Fallback folder |
|---|---|
| Episodes | `C:\Users\<you>\Downloads\PlayzAnime` |
| Chapters | `C:\Users\<you>\Downloads\PlayzManga` |

The most common reason for the fallback is Windows Controlled folder access. See [Controlled folder access](/docs/downloads/controlled-folder-access).

## Change a folder

Use **Change** next to the folder on the Downloads page, or in **Settings**, **Downloads**, **Anime folder** or **Manga folder**. Pick any folder, including one on another drive. **Open** shows the folder in File Explorer.

The new folder is used for new downloads. Files you already have stay where they are, and PlayzAnime keeps playing them from there.

## Episode names

```
<Anime folder>\<Show>\<Show>_E<episode>_<quality>.mp4
```

Examples, with the anime folder on the Desktop:

| Download | Saved as |
|---|---|
| Episode 5 of *Frieren: Beyond Journey's End*, 1080p | `Desktop\PlayzAnime\Frieren Beyond Journey's End\Frieren Beyond Journey's End_E05_1080p.mp4` |
| Episode 5 of *Attack on Titan Season 3*, 720p | `Desktop\PlayzAnime\Attack on Titan\Season 3\Attack on Titan_E05_720p.mp4` |
| The same episode, dubbed | `Desktop\PlayzAnime\Attack on Titan\Season 3\Attack on Titan_E05_720p_DUB.mp4` |
| The movie *Suzume*, 1080p | `Desktop\PlayzAnime\Suzume\Suzume_1080p.mp4` |

The rules:

- **Seasons get their own folder.** A title ending in "Season 3" or "3rd Season" goes into `<Show>\Season 3`, so every season of a show sits under one show folder. Titles without a season number go straight into the show folder.
- **Episode numbers have at least two digits:** `E05`, `E12`, `E105`.
- **Quality** is the height of the video, such as `1080p` or `720p`. If the source only offers one unlabelled stream, it's `HD`.
- **Dubs** end in `_DUB`. Subbed downloads have no suffix.
- **Movies** have no episode number.

## Chapter names

```
<Manga folder>\<Series>\<Series>_Ch<chapter>.cbz
```

| Download | Saved as |
|---|---|
| Chapter 12 of *Solo Leveling* | `Desktop\PlayzManga\Solo Leveling\Solo Leveling_Ch012.cbz` |
| Chapter 12.5 | `Desktop\PlayzManga\Solo Leveling\Solo Leveling_Ch012.5.cbz` |
| Chapter 147 | `Desktop\PlayzManga\Solo Leveling\Solo Leveling_Ch147.cbz` |
| A oneshot | `Desktop\PlayzManga\<Series>\<Series>_ChOneshot.cbz` |

Chapter numbers have at least three digits, so files sort in reading order in File Explorer.

## Rules for every name

- **The title follows your title language.** With **Settings**, **Look**, **Titles** on **English**, you get the English title. On **Romaji**, you get the romaji title, for example `Shingeki no Kyojin`. Changing the setting later doesn't rename existing files.
- **Characters Windows doesn't allow are removed:** `< > : " / \ | ? *`. That's why "Frieren: Beyond Journey's End" becomes `Frieren Beyond Journey's End`.
- **Long titles are cut** to 120 characters, and trailing dots and spaces are removed.
- **Nothing is overwritten.** If a file with the same name exists, the new one gets a number: `Attack on Titan_E05_720p (2).mp4`.
