import { useMemo, useState } from 'react'
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Download,
  Eye,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  PanelLeftClose,
  Pencil,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  UploadCloud,
} from 'lucide-react'
import './App.css'
import { BrandMark } from './components/AdminIcons'
import {
  activityItems,
  contentLabels,
  contentRecords,
  contentStats,
  metrics,
  navItems,
  statusLabels,
  type ContentType,
} from './data/seed'

type ContentFilter = ContentType | 'all'

function App() {
  const [activeType, setActiveType] = useState<ContentFilter>('all')
  const [query, setQuery] = useState('')

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim()

    return contentRecords.filter((record) => {
      const matchesType = activeType === 'all' || activeType === record.type
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [record.title, record.category, record.teacher, record.related].some((value) =>
          value.includes(normalizedQuery),
        )

      return matchesType && matchesQuery
    })
  }, [activeType, query])

  return (
    <main className="admin-app" dir="rtl">
      <aside className="sidebar" aria-label="تنقل لوحة التحكم">
        <div className="brand">
          <BrandMark className="brand-mark" />
          <div>
            <strong>أنوار العلماء</strong>
            <span>أرشيف القناة العلمي</span>
          </div>
        </div>

        <nav className="side-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button className={item.active ? 'is-active' : ''} key={item.label} type="button">
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="import-card">
          <UploadCloud size={22} />
          <strong>استيراد يوتيوب</strong>
          <span>جاهز للمرحلة الثانية بعد تثبيت نموذج البيانات.</span>
          <button type="button">تجهيز قائمة</button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="title-block">
            <span className="breadcrumb">
              <LayoutDashboard size={16} />
              لوحة التحكم الرئيسية
            </span>
            <h1>إدارة أرشيف أنوار العلماء</h1>
          </div>

          <div className="top-actions">
            <label className="search-field">
              <Search size={18} />
              <input
                aria-label="البحث في المحتوى"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن دورة، شيخ، كتاب، فتوى..."
                value={query}
              />
            </label>
            <button className="icon-button" title="الإشعارات" type="button">
              <Bell size={19} />
            </button>
            <button className="primary-action" type="button">
              <Plus size={18} />
              إضافة محتوى
            </button>
          </div>
        </header>

        <section className="metric-grid" aria-label="ملخص الأرشيف">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article className={`metric-card tone-${metric.tone}`} key={metric.label}>
                <div className="metric-icon">
                  <Icon size={22} />
                </div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.change}</small>
              </article>
            )
          })}
        </section>

        <section className="dashboard-grid">
          <article className="panel content-panel">
            <div className="panel-header">
              <div>
                <h2>إدارة المحتوى</h2>
                <p>بيانات وهمية للمرحلة الأولى قبل الربط مع Supabase.</p>
              </div>
              <div className="panel-actions">
                <button type="button">
                  <Filter size={17} />
                  فلترة
                </button>
                <button type="button">
                  <Download size={17} />
                  تصدير
                </button>
              </div>
            </div>

            <div className="tabs" role="tablist" aria-label="أنواع المحتوى">
              <button
                aria-selected={activeType === 'all'}
                className={activeType === 'all' ? 'is-selected' : ''}
                onClick={() => setActiveType('all')}
                role="tab"
                type="button"
              >
                الكل
              </button>
              {Object.entries(contentLabels).map(([type, label]) => (
                <button
                  aria-selected={activeType === type}
                  className={activeType === type ? 'is-selected' : ''}
                  key={type}
                  onClick={() => setActiveType(type as ContentFilter)}
                  role="tab"
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>العنوان</th>
                    <th>النوع</th>
                    <th>القسم</th>
                    <th>الشيخ / المؤلف</th>
                    <th>مرتبط بـ</th>
                    <th>الحالة</th>
                    <th>آخر تحديث</th>
                    <th>إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <strong>{record.title}</strong>
                        <span>{record.lessons ? `${record.lessons} درس` : `رقم ${record.id}`}</span>
                      </td>
                      <td>{contentLabels[record.type]}</td>
                      <td>{record.category}</td>
                      <td>{record.teacher}</td>
                      <td>{record.related}</td>
                      <td>
                        <span className={`status ${record.status}`}>
                          {statusLabels[record.status]}
                        </span>
                      </td>
                      <td>{record.updatedAt}</td>
                      <td>
                        <button className="row-action" type="button" title="فتح الإجراءات">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-records" aria-label="قائمة المحتوى للجوال">
              {filteredRecords.map((record) => (
                <article className="record-card" key={record.id}>
                  <div>
                    <span>{contentLabels[record.type]}</span>
                    <strong>{record.title}</strong>
                  </div>
                  <span className={`status ${record.status}`}>{statusLabels[record.status]}</span>
                  <dl>
                    <div>
                      <dt>القسم</dt>
                      <dd>{record.category}</dd>
                    </div>
                    <div>
                      <dt>الشيخ</dt>
                      <dd>{record.teacher}</dd>
                    </div>
                    <div>
                      <dt>مرتبط بـ</dt>
                      <dd>{record.related}</dd>
                    </div>
                    <div>
                      <dt>تحديث</dt>
                      <dd>{record.updatedAt}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </article>

          <aside className="right-rail">
            <article className="panel health-panel">
              <div className="panel-header compact">
                <div>
                  <h2>جاهزية المحتوى</h2>
                  <p>مؤشرات الإدخال والتصنيف.</p>
                </div>
                <SlidersHorizontal size={19} />
              </div>

              <div className="health-list">
                {contentStats.map((stat) => {
                  const percentage = Math.round((stat.ready / stat.total) * 100)
                  return (
                    <div className="health-item" key={stat.type}>
                      <div>
                        <strong>{contentLabels[stat.type]}</strong>
                        <span>
                          {stat.ready.toLocaleString('ar-JO')} من{' '}
                          {stat.total.toLocaleString('ar-JO')}
                        </span>
                      </div>
                      <div className="progress" aria-label={`${percentage}% جاهز`}>
                        <span style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="panel edit-panel">
              <div className="edit-cover">
                <img alt="شعار قناة أنوار العلماء" src="/brand/logo.jpg" />
                <button type="button">
                  <Pencil size={16} />
                  تعديل
                </button>
              </div>
              <div className="panel-header compact">
                <div>
                  <h2>نموذج دورة سريع</h2>
                  <p>مثال على حقول إضافة أو تعديل دورة.</p>
                </div>
                <PanelLeftClose size={19} />
              </div>

              <form className="quick-form">
                <label>
                  عنوان الدورة
                  <input defaultValue="شرح كتاب التوحيد" />
                </label>
                <label>
                  الشيخ
                  <select defaultValue="د. ربيع السرحاني">
                    <option>د. ربيع السرحاني</option>
                    <option>د. محمد سعيد رسلان</option>
                    <option>د. صالح أبو الحاج</option>
                  </select>
                </label>
                <label>
                  القسم
                  <select defaultValue="العقيدة">
                    <option>العقيدة</option>
                    <option>الحديث وعلومه</option>
                    <option>الفقه وأصوله</option>
                  </select>
                </label>
                <div className="form-row">
                  <label>
                    الدروس
                    <input defaultValue="89" inputMode="numeric" />
                  </label>
                  <label>
                    الحالة
                    <select defaultValue="مراجعة">
                      <option>منشور</option>
                      <option>مراجعة</option>
                      <option>مسودة</option>
                    </select>
                  </label>
                </div>
                <button className="save-button" type="button">
                  <CheckCircle2 size={18} />
                  حفظ التغييرات
                </button>
              </form>
            </article>
          </aside>
        </section>

        <section className="lower-grid">
          <article className="panel activity-panel">
            <div className="panel-header">
              <div>
                <h2>آخر النشاط</h2>
                <p>أحداث تحرير وتجهيز بيانات اليوم.</p>
              </div>
              <button type="button">
                <Eye size={17} />
                عرض الكل
              </button>
            </div>

            <div className="activity-list">
              {activityItems.map((item) => {
                const Icon = item.icon
                return (
                  <div className="activity-item" key={item.title}>
                    <span className="activity-icon">
                      <Icon size={18} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                    <time>{item.time}</time>
                  </div>
                )
              })}
            </div>
          </article>

          <article className="panel roadmap-panel">
            <div className="panel-header">
              <div>
                <h2>مرحلة العمل الحالية</h2>
                <p>النواة الأساسية: واجهة أمامية ببيانات seed.</p>
              </div>
              <button type="button">
                <CircleHelp size={17} />
                الخطة
              </button>
            </div>
            <div className="roadmap">
              <span className="is-done">تصميم لوحة الأدمن</span>
              <span className="is-current">تثبيت أنواع المحتوى</span>
              <span>صفحات الموقع العامة</span>
              <span>تصميم قاعدة Supabase</span>
            </div>
          </article>
        </section>
      </section>

      <button className="settings-fab" type="button" title="إعدادات">
        <Settings size={20} />
      </button>
      <button className="mobile-menu" type="button">
        <ChevronDown size={18} />
        القائمة
      </button>
    </main>
  )
}

export default App
