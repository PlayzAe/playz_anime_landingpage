---
title: Controlled folder access
description: Windows can block apps from saving to your Desktop and Documents. How to let PlayzAnime save there, or use a folder Windows leaves open.
section: Downloads
order: 7
icon: shield
---

# Controlled folder access

**Controlled folder access** is a Windows Security feature that stops apps it doesn't know from writing to protected folders: Desktop, Documents, Pictures, Videos and Music. PlayzAnime saves to `Desktop\PlayzAnime` and `Desktop\PlayzManga` by default, so when this is on, Windows quietly blocks the downloads.

You don't lose anything: PlayzAnime notices and saves to your **Downloads** folder instead, which Windows leaves open. To use your chosen folders again, pick one of the three fixes below.

## Is it on?

Open **Windows Security**, then **Virus & threat protection**, then **Manage ransomware protection** (near the bottom). The switch at the top is Controlled folder access.

![Windows Security: the Controlled folder access switch under Ransomware protection](/screenshots/windows-folder-access.webp)

PlayzAnime also tells you: first-run setup shows **Windows is guarding your Desktop**, and **Settings**, **Downloads** shows a **Windows folder protection** row while it's on.

## Fix 1: Allow PlayzAnime (easiest)

1. In PlayzAnime, open **Settings**, then **Downloads**.
2. On **Windows folder protection**, click **Allow PlayzAnime**.
3. Windows shows its own administrator prompt. Click **Yes**.

PlayzAnime is added to Windows' allow list and goes back to your chosen folders. Nothing changes unless you approve the Windows prompt.

## Fix 2: Allow it in Windows Security

1. In **Manage ransomware protection** (above), click **Allow an app through Controlled folder access** and approve the prompt.
2. Click **Add an allowed app**, then **Browse all apps**.
3. Pick `PlayzAnime.exe`. The installer puts it in `C:\Users\<you>\AppData\Local\Programs\PlayzAnime`.
4. Restart PlayzAnime.

> [!NOTE]
> The portable version runs from a temporary copy each time, so allowing it doesn't stick. With the portable version, use fix 3.

## Fix 3: Save somewhere Windows doesn't guard

Keep Controlled folder access exactly as it is and point PlayzAnime at an open folder: open **Settings**, **Downloads**, and click **Change** next to the anime or manga folder. Good choices are your **Downloads** folder or a folder on another drive, such as `D:\Anime`. See [Folders and file names](/docs/downloads/folders-and-naming).

## Downloads that already failed

Downloads blocked before you fixed it show **Windows blocked saving to your download folder**. Click **Resume** on each: finished parts are kept, and the rest is saved to the new place. See [Resume and errors](/docs/downloads/resume-and-errors).
