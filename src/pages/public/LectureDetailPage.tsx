import { useState } from 'react'
import { Eye, Calendar, UserRound, Music, Video, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DetailInfoCard, DetailRelatedCard, DetailTextCard } from '../../components/public/DetailCards'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { WatchVideoPlayer } from '../../components/public/WatchVideoPlayer'
import { useLanguage } from '../../context/LanguageContext'
import { lecturesCopy } from '../../data/public/lectures'

export function LectureDetailPage() {
  const { lectureId } = useParams()
  const { dir, language } = useLanguage()
  const pageCopy = lecturesCopy[language]
  
  const item = pageCopy.items.find(l => l.id === lectureId)
  const [activePartIndex, setActivePartIndex] = useState(0)
  const [mediaType, setMediaType] = useState<'video' | 'audio'>('video')

  if (!item) {
    return <Navigate to="/lectures" replace />
  }

  const activePart = item.parts[activePartIndex] || item.parts[0]
  
  // Decide active URL based on mediaType choice
  const activeUrl = mediaType === 'video' 
    ? (activePart?.videoUrl || activePart?.audioUrl || '')
    : (activePart?.audioUrl || activePart?.videoUrl || '')

  const currentType = mediaType === 'video' && activePart?.videoUrl ? 'video' : 'audio'

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/lectures" copy={pageCopy} />

      <section className="fatwa-detail-hero islamic-soft-pattern" style={{ padding: '30px 0 40px' }}>
        <div className="public-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px', color: 'var(--color-neutral-600)' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>{language === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link to="/lectures" style={{ color: 'inherit', textDecoration: 'none' }}>{pageCopy.title}</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-primary-600)', fontWeight: 500 }}>{item.title}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {item.category}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {item.title}
            </h1>
            <p style={{ fontSize: '15px', color: '#475569', maxWidth: '800px', margin: '8px 0 0' }}>
              {item.description || pageCopy.description}
            </p>
          </div>
        </div>
      </section>

      <section className="public-container fatwa-detail-layout" style={{ gap: '24px', paddingBottom: '60px' }}>
        
        {/* Main Player & Parts List Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <WatchVideoPlayer 
              videoUrl={activeUrl} 
              poster={item.thumbnail} 
              type={currentType} 
            />
          </div>

            {/* Media Type Switcher & Download Options */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {activePart?.videoUrl && (
                  <button
                    onClick={() => setMediaType('video')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: mediaType === 'video' ? 'var(--color-primary-600)' : '#cbd5e1',
                      background: mediaType === 'video' ? 'var(--color-primary-50)' : '#fff',
                      color: mediaType === 'video' ? 'var(--color-primary-700)' : '#475569',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Video size={14} />
                    {pageCopy.videoPlayerLabel}
                  </button>
                )}
                {activePart?.audioUrl && (
                  <button
                    onClick={() => setMediaType('audio')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: mediaType === 'audio' ? 'var(--color-primary-600)' : '#cbd5e1',
                      background: mediaType === 'audio' ? 'var(--color-primary-50)' : '#fff',
                      color: mediaType === 'audio' ? 'var(--color-primary-700)' : '#475569',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Music size={14} />
                    {pageCopy.audioPlayerLabel}
                  </button>
                )}
              </div>

              {/* Part navigation buttons */}
              {item.parts.length > 1 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    disabled={activePartIndex === 0}
                    onClick={() => setActivePartIndex(prev => Math.max(0, prev - 1))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#fff',
                      color: activePartIndex === 0 ? '#cbd5e1' : '#475569',
                      fontSize: '13px',
                      cursor: activePartIndex === 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {dir === 'rtl' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    {language === 'ar' ? 'السابق' : 'Prev'}
                  </button>
                  <button
                    disabled={activePartIndex === item.parts.length - 1}
                    onClick={() => setActivePartIndex(prev => Math.min(item.parts.length - 1, prev + 1))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#fff',
                      color: activePartIndex === item.parts.length - 1 ? '#cbd5e1' : '#475569',
                      fontSize: '13px',
                      cursor: activePartIndex === item.parts.length - 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                  </button>
                </div>
              )}
            </div>

            {/* Description & Part Info */}
            <DetailTextCard 
              className="fatwa-detail-card" 
              title={item.parts.length > 1 ? `${activePart?.title} - ${pageCopy.partLabel} ${activePartIndex + 1}` : item.title}
            >
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
                {activePart?.description || item.description || pageCopy.description}
              </p>
            </DetailTextCard>
          </div>

          {/* Right/Side Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Parts Checklist if multiple parts */}
            {item.parts.length > 1 && (
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  {pageCopy.partsLabel}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.parts.map((part, index) => {
                    const isActive = index === activePartIndex
                    return (
                      <button
                        key={part.title}
                        onClick={() => setActivePartIndex(index)}
                        style={{
                          width: '100%',
                          textAlign: dir === 'rtl' ? 'right' : 'left',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: isActive ? 'var(--color-primary-300)' : 'transparent',
                          background: isActive ? 'var(--color-primary-50)' : '#f8fafc',
                          color: isActive ? 'var(--color-primary-900)' : '#1e293b',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '13px',
                          fontWeight: isActive ? 600 : 500,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ 
                            width: '20px', 
                            height: '20px', 
                            borderRadius: '50%', 
                            background: isActive ? 'var(--color-primary-600)' : '#cbd5e1', 
                            color: '#fff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '11px'
                          }}>
                            {index + 1}
                          </span>
                          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                            {part.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: isActive ? 'var(--color-primary-600)' : '#64748b' }}>
                          {part.duration}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Lecture Meta Info Card */}
            <DetailInfoCard
              cardClassName="fatwa-detail-card"
              listClassName="fatwa-detail-info"
              items={[
                { label: language === 'ar' ? 'المحاضر' : 'Lecturer', value: <><UserRound size={15} />{item.scholar}</> },
                { label: language === 'ar' ? 'القسم' : 'Category', value: item.category },
                { label: language === 'ar' ? 'عدد الأجزاء' : 'Parts Count', value: String(item.parts.length) },
                { label: language === 'ar' ? 'المشاهدات' : 'Views', value: <><Eye size={15} />{item.views}</> },
                { label: language === 'ar' ? 'التاريخ' : 'Date', value: <><Calendar size={15} />{item.date}</> }
              ]}
            />

            {/* Related Lectures List */}
            <DetailRelatedCard
              cardClassName="fatwa-detail-card"
              linkClassName="fatwa-detail-related"
              title={language === 'ar' ? 'محاضرات ذات صلة' : 'Related Lectures'}
              items={pageCopy.items
                .filter((candidate) => candidate.categoryId === item.categoryId && candidate.id !== item.id)
                .slice(0, 3)
                .map((related) => ({
                  description: related.scholar,
                  title: related.title,
                  to: `/lectures/${related.id}`,
                }))}
            />
          </div>

      </section>

      <PublicPageFooter copy={pageCopy} successText={pageCopy.newsletterSuccess} />
    </main>
  )
}
