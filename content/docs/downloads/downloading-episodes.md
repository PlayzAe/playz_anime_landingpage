---
title: Downloading episodes
description: Download one episode or a whole range as MP4 with subtitles inside, and follow the queue.
section: Downloads
order: 1
---

# Downloading episodes

Downloads are a Windows app feature. The web app can't download.

## Start a download

There are three ways in:

- On a show's page, click the download icon next to an episode.
- On a show's page, click **Download** above the episode list. The range starts at your next episode and runs to the last one.
- On the watch page, click **Download** under the player.

Each opens the same dialog.

## The download dialog

| Field | Options |
|---|---|
| **Episodes** | A range, **from** and **to**. **All** fills in every episode. Movies skip this. |
| **Audio** | **Japanese, subtitled** or **English dub** (greyed out when the show has no dub) |
| **Quality** | **Best**, **1080p**, **720p** or **480p · smallest**. If the source doesn't offer a size, the closest lower one is used. |

Under the fields, the dialog tells you:

- Which subtitles will be packed into the video, for example "English subtitles are packed into the video". It uses your **Subtitle language** setting.
- The folder the episodes will be saved to.
- A rough total size. A 24-minute episode is about 420 MB at Best or 1080p, 260 MB at 720p and 150 MB at 480p.
- How many episodes will be skipped because they have no version in the audio you chose.

Click **Download N episodes**. A message confirms **Queued N episodes**, with **View** to open the Downloads page. Episodes that are already downloading aren't added twice.

The default quality comes from **Settings**, **Downloads**, **Episode quality**. See [Quality](/docs/downloads/quality).

## What happens next

Two downloads run at a time. The rest wait with **Waiting for a free slot**, and they start in the order you added them.

Each episode goes through these stages on the Downloads page:

1. **Finding the stream**
2. Downloading, with percentage, speed, time left and size so far
3. **Joining segments**
4. **Fetching ffmpeg, one time only** (only on your first episode download, about 80 MB)
5. **Packing into MP4**
6. **Saving to your folder**

You can keep browsing and watching while downloads run. Progress also shows on the Downloads icon in the rail, as a ring in the title bar, and on PlayzAnime's taskbar button.

When the whole queue is done, Windows shows a **Download finished** notification. Click it to open the folder. Turn this off in **Settings**, **Downloads**, **Notify when finished**.

## The file you get

Each episode is one MP4 with:

- The video and audio copied as they came, without re-encoding.
- Your subtitles as a subtitle track (subbed downloads only).
- Its title stored in the file.

For example:

```
C:\Users\Sam\Desktop\PlayzAnime\Frieren Beyond Journey's End\Frieren Beyond Journey's End_E05_1080p.mp4
```

Folder and file naming are explained in [Folders and file names](/docs/downloads/folders-and-naming).

> [!NOTE]
> If ffmpeg can't be fetched, the episode is saved as an MPEG-TS file (`.ts`) with the subtitles beside it as a `.vtt` file, for example `…_E05_1080p.eng.vtt`. It still plays in PlayzAnime and in players like VLC and MPV. If only the subtitles fail to pack, you get an MP4 without the track and the `.vtt` file beside it.

## Closing PlayzAnime during downloads

If you close the window while downloads are running, PlayzAnime asks first: **Keep downloading** or **Quit anyway**. Quitting keeps what's been saved so far, and you can resume next time. See [Resume and errors](/docs/downloads/resume-and-errors).
