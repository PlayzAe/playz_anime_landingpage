---
title: Sources and auto-pick
description: The four chapter sources, how PlayzAnime picks one for each title, and how to choose a source yourself.
section: Reading
order: 1
---

# Sources and auto-pick

PlayzAnime reads chapters from four public sources. It checks all of them for every title, so you don't have to know which site has what.

| Source | Good for |
|---|---|
| **MangaDex** | Community scanlations with chapter titles and translation groups |
| **WeebCentral** | A large catalogue, strong on manhwa and manhua |
| **Flame Comics** | New Korean manhwa, often the only English source for them |
| **MangaPill** | Fast, popular manga, and a good fallback |

Chapters are in English.

## How auto-pick works

With **Settings**, **Reading**, **Manga source** set to **Auto** (the default), opening a manga does this:

1. Every source that's up is asked for the title at the same time.
2. PlayzAnime finds the highest chapter number each one has that you can read inside the app.
3. It uses the source that's furthest along.
4. On a tie, it prefers the source with richer chapter details (titles, groups, volumes): MangaDex, then Flame Comics, then WeebCentral, then MangaPill.

Sources that are down are skipped instead of waited on. PlayzAnime checks every source's health in the background and remembers the result for 10 minutes. A source that doesn't answer within 10 seconds counts as down.

Chapter lists are kept for 20 minutes. Use the **⋯** menu on the chapter list and choose **Look for new chapters** to check again straight away.

## Pick a source for one title

When more than one source has the title, a **Source** switch appears above the chapter list. Each option shows the latest chapter it has, for example `MangaDex · ch. 120` and `WeebCentral · ch. 131`. Pick one to see its chapter list.

When only one source has it, the list says **From WeebCentral** (or whichever it is).

## Prefer one source everywhere

Set **Settings**, **Reading**, **Manga source** to one of the four sources. PlayzAnime then uses that source whenever it has the title, and falls back to auto-pick when it doesn't.

## Check which sources are up

Under **Manga source** in Settings, each source shows its status:

| Status | Meaning |
|---|---|
| A time, such as `0.8 s` | Up. The time is how long it took to answer. |
| A time over 4 seconds | Up but slow |
| **Unreachable** | Down right now. Hover to see the error. |
| **Checking…** | The check is running |

**Check again** runs the checks now.

## Official-site chapters

Some chapters are published only on an official site (MANGA Plus, for example). These show **Official site** in the list and open in your web browser. They can't be read or downloaded inside PlayzAnime, and they don't count when auto-pick compares sources.

## Finding titles with unusual punctuation

AniList titles often use curly quotes and dashes that nobody types, like "I’m the Max-Level Newbie". PlayzAnime searches each source with plain punctuation and, if needed, with only the distinctive words. It also ignores a leading "A" or "The" when matching, so "A Regressor’s Tale" and "Regressor’s Tale" are the same series.

If a title still isn't found, see [No chapters found](/docs/troubleshooting/no-chapters-found).
