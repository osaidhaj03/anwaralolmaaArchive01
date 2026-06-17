import { useState, useEffect } from 'react'
import { Headphones, Maximize, Play, Pause, Settings, SkipForward, Volume2 } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'

type WatchVideoPlayerProps = {
  audioMode: boolean
  courseTone: string
  language: Language
  setAudioMode: (value: boolean) => void
}

export function WatchVideoPlayer({ audioMode, courseTone, language, setAudioMode }: WatchVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(true)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const activeEl = document.activeElement
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault()
          setIsPlaying((prev) => !prev)
          break
        case 'm':
          event.preventDefault()
          setVolume((prev) => !prev)
          break
        case 'f': {
          event.preventDefault()
          const playerEl = document.querySelector('.new-player-card')
          if (playerEl) {
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(() => {})
            } else {
              playerEl.requestFullscreen().catch(() => {})
            }
          }
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="course-video-card new-player-card">
      <div className={`course-video-frame tone-${courseTone} ${audioMode ? 'audio-mode-active' : ''} ${isPlaying ? 'video-playing-active' : ''}`}>
        {audioMode ? (
          <div className="audio-mode-visualizer">
            <div className={`pulsing-headphones ${isPlaying ? 'is-playing' : ''}`}>
              <Headphones size={64} className="glow-icon" />
            </div>
            {isPlaying && (
              <div className="wave-bars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <h3>{language === 'ar' ? (isPlaying ? 'جاري تشغيل الصوت' : 'تم إيقاف الصوت مؤقتاً') : (isPlaying ? 'Playing Audio' : 'Audio Paused')}</h3>
          </div>
        ) : (
          <div className="video-player-poster">
            {!isPlaying ? (
              <button type="button" className="center-play-btn" aria-label="Play video" onClick={() => setIsPlaying(true)}>
                <Play size={32} fill="currentColor" />
              </button>
            ) : (
              <div className="video-playing-overlay" onClick={() => setIsPlaying(false)}>
                <div className="pause-hover-indicator">
                  <Pause size={32} fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Controls Panel */}
      <div className="video-controls-bar">
        <div className="controls-progress-wrapper">
          <div className="controls-progress-bar">
            <div className={`progress-played ${isPlaying ? 'animate-progress' : ''}`} style={{ width: isPlaying ? '100%' : '28%' }}>
              <span className="progress-handle"></span>
            </div>
          </div>
        </div>
        <div className="controls-buttons-row">
          <div className="controls-left">
            <button type="button" className="control-btn" aria-label="Play/Pause" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <button type="button" className="control-btn" aria-label="Next Lesson"><SkipForward size={16} fill="currentColor" /></button>
            <span className="time-display">{isPlaying ? '13:02' : '12:45'} / 45:30</span>
          </div>
          <div className="controls-right" style={{ position: 'relative' }}>
            <button type="button" className="control-btn" aria-label="Volume" onClick={() => setVolume(!volume)}>
              <Volume2 size={16} className={volume ? '' : 'muted-volume'} />
            </button>
            <button type="button" className="control-btn" aria-label="Settings" onClick={() => setShowSettingsMenu(!showSettingsMenu)}>
              <Settings size={16} />
            </button>
            
            {showSettingsMenu && (
              <div className="watch-actions-dropdown player-settings-dropdown">
                <button type="button" onClick={() => setShowSettingsMenu(false)}>1080p (HD)</button>
                <button type="button" onClick={() => setShowSettingsMenu(false)}>720p</button>
                <button type="button" onClick={() => setShowSettingsMenu(false)}>1.0x Speed</button>
              </div>
            )}
            
            <button type="button" className="control-btn" aria-label="Fullscreen"><Maximize size={16} /></button>
          </div>
        </div>
      </div>

      {/* Audio Switcher Panel */}
      <div className="audio-only-banner">
        <div className="audio-only-left">
          <div className="headphones-circle-icon">
            <Headphones size={20} />
          </div>
          <div className="audio-only-texts">
            <h3>{language === 'ar' ? 'وضع الصوت فقط' : 'Audio Only'}</h3>
            <p>{language === 'ar' ? 'استمع إلى هذا الدرس كملف صوتي' : 'Listen to this lesson as audio'}</p>
          </div>
        </div>
        <div className="audio-only-right">
          {audioMode && isPlaying && (
            <div className="mini-wave-visualizer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <button
            type="button"
            className={`audio-switch-btn ${audioMode ? 'active' : ''}`}
            onClick={() => setAudioMode(!audioMode)}
            aria-label="Toggle audio mode"
          >
            <span className="switch-knob"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

