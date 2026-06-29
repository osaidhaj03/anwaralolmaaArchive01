import { useState } from 'react'
import { LandingHero } from '../../components/public/LandingHero'
import { LandingPreviewSection } from '../../components/public/LandingPreviewSection'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { useNavigate } from 'react-router-dom'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage } from '../../context/LanguageContext'
import { landingCopy } from '../../data/public/landing'

export function LandingPage() {
  const { dir, language } = useLanguage()
  const copy = landingCopy[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const heroAccent = language === 'ar' ? 'إرشاد القلوب بالعلم الأصيل' : 'Guiding Hearts with Authentic Knowledge'
  const isArabic = language === 'ar'
  const articleItems = [
    {
      title: isArabic ? 'ضوابط طلب العلم الشرعي' : 'Foundations of Seeking Knowledge',
      text: isArabic ? 'مقال مختصر يجمع أهم الآداب والمنهجيات لطالب العلم في بدايته.' : 'A concise article on manners and method for the student of knowledge.',
      author: isArabic ? 'هيئة التحرير' : 'Editorial team',
    },
    {
      title: isArabic ? 'منهج أهل السنة في التلقي' : 'The Sunni Method of Learning',
      text: isArabic ? 'بحث تأصيلي في مصادر العلم الشرعي وترتيب الأولويات العلمية.' : 'A research note on sources, priorities, and scholarly discipline.',
      author: isArabic ? 'قسم البحوث' : 'Research desk',
    },
    {
      title: isArabic ? 'أثر المتون في بناء الملكة' : 'Primers and Scholarly Formation',
      text: isArabic ? 'قراءة في دور المتون والشروح في تأسيس الفهم المنضبط.' : 'How primers and explanations shape disciplined understanding.',
      author: isArabic ? 'المقالات العلمية' : 'Articles',
    },
  ]
  const galleryItems = [
    {
      title: isArabic ? 'مجالس العلم والدروس' : 'Knowledge Gatherings',
      text: isArabic ? 'لقطات مختارة من مجالس الدروس والمحاضرات العلمية.' : 'Selected moments from lessons and lectures.',
      image: '/Hero page/HeroBackgroundLTR.png',
      meta: isArabic ? '12 صورة' : '12 photos',
    },
    {
      title: isArabic ? 'المكتبة والمخطوطات' : 'Library and Manuscripts',
      text: isArabic ? 'صور للكتب والمتون والمصادر العلمية داخل الأرشيف.' : 'Books, primers, and archive resources.',
      image: '/Hero page/HeroBackgroundRTL.png',
      meta: isArabic ? '18 صورة' : '18 photos',
    },
    {
      title: isArabic ? 'فعاليات علمية' : 'Scholarly Events',
      text: isArabic ? 'توثيق مرئي للدورات واللقاءات والإعلانات المهمة.' : 'Visual archive for courses, meetings, and announcements.',
      image: '/brand/channel-banner.jpg',
      meta: isArabic ? '9 صور' : '9 photos',
    },
  ]
  const internetGalleryItems = [
    {
      title: isArabic ? 'المساجد والعمارة الإسلامية' : 'Mosques and Islamic Architecture',
      text: isArabic ? 'صورة مختارة من العمارة الإسلامية.' : 'Selected Islamic architecture image.',
      image: 'https://picsum.photos/seed/anwar-gallery-1/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'المكتبات والكتب' : 'Libraries and Books',
      text: isArabic ? 'صورة مكتبية مناسبة للأرشيف العلمي.' : 'Library image for the scholarly archive.',
      image: 'https://picsum.photos/seed/anwar-gallery-2/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'المخطوطات' : 'Manuscripts',
      text: isArabic ? 'صورة قريبة من روح المخطوطات والمصادر.' : 'A manuscript-inspired image.',
      image: 'https://picsum.photos/seed/anwar-gallery-3/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'مجالس العلم' : 'Knowledge Gatherings',
      text: isArabic ? 'أجواء دروس ومحاضرات علمية.' : 'Lessons and lectures atmosphere.',
      image: 'https://picsum.photos/seed/anwar-gallery-4/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'القراءة والبحث' : 'Reading and Research',
      text: isArabic ? 'مشهد للقراءة والبحث العلمي.' : 'Reading and research scene.',
      image: 'https://picsum.photos/seed/anwar-gallery-5/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'القاعات العلمية' : 'Study Halls',
      text: isArabic ? 'مساحة هادئة للتعلم والمراجعة.' : 'Quiet study space.',
      image: 'https://picsum.photos/seed/anwar-gallery-6/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'الخط العربي' : 'Arabic Calligraphy',
      text: isArabic ? 'تفاصيل جمالية من الخط والزخرفة.' : 'Calligraphy and ornament details.',
      image: 'https://picsum.photos/seed/anwar-gallery-7/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'المصاحف والكتب' : 'Quran and Books',
      text: isArabic ? 'صورة لكتب ومصاحف بتكوين هادئ.' : 'Quran and books composition.',
      image: 'https://picsum.photos/seed/anwar-gallery-8/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
    {
      title: isArabic ? 'تفاصيل إسلامية' : 'Islamic Details',
      text: isArabic ? 'زخارف وتفاصيل بصرية مناسبة للهوية.' : 'Visual details matching the identity.',
      image: 'https://picsum.photos/seed/anwar-gallery-9/900/620',
      meta: isArabic ? 'صورة' : 'Photo',
    },
  ]
  void galleryItems
  const newsItems = [
    {
      title: isArabic ? 'إطلاق دفعة جديدة من دروس الفقه' : 'New Fiqh Lessons Released',
      text: isArabic ? 'تمت إضافة مجموعة دروس جديدة ضمن قسم الفقه وأصوله.' : 'A new set of lessons has been added to the Fiqh section.',
      date: isArabic ? 'اليوم' : 'Today',
    },
    {
      title: isArabic ? 'تحديث المكتبة الرقمية' : 'Digital Library Update',
      text: isArabic ? 'إضافة كتب ومتون جديدة مع تحسين بيانات البحث والفهرسة.' : 'New books and primers with improved indexing.',
      date: isArabic ? 'هذا الأسبوع' : 'This week',
    },
    {
      title: isArabic ? 'إعلان دورة علمية قادمة' : 'Upcoming Course Announcement',
      text: isArabic ? 'سيتم الإعلان قريبًا عن دورة علمية جديدة في العقيدة.' : 'A new Aqidah course will be announced soon.',
      date: isArabic ? 'قريبًا' : 'Soon',
    },
  ]
  const quickStats = [
    {
      ...copy.stats[0],
      label: language === 'ar' ? 'الدورات العلمية' : copy.stats[0]?.label ?? 'Courses',
      to: '/courses',
      value: String(stats.public.courses),
    },
    {
      ...copy.stats[1],
      label: language === 'ar' ? 'المحاضرات' : 'Lectures',
      to: '/courses',
      value: new Intl.NumberFormat('en-US').format(stats.public.lessons),
    },
    {
      ...copy.stats[2],
      label: language === 'ar' ? 'المشايخ' : copy.stats[2]?.label ?? 'Scholars',
      to: '/scholars',
      value: String(stats.public.scholars),
    },
    {
      ...copy.stats[3],
      label: language === 'ar' ? 'الكتب والمتون' : copy.stats[3]?.label ?? 'Books',
      to: '/library',
      value: String(stats.public.books),
    },
    {
      ...copy.stats[4],
      label: language === 'ar' ? 'الأقسام العلمية' : copy.stats[4]?.label ?? 'Categories',
      to: '/categories',
      value: String(stats.public.categories),
    },
    {
      icon: copy.nav[4].icon,
      label: language === 'ar' ? 'الفتاوى' : copy.nav[4]?.label ?? 'Fatwa',
      to: '/fatwa',
      value: String(stats.public.fatwas),
    },
  ]

  function submitSearch() {
    const query = search.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/" copy={copy} />

      <LandingHero
        accent={heroAccent}
        onSearchChange={setSearch}
        onSubmit={submitSearch}
        placeholder={copy.heroPlaceholder}
        searchButton={copy.searchButton}
        searchValue={search}
        stats={quickStats}
        text={copy.heroText}
        title={copy.heroTitle}
      />

      <LandingPreviewSection
        items={archive.categories.slice(0, 6)}
        kind="categories"
        link={language === 'ar' ? 'عرض جميع الأقسام' : 'View all categories'}
        linkTo="/categories"
        title={copy.categoriesTitle}
      />

      <LandingPreviewSection items={archive.courses.slice(0, 3)} kind="courses" link={copy.coursesLink} linkTo="/courses" title={copy.coursesTitle} />

      <LandingPreviewSection items={archive.scholars.slice(0, 6)} kind="scholars" link={copy.scholarsLink} linkTo="/scholars" title={copy.scholarsTitle} />

      <LandingPreviewSection
        items={articleItems}
        kind="articles"
        link={isArabic ? 'عرض جميع المقالات' : 'View all articles'}
        linkTo="#articles"
        title={isArabic ? 'المقالات والبحوث' : 'Articles and Research'}
      />

      <LandingPreviewSection
        items={archive.books.slice(0, 10).map((book) => ({ title: book.title }))}
        kind="books"
        link={language === 'ar' ? 'عرض المكتبة' : 'Open library'}
        linkTo="/library"
        meta={copy.bookMeta}
        title={isArabic ? 'المكتبة الرقمية' : 'Digital Library'}
      />

      <LandingPreviewSection
        items={internetGalleryItems}
        kind="gallery"
        link={isArabic ? 'عرض المعرض' : 'View gallery'}
        linkTo="#gallery"
        title={isArabic ? 'معرض الصور' : 'Photo Gallery'}
      />

      <LandingPreviewSection
        items={newsItems}
        kind="news"
        link={isArabic ? 'كل الأخبار' : 'All news'}
        linkTo="#news"
        title={isArabic ? 'الأخبار والإعلانات' : 'News and Announcements'}
      />

      <PublicPageFooter
        copy={copy}
        quickLinksItems={[
          { label: copy.coursesTitle, to: '/courses' },
          { label: copy.scholarsTitle, to: '/scholars' },
          { label: copy.categoriesTitle, to: '/categories' },
        ]}
        successText={copy.newsletterSuccess}
      />
    </main>
  )
}
