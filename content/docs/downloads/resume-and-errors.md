---
title: Resume and errors
description: How downloads resume after failures and restarts, and what each error message means.
section: Downloads
order: 6
---

# Resume and errors

## Downloads resume where they stopped

An episode arrives as many small video segments, and a chapter as a set of pages. PlayzAnime saves each piece to disk as it arrives, in `%APPDATA%\PlayzAnime\partial`. If a download fails, or you quit, those pieces stay.

- **Resume** fetches only the missing pieces and carries on.
- **Retry** appears instead when nothing was saved yet.
- **Cancel** is different: it means you don't want the download, so the saved pieces are deleted.

This works across restarts. A download that was running when PlayzAnime closed shows up under **Needs attention** with:

> Stopped when the app closed. Resume picks up where it left off.

When you resume an episode, PlayzAnime fetches a fresh stream link first, since old links expire. If the source now serves a different version of the stream (another quality, or a different number of segments), that episode starts again from the beginning.

## Busy hosts

Video hosts limit how fast you can download. When a host answers "too many requests", PlayzAnime waits as long as the host asks (or up to 30 seconds), and fetches fewer pieces at once for the rest of that download. Short limits are waited out without failing the download.

## Error messages

| Message | What happened | What to do |
|---|---|---|
| Your disk is full. | The drive ran out of space. What was saved is kept. | Free some space, then **Resume**. |
| Windows blocked saving to your download folder. | Controlled folder access or folder permissions stopped PlayzAnime writing. | Allow PlayzAnime under **Settings**, **Downloads**, or pick another folder, then **Resume**. See [Controlled folder access](/docs/downloads/controlled-folder-access). |
| The video host is limiting downloads right now. | The host kept refusing after several waits. | **Resume** in a minute or two. |
| The stream link expired. | The link stopped working partway through. | **Resume** fetches a fresh one. |
| The host answered 404 (or another number). | The host returned an error. | Try **Resume**. If it keeps failing, the episode may have been taken down. |
| Connection dropped. | Your internet went away. | **Resume** when you're back online. |
| This chapter is only available on the publisher's site. | It's an **Official site** chapter. | Read it on the publisher's site. |
| The source returned no pages for this chapter. | The chapter is empty on that source. | Switch source and download it from another. |

Most messages end with how much is already saved, for example "63% is saved."

## A download seems stuck

- **Waiting for a free slot** means two downloads are already running. It starts when one finishes.
- **Fetching ffmpeg, one time only** only happens once, on your first episode download. It's about 80 MB.
- **Saving to your folder** can take a while if Windows is scanning the file or the folder is on a slow drive.

If nothing moves for several minutes, **Cancel** isn't needed: quit and reopen PlayzAnime, then **Resume**. More help: [Downloads fail or get stuck](/docs/troubleshooting/download-problems).
