/*
 * Covers for the poster wall behind the hero: the most popular anime, manga and manhwa on
 * AniList, served by AniList's image CDN (the same images the app shows). Each entry: kind,
 * file name, and the cover's main colour, which fills the tile while the image loads.
 */

type Poster = readonly ['anime' | 'manga', string, string];

export const POSTERS: readonly Poster[] = [
  ['anime', 'bx16498-buvcRTBx4NSm.jpg', '#f1a143'], // Attack on Titan
  ['anime', 'bx101922-WBsBl0ClmgYL.jpg', '#f1c9ae'], // Demon Slayer: Kimetsu no Yaiba
  ['manga', 'bx105778-euxXZEIfDY2u.png', '#f1c90d'], // Chainsaw Man
  ['manga', 'bx105398-b673Vt5ZSuz3.jpg', '#2a2522'], // Solo Leveling
  ['anime', 'bx113415-LHBAeoZDIsnF.jpg', '#e45d5d'], // JUJUTSU KAISEN
  ['anime', 'bx1535-kUgkcrfOrkUM.jpg', '#2a2522'], // Death Note
  ['manga', 'bx101517-H3TdM3g5ZUe9.jpg', '#e4a15d'], // Jujutsu Kaisen
  ['manga', 'bx119257-Pi21aq3ey9GG.jpg', '#2a2522'], // Omniscient Reader
  ['anime', 'bx21459-nYh85uj2Fuwr.jpg', '#f1d643'], // My Hero Academia
  ['anime', 'bx11061-y5gsT1hoHuHw.png', '#f1d65d'], // Hunter x Hunter (2011)
  ['manga', 'bx30002-Cul4OeN7bYtn.jpg', '#d6861a'], // Berserk
  ['manga', 'bx85143-23oup3ETbFJk.jpg', '#2a2522'], // Tower of God
  ['anime', 'bx21087-B5DHjqZ3kW4b.jpg', '#e4ae5d'], // One-Punch Man
  ['anime', 'bx21-ELSYx3yMPcKM.jpg', '#e49335'], // ONE PIECE
  ['manga', 'bx30013-BeslEMqiPhlk.jpg', '#f1935d'], // One Piece
  ['manga', 'b86964-vTdn1Esqw3va.jpg', '#2a2522'], // Bastard
  ['anime', 'b20605-k665mVkSug8D.jpg', '#ff6b35'], // Tokyo Ghoul
  ['manga', 'bx53390-1RsuABC34P9D.jpg', '#d6431a'], // Attack on Titan
  ['manga', 'bx140407-fJQr0fmqq1IO.png', '#ffc943'], // The Greatest Estate Developer
  ['anime', 'bx5114-nSWCgQlmOMtj.jpg', '#e4c993'], // Fullmetal Alchemist: Brotherhood
  ['anime', 'bx20-dE6UHbFFg1A5.jpg', '#e47850'], // Naruto
  ['manga', 'bx87216-c9bSNVD10UuD.png', '#f1d628'], // Demon Slayer: Kimetsu no Yaiba
  ['manga', 'bx128067-wnLBg6Cy1ncs.jpg', '#f16b5d'], // SSS-Class Revival Hunter
  ['anime', 'bx11757-SxYDUzdr9rh2.jpg', '#e4bb5d'], // Sword Art Online
  ['anime', 'bx20954-sYRfE5jQRtSB.jpg', '#5dbbe4'], // A Silent Voice
  ['manga', 'bx63327-glC9cDxYBja9.png', '#e46b5d'], // Tokyo Ghoul
  ['manga', 'bx100568-4BC0PsdwU4bL.png', '#2a2522'], // The Horizon
  ['anime', 'bx21519-SUo3ZQuCbYhJ.png', '#0da1e4'], // Your Name.
  ['manga', 'bx34632-5xMDkx3pXsEh.png', '#e4c943'], // Goodnight Punpun
  ['manga', 'bx126297-SPiM7QtUnJ4P.jpg', '#f1c9a1'], // Teenage Mercenary
  ['manga', 'bx85486-INqnYx8gL3eX.jpg', '#f1d650'], // My Hero Academia
  ['manga', 'bx100954-xY0Vw2sRRo8t.png', '#d64350'], // Sweet Home
  ['anime', 'bx127230-DdP4vAdssLoz.png', '#6b1a1a'], // Chainsaw Man
  ['anime', 'bx101759-8UR7r9MNVpz2.jpg', '#e4ae50'], // The Promised Neverland
  ['manga', 'bx74347-sZpmNJ5xLwRK.jpg', '#2a2522'], // One-Punch Man
  ['manga', 'bx85141-qHR957V3FVco.png', '#f16b5d'], // The God of High School
  ['anime', 'bx20755-dWrhs569YGUO.jpg', '#f1e45d'], // Assassination Classroom
  ['anime', 'bx21507-6YUSbh2m0N1p.jpg', '#d65d1a'], // Mob Psycho 100
  ['manga', 'bx30656-9mW113O7rDnA.png', '#2a2522'], // Vagabond
  ['manga', 'bx137280-juUL79K7f9s7.png', '#c9e4f1'], // I’m the Max-Level Newbie
  ['anime', 'bx21355-wRVUrGxpvIQQ.jpg', '#f150ae'], // Re:ZERO -Starting Life in Another World-
  ['anime', 'bx20665-TLgkL8T8IRFd.png', '#e4bb50'], // Your lie in April
  ['manga', 'bx108556-NHjkz0BNJhLx.jpg', '#e4505d'], // SPY x FAMILY
  ['manga', 'bx105393-oiHumQoBGKG5.jpg', '#e4bb5d'], // A Returner's Magic Should Be Special
  ['manga', 'bx30642-0mjRDkf4THpo.jpg', '#f16b43'], // Vinland Saga
  ['manga', 'bx120980-RZ9WLd0o9hyo.jpg', '#e4506b'], // Nano Machine
  ['anime', 'bx21234-XmqW39aQ9o7O.jpg', '#f1a150'], // ERASED
  ['manga', 'bx87423-gPNtu8QbGped.jpg', '#e4d650'], // The Promised Neverland
  ['manga', 'bx119521-qYqxFvn0NnXo.png', '#2a2522'], // The Legend of the Northern Blade
  ['anime', 'bx9253-tIUXF2gfU8Sg.jpg', '#ffd6ae'], // Steins;Gate
  ['anime', 'bx97940-fyh8o7gNbha0.png', '#d6c96b'], // Black Clover
  ['manga', 'bx106130-yPNeuSu75ey1.jpg', '#86d61a'], // Blue Lock
  ['manga', 'bx106929-flAUvHZDUz5v.jpg', '#35c9e4'], // Eleceed
  ['anime', 'bx20464-ooZUyBe4ptp9.png', '#e48635'], // HAIKYU!!
  ['anime', 'bx101291-wfEdgPqtfU0l.jpg', '#0d43f1'], // Rascal Does Not Dream of Bunny Girl Senpai
  ['manga', 'bx72451-vVXtRwyttjGG.png', '#e45d93'], // Horimiya
  ['manga', 'bx86848-4CSItSclJUvi.jpg', '#f1c935'], // Lookism
  ['anime', 'bx140960-Kb6R5nYQfjmP.jpg', '#c9f1f1'], // SPY x FAMILY
  ['anime', 'bx101921-ufrjLzhSz7L1.jpg', '#e45086'], // Kaguya-sama: Love is War
  ['manga', 'bx30012-1epmVfTSv2rr.png', '#5da1f1'], // Bleach
  ['manga', 'bx123573-LKoCKwRouEMW.png', '#e45d50'], // Lout of Count’s Family
  ['anime', 'bx105333-GybuoSoOZfpH.jpg', '#c9d678'], // Dr. STONE
  ['anime', 'bx21827-ubzq619ZA2E9.png', '#3586e4'], // Violet Evergarden
  ['manga', 'bx86635-EdaLQmsn86Fy.png', '#d61a35'], // Kaguya-sama: Love is War
  ['manga', 'bx163824-KiablxybJD6i.jpg', '#5078e4'], // Revenge of the Baskerville Bloodhound
  ['anime', 'bx101348-2fhDFPCuMNiz.jpg', '#f16b5d'], // Vinland Saga
  ['anime', 'bx124080-3i22mRVPBS0T.jpg', '#5dc9f1'], // Horimiya
  ['manga', 'bx102988-OoVJxQCH6fbR.jpg', '#e45d50'], // Tokyo Revengers
  ['manga', 'bx159441-9W8201jAT9Yv.jpg', '#5dc9f1'], // Pick Me Up
  ['anime', 'bx4224-PXVMBLNwy2aF.jpg', '#e45d78'], // Toradora!
  ['anime', 'b19815-sEOQ9yQaPKlk.jpg', '#f1a135'], // No Game, No Life
  ['manga', 'bx132029-prGF4gePdSKv.jpg', '#f1d60d'], // Dandadan
  ['manga', 'bx109957-EgJWdR7l9TBG.jpg', '#356be4'], // Second Life Ranker
  ['anime', 'bx20613-HXHpec4bemk5.jpg', '#e45d43'], // Akame ga Kill!
  ['anime', 'bx20447-EoQXeygHaVCK.jpg', '#bbe4f1'], // Noragami
  ['manga', 'bx30026-uCvXMudMzmwI.jpg', '#ffbb43'], // Hunter x Hunter
  ['manga', 'bx132144-i5B4VnG9sRgh.png', '#e45078'], // Return of the Blossoming Blade
  ['anime', 'bx20789-Ma5ouSYPkru9.jpg', '#e4861a'], // The Seven Deadly Sins
  ['manga', 'bx30003-E84fwIh22LAQ.jpg', '#e4c943'], // 20th Century Boys
  ['manga', 'bx144957-h0qIwRwxOEdg.jpg', '#f1ae5d'], // The World After the Fall
  ['anime', 'bx269-d2GmRkJbMopq.png', '#f1a150'], // Bleach
  ['anime', 'bx21202-mPOr80AEjUcZ.png', '#5daee4'], // KONOSUBA -God's blessing on this wonderful world!
  ['manga', 'bx30001-Knby7l1jevE7.jpg', '#50a1e4'], // Monster
  ['manga', 'b119174-nFMZSHbrDDbt.png', '#f15d6b'], // The Boxer
];

// AniList's "medium" covers (about 15 KB each). Behind the fade they look the same as the
// "large" ones, which are about 100 KB each.
const CDN = 'https://s4.anilist.co/file/anilistcdn/media';
export const posterUrl = ([kind, file]: Poster) => `${CDN}/${kind}/cover/medium/${file}`;

/**
 * The wall's columns. Column c starts c * perColumn covers into the list and takes the next
 * perColumn, so each column is different and the whole list is used before anything repeats.
 */
export function posterColumns(count: number, perColumn = 8): Poster[][] {
  const n = POSTERS.length;
  return Array.from({ length: count }, (_, c) => Array.from({ length: perColumn }, (_, k) => POSTERS[(c * perColumn + k) % n]));
}
