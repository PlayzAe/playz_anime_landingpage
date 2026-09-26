---
title: Where your data lives
description: The folders PlayzAnime uses for settings, history, logs and downloads, and how to back them up.
section: Getting started
order: 6
---

# Where your data lives

Everything PlayzAnime knows about you stays on your computer. There's no account and no cloud copy.

## The data folder

| Build | Data folder |
|---|---|
| Installer | `%APPDATA%\PlayzAnime`, for example `C:\Users\Sam\AppData\Roaming\PlayzAnime` |
| Portable | `PlayzAnime Data` next to the exe, for example `D:\Apps\PlayzAnime\PlayzAnime Data` |

**Settings**, **About** shows the exact path under "Settings and history live in".

To open it, paste `%APPDATA%\PlayzAnime` into File Explorer's address bar.

## What's inside

| Item | What it holds |
|---|---|
| `playzanime-data.json` | Settings, library lists, watch and reading history, watched episodes, read chapters, your profile, friends' profiles, the list of your downloads, and the window size and position |
| `partial\` | Pieces of unfinished downloads, so they can resume. Emptied as downloads finish or are cancelled. |
| `subtitles\` | A copy of each downloaded episode's subtitles for the in-app player |
| `bin\ffmpeg.exe` | Fetched once, the first time you download an episode |
| `logs\main.log` | This session's log. `main.previous.log` is the one before. |
| `adblock-engine.bin` | Filter data for the ad and pop-up blocker |

Electron also keeps its own cache folders here, including cached artwork.

> [!NOTE]
> If `playzanime-data.json` is ever damaged and can't be read, PlayzAnime keeps a copy named `playzanime-data.json.corrupt-<number>` and starts fresh, so nothing is silently lost.

## Where downloads go

Downloads don't live in the data folder. By default:

| Kind | Default folder |
|---|---|
| Episodes | `C:\Users\<you>\Desktop\PlayzAnime` |
| Chapters | `C:\Users\<you>\Desktop\PlayzManga` |

If PlayzAnime can't write to a folder, it uses `Downloads\PlayzAnime` or `Downloads\PlayzManga` instead. Change either folder from the Downloads page or **Settings**, **Downloads**. See [Folders and file names](/docs/downloads/folders-and-naming).

## Back up your data

1. Quit PlayzAnime.
2. Copy `playzanime-data.json` from the data folder somewhere safe.

To restore, quit PlayzAnime and put the file back.

> [!WARNING]
> Restoring replaces everything in the current file: settings, lists, history and friends' profiles. The file also stores the paths of your downloads. If you restore it on another PC where those files don't exist, the Downloads page marks them as missing.

## Clear things from inside the app

**Settings**, **Your data** has two buttons:

- **Clear cache** forces fresh data from AniList and the sources and clears cached artwork. Your lists aren't touched.
- **Clear history** removes resume points, watched episodes and read chapters. Library lists and downloaded files stay.
