type WatchVideoPlayerProps = {
  embedUrl: string
}

export function WatchVideoPlayer({ embedUrl }: WatchVideoPlayerProps) {
  return (
    <section className="youtube-player-shell" aria-label="Video player">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        frameBorder="0"
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title="YouTube video player"
      />
    </section>
  )
}

