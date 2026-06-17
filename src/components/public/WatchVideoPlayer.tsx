import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const TEST_YOUTUBE_EMBED = 'https://www.youtube.com/embed/V2SY82U0C8g?controls=0&disablekb=1&rel=0&playsinline=1&enablejsapi=1'
const VIDEO_DURATION = 142

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function WatchVideoPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  function sendYouTubeCommand(func: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args: [],
      }),
      '*',
    )
  }

  function togglePlay() {
    const nextPlaying = !isPlaying
    setIsPlaying(nextPlaying)
    sendYouTubeCommand(nextPlaying ? 'playVideo' : 'pauseVideo')
  }

  function toggleMute() {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    sendYouTubeCommand(nextMuted ? 'mute' : 'unMute')
  }

  useEffect(() => {
    if (!isPlaying) return undefined
    const timer = window.setInterval(() => {
      setElapsed((current) => Math.min(current + 1, VIDEO_DURATION))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isPlaying])

  return (
    <section className="youtube-player-shell" aria-label="Video player">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        ref={iframeRef}
        src={TEST_YOUTUBE_EMBED}
        title="Course lesson video"
      />
      <div className="youtube-custom-controls">
        <button aria-label={isPlaying ? 'Pause video' : 'Play video'} onClick={togglePlay} type="button">
          {isPlaying ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" />}
        </button>
        <button aria-label={isMuted ? 'Unmute video' : 'Mute video'} onClick={toggleMute} type="button">
          {isMuted ? <VolumeX size={21} /> : <Volume2 size={21} />}
        </button>
        <span>{formatTime(elapsed)} / {formatTime(VIDEO_DURATION)}</span>
      </div>
    </section>
  )
}

