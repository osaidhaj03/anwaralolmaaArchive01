import { BookOpen, Download, Eye, FileText, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { DetailInfoList } from '../../components/public/DetailInfoList'
import { DetailRelatedLinks } from '../../components/public/DetailRelatedLinks'
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
    downloads: 'التحميلات',
    readNow: 'القراءة الآن',
    download: 'تحميل النسخة',
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
    downloads: 'Downloads',
    readNow: 'Read now',
    download: 'Download copy',
    related: 'Related books',
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
      <PublicHeader activeTo="/library" brand={pageCopy.brand} languageLabel={pageCopy.languageLabel} login={pageCopy.login} nav={pageCopy.nav} searchLabel={pageCopy.searchLabel} subtitle={pageCopy.subtitle} themeLabel={pageCopy.themeLabel} />

      <section className="library-detail-hero islamic-soft-pattern">
        <div className="public-container library-detail-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="library-detail-head">
            <div className={`library-book-cover tone-${item.tone}`}><BookOpen size={48} /><span>{item.type}</span></div>
            <div className="library-detail-copy">
              <small>{item.category}</small>
              <h1>{item.title}</h1>
              <p>{copy.description}</p>
              <div className="library-detail-actions">
                <Link to="/login">{copy.readNow}</Link>
                <Link to="/login"><Download size={16} />{copy.download}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container library-detail-layout">
        <div className="library-detail-main">
          <article className="library-detail-card">
            <h2>{copy.overview}</h2>
            <p>{language === 'ar' ? 'يُستخدم هذا الكتاب في الدراسة التمهيدية والمراجعة المنهجية، مع ترتيب واضح للأبواب وسهولة في الرجوع إلى المسائل.' : 'This title is used for guided study and structured review, with clearly arranged chapters and easy reference points.'}</p>
          </article>
          <article className="library-detail-card">
            <h2>{copy.related}</h2>
            <DetailRelatedLinks
              className="library-detail-related"
              items={archive.books.filter((candidate) => candidate.category === item.category && candidate.title !== item.title).slice(0, 3).map((related) => ({
                description: related.author,
                title: related.title,
                to: `/library/${archive.books.findIndex((candidate) => candidate.title === related.title) + 1}`,
              }))}
            />
          </article>
        </div>
        <aside className="library-detail-side">
          <article className="library-detail-card">
            <DetailInfoList
              className="library-detail-info"
              items={[
                { label: copy.author, value: <><UserRound size={15} />{item.author}</> },
                { label: copy.category, value: item.category },
                { label: copy.type, value: item.type },
                { label: copy.pages, value: <><FileText size={15} />{item.pages}</> },
                { label: copy.reads, value: <><Eye size={15} />{item.views}</> },
                { label: copy.downloads, value: <><Download size={15} />{item.downloads}</> },
              ]}
            />
          </article>
        </aside>
      </section>

      <PublicFooter
        brand={pageCopy.brand}
        footerText={pageCopy.footerText}
        newsletterButton={pageCopy.newsletterButton}
        newsletterPlaceholder={pageCopy.newsletterPlaceholder}
        newsletterText={pageCopy.newsletterText}
        newsletterTitle={pageCopy.newsletterTitle}
        quickLinks={pageCopy.quickLinks}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[3].label, to: '/scholars' },
          { label: pageCopy.nav[4].label, to: '/fatwa' },
        ]}
        successText={language === 'ar' ? 'تم تسجيل بريدك في القائمة البريدية.' : 'Your email has been added to the newsletter list.'}
      />
    </main>
  )
}
