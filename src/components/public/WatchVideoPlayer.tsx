import { Music } from 'lucide-react'

function getEmbedUrl(url: string) {
  if (!url) return ''
  
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?controls=1`
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Telegram
  if (url.includes('t.me/') || url.includes('telegram.me/')) {
    if (url.includes('?embed=1') || url.includes('&embed=1')) {
      return url
    }
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}embed=1`
  }

  // Internet Archive
  if (url.includes('archive.org/details/')) {
    return url.replace('archive.org/details/', 'archive.org/embed/')
  }

  return url
}

type WatchVideoPlayerProps = {
  videoUrl: string
  poster?: string
  type?: 'video' | 'audio'
}

export function WatchVideoPlayer({ videoUrl, poster, type = 'video' }: WatchVideoPlayerProps) {
  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')
  const isVimeo = videoUrl.includes('vimeo.com')
  const isTelegram = videoUrl.includes('t.me/') || videoUrl.includes('telegram.me/')
  const isArchive = videoUrl.includes('archive.org/embed/') || videoUrl.includes('archive.org/details/')

  const embedUrl = getEmbedUrl(videoUrl)
  const isEmbeddable = isYoutube || isVimeo || isTelegram || isArchive

  // 1. Audio Layout
  if (type === 'audio') {
    return (
      <section 
        className="audio-player-shell" 
        aria-label="Audio player" 
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          aspectRatio: '16/9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          color: '#fff',
          border: '1px solid #334155',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
        }}
      >
        {poster ? (
          <img 
            src={poster} 
            alt="Audio Cover" 
            style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '12px', 
              objectFit: 'cover',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              marginBottom: '16px',
              border: '2px solid rgba(197, 168, 128, 0.4)'
            }} 
          />
        ) : (
          <div 
            style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '12px', 
              background: 'rgba(197, 168, 128, 0.1)',
              border: '2px dashed #c5a880',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c5a880',
              marginBottom: '16px'
            }}
          >
            <Music size={44} />
          </div>
        )}
        
        <audio 
          controls 
          src={videoUrl} 
          style={{ 
            width: '100%', 
            maxWidth: '450px',
            borderRadius: '999px',
          }} 
        />
        <span style={{ fontSize: '13px', color: '#c5a880', marginTop: '12px', fontWeight: 600 }}>
          استماع للملف الصوتي
        </span>
      </section>
    )
  }

  // 2. Video/Embed Layout
  return (
    <section className="youtube-player-shell" aria-label="Video player" style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
      {isEmbeddable ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          src={embedUrl}
          title="Video player"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <video
          controls
          poster={poster}
          src={embedUrl}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </section>
  )
}
