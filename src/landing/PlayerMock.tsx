import { Icon } from '../components/Icon';

/*
 * The player, drawn in code over a real banner, showing what the copy next to it describes:
 * subtitles, Skip intro, the chapter-marked progress bar and the keyboard shortcuts. The only
 * motion is a slow pulse around Skip intro, on the compositor.
 */

const BANNER = 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg';

export function PlayerMock() {
  return (
    <div className="pm" role="img" aria-label="The PlayzAnime player: an episode with subtitles, a Skip intro button, and the progress bar with the opening marked">
      <img className="pm-art" src={BANNER} alt="" width={1900} height={400} loading="lazy" decoding="async" />
      <div className="pm-shade" />

      <div className="pm-top">
        <Icon name="arrowLeft" size={16} />
        <span className="pm-title">
          <strong>Frieren: Beyond Journey’s End</strong>
          <span>Episode 12 · Sub</span>
        </span>
      </div>

      <p className="pm-subtitle">Let’s take the long way this time.</p>

      <span className="pm-skip">
        Skip intro
        <Icon name="skip" size={14} />
      </span>

      <div className="pm-bar">
        <div className="pm-progress">
          <span className="pm-opening" />
          <span className="pm-buffered" />
          <span className="pm-played" />
          <span className="pm-knob" />
        </div>
        <div className="pm-controls">
          <span className="pm-group">
            <Icon name="pause" size={17} />
            <Icon name="back10" size={17} />
            <Icon name="fwd10" size={17} />
            <Icon name="volume" size={17} />
            <span className="pm-time num">01:32 / 23:40</span>
          </span>
          <span className="pm-group">
            <span className="pm-chip">
              <Icon name="subtitles" size={15} /> English
            </span>
            <Icon name="pip" size={16} />
            <Icon name="fullscreen" size={16} />
          </span>
        </div>
      </div>

      <div className="pm-keys" aria-hidden="true">
        <kbd>S</kbd> skip <kbd>C</kbd> subtitles <kbd>F</kbd> full screen
      </div>
    </div>
  );
}
