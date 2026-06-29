import { BookOpen, Eye, FileText, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DetailInfoCard, DetailRelatedCard, DetailTextCard } from '../../components/public/DetailCards'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { libraryCopy } from '../../data/public/library'

const detailCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / المكتبة / تفاصيل الكتاب',
    overview: 'عن الكتاب',
    description: 'نسخة للقراءة والمراجعة مع بيانات مختصرة عن المؤلف ومجال الكتاب واستخداماته في الدرس العلمي.',
    author: 'المؤلف',
    category: 'القسم',
    type: 'النوع',
    pages: 'الصفحات',
    reads: 'القراءات',
    readNow: 'القراءة الآن',
    related: 'كتب ذات صلة',
  },
  en: {
    breadcrumb: 'Home / Library / Book details',
    overview: 'About this book',
    description: 'A reading and reference page with author details, subject context, and quick access actions.',
    author: 'Author',
    category: 'Category',
    type: 'Type',
    pages: 'Pages',
    reads: 'Reads',
    readNow: 'Read now',
    related: 'Related books',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Kutubxona / Tafsilotlar',
    overview: 'Kitob haqida',
    description: 'Muallif va mavzu tafsilotlari bo‘lgan o‘qish va ma’lumot olish sahifasi.',
    author: 'Muallif',
    category: 'Kategoriya',
    type: 'Tur',
    pages: 'Sahifalar',
    reads: 'O‘qildi',
    readNow: 'Hozir o‘qish',
    related: 'Tegishli kitoblar',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Кутубхона / Тафсилотлар',
    overview: 'Китоб ҳақида',
    description: 'Муаллиф ва мавзу тафсилотлари бўлган ўқиш ва маълумот олиш саҳифаси.',
    author: 'Муаллиф',
    category: 'Категория',
    type: 'Тур',
    pages: 'Саҳифалар',
    reads: 'Ўқилди',
    readNow: 'Ҳозир ўқиш',
    related: 'Тегишли китоблар',
  },
  ru: {
    breadcrumb: 'Главная / Библиотека / Детали книги',
    overview: 'О книге',
    description: 'Страница для чтения и справок с информацией об авторе, тематике и быстрым переходом.',
    author: 'Автор',
    category: 'Категория',
    type: 'Тип',
    pages: 'Страницы',
    reads: 'Прочтения',
    readNow: 'Читать сейчас',
    related: 'Похожие книги',
  },
}

