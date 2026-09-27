---
title: Downloads fail or get stuck
description: A download stops, fails, or sits without moving. What each state means and how to get it going again.
section: Troubleshooting
order: 2
icon: downloads
---

# Downloads fail or get stuck

Downloads are built to survive bad connections: finished parts are kept, and **Resume** carries on from where it stopped. Start here.

## A download says it failed

Click **Resume** on it. Only the missing parts are fetched again. The table in [Resume and errors](/docs/downloads/resume-and-errors) explains each error message.

The most common ones:

| You see | Do this |
|---|---|
| **Windows blocked saving to your download folder.** | Windows' folder protection is on. See [Controlled folder access](/docs/downloads/controlled-folder-access), then **Resume**. |
| **The video host is limiting downloads right now.** | Wait a minute or two, then **Resume**. |
| **The stream link expired.** | **Resume** fetches a fresh one. |
| **Your disk is full.** | Free some space or [pick another folder](/docs/downloads/folders-and-naming), then **Resume**. |
| **Connection dropped.** | **Resume** when you're back online. |

## A download isn't moving

1. Give it a minute. When a host is busy, PlayzAnime waits and tries again rather than failing.
2. Check your connection in a browser.
3. Quit PlayzAnime and open it again, then click **Resume**. Finished parts are kept.

## Downloads finish but won't play

- Open the **Downloads** page. A file marked **Missing** was moved, renamed or deleted outside PlayzAnime: move it back, or download it again. See [The Downloads page](/docs/downloads/the-downloads-page).
- To play it in another app, see [Open downloads in other apps](/docs/offline/other-apps).

## Downloading chapters

A chapter that fails usually means its source is having a bad moment. Open the series, switch to another source from the chapter list, and download from there. See [Read from another source](/docs/reading/read-from-another-source).

> [!NOTE]
> Downloads are part of the Windows app. In the web app, Download buttons show where to get it.
