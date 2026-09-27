/*
 * Covers for the poster wall behind the hero, served by AniList's image CDN (the same
 * images the app shows). Each entry: kind, file name, and the cover's main colour, which
 * fills the tile while the image loads.
 */

type Poster = readonly ['anime' | 'manga', string, string];

export const POSTERS: readonly Poster[] = [
  ['anime', 'bx154587-qQTzQnEJJ3oB.jpg', '#bbf1a1'], // Frieren: Beyond Journey's End
  ['manga', 'bx30002-Cul4OeN7bYtn.jpg', '#d6861a'], // Berserk
  ['anime', 'bx21-ELSYx3yMPcKM.jpg', '#e49335'], // One Piece
  ['manga', 'bx30642-0mjRDkf4THpo.jpg', '#f16b43'], // Vinland Saga
  ['anime', 'bx171627-ZN9D7P46yHnw.png', '#e43550'], // Chainsaw Man: Reze Arc
  ['manga', 'bx140407-fJQr0fmqq1IO.png', '#ffc943'], // The Greatest Estate Developer
  ['anime', 'bx5114-nSWCgQlmOMtj.jpg', '#e4c993'], // Fullmetal Alchemist: Brotherhood
  ['manga', 'bx30656-9mW113O7rDnA.png', '#2a2522'], // Vagabond
  ['anime', 'bx185874-aU3e6tBT6wwA.jpg', '#2a2522'], // Bleach: Thousand-Year Blood War
  ['manga', 'bx31706-lRncu9VbcBB7.png', '#c9e45d'], // JoJo: Steel Ball Run
  ['anime', 'bx104578-k61nx3LPjvgd.jpg', '#e49350'], // Attack on Titan
  ['manga', 'bx128067-wnLBg6Cy1ncs.jpg', '#f16b5d'], // SSS-Class Revival Hunter
  ['anime', 'bx11061-y5gsT1hoHuHw.png', '#f1d65d'], // Hunter x Hunter
  ['manga', 'bx30001-Knby7l1jevE7.jpg', '#50a1e4'], // Monster
  ['anime', 'bx189046-yaHWtS5FII46.jpg', '#e49350'], // Re:Zero
  ['manga', 'bx30051-5KJyPlO7z5F4.png', '#f18650'], // Slam Dunk
  ['anime', 'bx9253-tIUXF2gfU8Sg.jpg', '#ffd6ae'], // Steins;Gate
  ['manga', 'nx46765-KPXir4sRqJBW.png', '#e46b43'], // Kingdom
  ['anime', 'bx182205-q2AeO1owuQbO.jpg', '#1abbd6'], // That Time I Got Reincarnated as a Slime
  ['manga', 'bx74489-5HtDCFfut8Be.jpg', '#2a2522'], // Land of the Lustrous
  ['anime', 'bx178789-hNXjKFzUq7mk.jpg', '#28bbe4'], // Mushoku Tensei
  ['manga', 'bx167649-8qpdNIjBdIhQ.png', '#e4506b'], // The Academy's Genius Swordsman
  ['anime', 'bx114129-RLgSuh6YbeYx.jpg', '#e48643'], // Gintama: The Very Final
  ['manga', 'bx30657-AzyyUOWMJ6fd.png', '#f16b28'], // Real
  ['anime', 'bx124194-TJlqMMR7BGn9.jpg', '#35bbf1'], // Fruits Basket
  ['manga', 'bx30104-sUVzNlTWZ5cu.jpg', '#e4a135'], // Yotsuba&!
  ['anime', 'bx177699-VHMezCGf48nM.jpg', '#e4ae1a'], // The Ghost in the Shell
  ['anime', 'bx210482-P1VNKbqdJ6Zj.jpg', '#f1ae50'], // Steel Ball Run (anime)
  ['anime', 'bx133007-5gOUXDvzxy9S.jpg', '#e4935d'], // Madoka Magica: Walpurgisnacht
  ['anime', 'bx199111-gBSuBG61ElcW.jpg', '#5daed6'], // Grand Blue Dreaming
];

// AniList's "medium" covers (about 15 KB each). Behind the fade they look the same as the
// "large" ones, which are about 100 KB each: 450 KB for the whole wall instead of 3 MB.
const CDN = 'https://s4.anilist.co/file/anilistcdn/media';
export const posterUrl = ([kind, file]: Poster) => `${CDN}/${kind}/cover/medium/${file}`;

/**
 * The wall's columns. Wide screens show up to twelve, so covers repeat across columns, but
 * each column steps through the list differently (stride 11, which shares no factor with 30),
 * so no column repeats a cover and neighbouring columns never line up.
 */
export function posterColumns(count: number, perColumn = 6): Poster[][] {
  const n = POSTERS.length;
  return Array.from({ length: count }, (_, c) => Array.from({ length: perColumn }, (_, k) => POSTERS[(c * 7 + k * 11) % n]));
}