export function LibraryDetailPage() {
  const { bookId } = useParams()
  const { dir, language } = useLanguage()
  const pageCopy = libraryCopy[language]
  const archive = useLocalizedArchive(language)
  const copy = detailCopy[language]
  const index = Number(bookId) - 1
  const item = archive.books[index]

  if (!item) {
    return <Navigate to="/library" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/library" copy={pageCopy} />

      <section className="library-detail-hero islamic-soft-pattern">
        <div className="public-container library-detail-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="library-detail-head">
            {item.coverImage ? (
              <div className="library-book-cover-container" style={{ width: '130px', height: '178px', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#0d263d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={item.coverImage} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div className={`library-book-cover tone-${item.tone}`} style={{ flexShrink: 0 }}><BookOpen size={48} /><span>{item.type}</span></div>
            )}
            <div className="library-detail-copy">
              <small>{item.category}</small>
              <h1>{item.title}</h1>
              <p>{item.descriptionShort || copy.description}</p>
              <div className="library-detail-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                {item.downloadLinks && item.downloadLinks.length > 0 ? (
                  item.downloadLinks.map((link: any, lIdx: number) => (
                    <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="read-now-btn" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--color-gold, #c5a880)',
                      color: '#fff',
                      padding: '10px 24px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(197, 168, 128, 0.2)',
                      transition: 'all 0.2s',
                    }}>
                      <span>{language === 'ar' ? 'تنزيل' : 'Download'} ({link.fileType || 'PDF'})</span>
                      {link.source && <span style={{ fontSize: '11px', opacity: 0.85, borderRight: dir === 'rtl' ? '1px solid rgba(255,255,255,0.4)' : 'none', borderLeft: dir === 'ltr' ? '1px solid rgba(255,255,255,0.4)' : 'none', paddingRight: dir === 'rtl' ? '8px' : '0', paddingLeft: dir === 'ltr' ? '8px' : '0' }}>{link.source}</span>}
                    </a>
                  ))
                ) : item.downloadLink ? (
                  <a href={item.downloadLink} target="_blank" rel="noopener noreferrer" className="read-now-btn" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--color-gold, #c5a880)',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(197, 168, 128, 0.3)',
                    transition: 'all 0.2s',
                  }}>
                    {language === 'ar' ? 'تنزيل الكتاب' : 'Download Book'} ({item.fileType || 'PDF'})
                  </a>
                ) : (
                  <Link to="/login" className="read-now-btn">{copy.readNow}</Link>
                )}
                
                {item.kamelahLink && (
                  <a href={item.kamelahLink} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}>
                    {language === 'ar' ? 'رابط المكتبة الكاملة' : 'Kamelah Library'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container library-detail-layout">
        <div className="library-detail-main">
          <DetailTextCard className="library-detail-card" title={copy.overview}>
            <p style={{ whiteSpace: 'pre-line' }}>{item.descriptionLong || item.descriptionShort || (language === 'ar' ? 'يُستخدم هذا الكتاب في الدراسة التمهيدية والمراجعة المنهجية، مع ترتيب واضح للأبواب وسهولة في الرجوع إلى المسائل.' : 'This title is used for guided study and structured review, with clearly arranged chapters and easy reference points.')}</p>
          </DetailTextCard>

          {item.volumes && item.volumes.length > 0 && (
            <DetailTextCard className="library-detail-card" title={language === 'ar' ? 'أجزاء ومجلدات الكتاب' : 'Book Volumes & Parts'}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
                {item.volumes.map((vol: any, vIdx: number) => {
                  let volCover = '';
                  if (vol.coverType === 'custom') {
                    volCover = vol.coverImage || '';
                  } else if (vol.coverType === 'main' || !vol.coverType) {
                    volCover = item.coverImage || '';
                  }
                  
                  return (
                    <div key={vIdx} style={{ display: 'flex', gap: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', alignItems: 'center' }}>
                      {volCover ? (
                        <div style={{ width: '60px', height: '80px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                          <img src={volCover} alt={vol.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div className={`library-book-cover tone-${item.tone}`} style={{ width: '60px', height: '80px', minHeight: 'auto', padding: '4px', flexShrink: 0, borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <BookOpen size={20} />
                          <span style={{ fontSize: '9px', padding: '2px 4px' }}>{vol.fileType || 'PDF'}</span>
                        </div>
                      )}
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vol.title}</h4>
                        {vol.pages && <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>{vol.pages} {language === 'ar' ? 'صفحة' : 'pages'}</p>}
                        <a href={vol.downloadLink} target="_blank" rel="noopener noreferrer" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#0d263d',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}>
                          {language === 'ar' ? 'تنزيل الجزء' : 'Download Part'}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DetailTextCard>
          )}

          <DetailRelatedCard
            cardClassName="library-detail-card"
            linkClassName="library-detail-related"
            title={copy.related}
            items={archive.books.filter((candidate) => candidate.category === item.category && candidate.title !== item.title).slice(0, 3).map((related) => ({
                description: related.author,
                title: related.title,
                to: `/library/${archive.books.findIndex((candidate) => candidate.title === related.title) + 1}`,
            }))}
          />
        </div>
        <aside className="library-detail-side">
          <DetailInfoCard
            cardClassName="library-detail-card"
            listClassName="library-detail-info"
            items={[
                { label: copy.author, value: <><UserRound size={15} />{item.author}</> },
                { label: copy.category, value: item.category },
                { label: copy.type, value: item.type },
                { label: copy.pages, value: <><FileText size={15} />{item.pages}</> },
                { label: copy.reads, value: <><Eye size={15} />{item.views}</> },
                ...(item.madhab ? [{ label: language === 'ar' ? 'المذهب الفقهي' : 'Madhab', value: item.madhab }] : []),
                ...(item.source ? [{ label: language === 'ar' ? 'المصدر' : 'Source', value: item.source }] : []),
            ]}
          />
        </aside>
      </section>

      <PublicPageFooter
        copy={pageCopy}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[3].label, to: '/scholars' },
          { label: pageCopy.nav[4].label, to: '/fatwa' },
        ]}
        successText={pageCopy.newsletterSuccess}
      />
    </main>
  )
}
