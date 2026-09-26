---
title: The player
description: How to start an episode, what every player control does, and how PlayzAnime keeps your place.
section: Watching
order: 1
---

# The player

PlayzAnime plays episodes in its own player, with no ads. It's the default. If a stream won't play there, you can switch to the source's own player; see [Embed player fallback](/docs/watching/embed-player).

## Start watching

Open a show and press the main button. It picks the right episode for you:

- **Watch E1** if you haven't started.
- **Resume E5** if you stopped partway through episode 5.
- **Watch E6** if you finished episode 5.

You can also click any episode in the **Episodes** tab. Long shows are split into ranges of 50 episodes, and **Find an episode** searches by number or title. The two buttons beside it switch between episode stills and a plain list; PlayzAnime remembers which you prefer.

While a stream is being found, the player shows **Finding the stream**. If it takes more than 12 seconds, it says **This source is slow today. Still trying…** and offers **Use the embed player instead**.

## Controls

Move the mouse to show the controls. They hide after a few seconds of stillness while the video plays.

| Control | What it does |
|---|---|
| Play / pause | Also: click the video |
| Back 10 s, forward 10 s | Skip in 10-second steps |
| Next episode | Shown when there is one |
| Volume | Slider and mute button. PlayzAnime remembers your volume. |
| Time | Current position and length |
| Subtitles | Pick a track or **Off**. See [Subtitles and audio](/docs/watching/subtitles-and-audio). |
| Quality and speed (gear) | **Auto quality** or a fixed size such as 1080p, and speeds from 0.5× to 2× |
| Theater mode | Hides the episode list so the video fills the page. Remembered between episodes. |
| Picture in picture | Pops the video into a small floating window |
| Full screen | Also: double-click the video |

The seek bar marks the intro and the credits when the source provides them. Hover over it to see the time, labelled **Intro** or **Credits** inside those parts.

Every control has a keyboard shortcut. See [Keyboard shortcuts](/docs/watching/keyboard-shortcuts).

## Below the player

The bar under the video has:

- **Sub / Dub**, when the show has a dub.
- **PlayzAnime / Embed**, to switch players for this episode.
- **Download**, to save this episode or a range. See [Downloading episodes](/docs/downloads/downloading-episodes).
- Previous and next episode buttons.

The list on the right shows every episode, with a check on the ones you've watched and an **Autoplay** switch at the top.

## Windows integration

- **Media keys** on your keyboard play, pause and skip, and the Windows media controls show the episode and cover.
- **Taskbar buttons:** hover over PlayzAnime in the taskbar for previous, play/pause and next buttons.
- **Download progress** shows on the taskbar button while downloads run.

## How your place is kept

- Your position is saved every few seconds while you watch, and when you pause or leave.
- Opening the episode again resumes from that point, unless you were in the first 10 seconds or the last 30.
- An episode counts as watched once you pass 90% of it, or when the credits start.
- Once you're past about halfway, PlayzAnime quietly prepares the next episode so **Next** starts at once. [Data saver](/docs/settings/data-saver) turns this off.

Mark episodes by hand with the check next to each one, or use the menu for **Mark all as watched**, **Mark all as unwatched** and **Look for new episodes**.

## When things go wrong mid-episode

PlayzAnime handles two common failures without asking:

- **The stream link expires.** Stream links stop working after a while. The first time that happens, PlayzAnime fetches a fresh link and carries on from the same second. You only see an error if the fresh link fails too.
- **The picture freezes while the sound keeps going.** If the time moves on but no new frame appears for 4 seconds, the player rebuilds its video decoder in place. Holding down a seek key is also added up and applied as one jump, which avoids the freeze in the first place.

If a stream fails for good, you'll see **This stream wouldn't load** with **Try again** and **Use the embed player**. More help: [A stream won't load](/docs/troubleshooting/stream-wont-load).
