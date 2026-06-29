# خطة الباك اند التفصيلية لمشروع أرشيف القنوات العلمية

## 1. الهدف من الباك اند

الهدف هو تحويل الواجهة الحالية من بيانات وهمية و`localStorage` إلى منصة حقيقية تعمل على Supabase، بحيث يستطيع الأدمن إدارة الأرشيف، ويستطيع الطالب تصفح المحتوى والبحث فيه، ثم نتوسع لاحقا إلى الاستيراد من يوتيوب، حسابات الطلاب، التفريغات، والذكاء الاصطناعي.

المشروع ليس باك اند تقليدي فقط، بل قاعدة معرفة منظمة للمحتوى الشرعي. لذلك يجب أن يكون تصميم البيانات واضحا وقابلا للنمو قبل إضافة المزايا الكبيرة.

## 2. التقنية المعتمدة

| الجزء | الاختيار |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend الأساسي | Supabase |
| Database | PostgreSQL |
| API | Supabase Data REST API + RPC Functions |
| Auth | Supabase Auth |
| Files | Supabase Storage |
| Security | Row Level Security |
| Search | PostgreSQL Full Text Search |
| Smart Search لاحقا | pgvector |
| Background Jobs لاحقا | Edge Functions + Cron أو خدمة منفصلة عند الحاجة |

Supabase مناسب لأن واجهة المشروع يمكنها قراءة البيانات مباشرة من الـ Data API، مع حماية كل شيء عبر RLS. عند الحاجة لمنطق خاص نضيف RPC أو Edge Function بدلا من بناء Laravel كامل من البداية.

## 3. مبادئ التصميم

1. نبدأ بالمرحلة الأولى فقط ولا نبني كل الجداول المستقبلية دفعة واحدة.
2. كل جدول في `public` يجب أن يكون عليه RLS.
3. الزائر يقرأ المحتوى المنشور فقط.
4. الأدمن والمحرر يستطيعان إدارة المحتوى حسب الصلاحيات.
5. لا نضع صلاحيات المستخدم في `user_metadata` لأنها قابلة للتعديل من المستخدم، بل نستخدم جدول roles أو `app_metadata`.
6. نحافظ على العلاقات المهمة: قسم، شيخ، كتاب، دورة، درس، فتوى، محاضرة، مرفقات، وسوم.
7. كل محتوى له حالة نشر: `draft`, `review`, `published`, `archived`.
8. كل محتوى له حقول SEO منذ البداية حتى لا نعيد التصميم لاحقا.
9. لا نجعل الذكاء الاصطناعي مفتي مستقل، بل مساعد بحث يرجع للمصادر والتوقيت.

## 4. مراحل التنفيذ

## المرحلة 1: النواة الأساسية

تشمل:

- الأقسام العلمية.
- المشايخ.
- الكتب.
- الدورات.
- الدروس داخل الدورات.
- المحاضرات المستقلة.
- الفتاوى.
- المرفقات.
- الوسوم.
- بحث أولي.
- لوحة أدمن أساسية.

هذه المرحلة هي الأهم، لأنها تثبت شكل الأرشيف.

## المرحلة 2: الاستيراد من يوتيوب

تشمل:

- إدخال رابط قناة أو Playlist.
- جلب بيانات الفيديوهات.
- تخزين البيانات الخام.
- مراجعة الفيديوهات قبل النشر.
- اكتشاف المكرر.
- تصنيف سريع للفيديوهات.

## المرحلة 3: إدارة المحتوى الموسع

تشمل:

- المقالات.
- الأخبار.
- معرض الصور.
- مكتبة وسائط مركزية.
- إدارة أقسام الصفحة الرئيسية.
- علاقات عامة بين أي محتوى ومحتوى آخر.

## المرحلة 4: حساب الطالب

تشمل:

- تسجيل دخول الطالب.
- الملف الشخصي.
- المفضلة.
- متابعة الدورات.
- سجل المشاهدة.
- التقدم داخل الدروس.

## المرحلة 5: التفاعل

تشمل:

- التعليقات.
- الإعجابات.
- البلاغات.
- النماذج.
- الإشعارات.

## المرحلة 6: التفريغات والبحث المتقدم

تشمل:

- تفريغ الفيديوهات.
- تقسيم التفريغ إلى مقاطع زمنية.
- البحث داخل التفريغ.
- ربط نتيجة البحث بالدقيقة داخل الفيديو.

## المرحلة 7: الذكاء الاصطناعي

تشمل:

- embeddings عبر pgvector.
- RAG Chatbot.
- إجابات بالمصادر فقط.
- تلخيص الدروس.
- اقتراح مسارات دراسة.
- أسئلة مراجعة.

## 5. تصميم قاعدة البيانات للمرحلة الأولى

## 5.1 جدول `profiles`

يمثل ملف المستخدم فوق Supabase Auth.

الحقول:

| الحقل | النوع | الوصف |
|---|---|---|
| id | uuid PK | نفس `auth.users.id` |
| display_name | text | اسم المستخدم |
| avatar_url | text | صورة المستخدم |
| status | text | `active`, `disabled` |
| created_at | timestamptz | تاريخ الإنشاء |
| updated_at | timestamptz | تاريخ التحديث |

الاستخدام:

- ربط المستخدمين بالأدوار.
- لاحقا ملف الطالب.

## 5.2 جدول `roles`

| الحقل | النوع | الوصف |
|---|---|---|
| id | uuid PK |
| key | text unique | مثل `admin`, `editor`, `reviewer`, `student` |
| name_ar | text |
| name_en | text |
| created_at | timestamptz |

## 5.3 جدول `user_roles`

| الحقل | النوع | الوصف |
|---|---|---|
| user_id | uuid FK profiles.id |
| role_id | uuid FK roles.id |
| created_at | timestamptz |

مفتاح مركب: `user_id`, `role_id`.

## 5.4 جدول `categories`

الأقسام العلمية مثل الفقه، العقيدة، الحديث.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| title_ar | text |
| title_en | text |
| description_ar | text |
| description_en | text |
| parent_id | uuid nullable FK categories.id |
| icon_name | text |
| image_path | text |
| sort_order | int |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

فهارس مهمة:

- `categories(slug)`
- `categories(status)`
- `categories(parent_id)`
- `categories(sort_order)`

## 5.5 جدول `teachers`

يمثل المشايخ والأساتذة.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| name_ar | text |
| name_en | text |
| kunya_ar | text |
| kunya_en | text |
| title_ar | text |
| title_en | text |
| bio_short_ar | text |
| bio_short_en | text |
| bio_long_ar | text |
| bio_long_en | text |
| country_ar | text |
| country_en | text |
| specialization_ar | text |
| specialization_en | text |
| madhab_ar | text |
| madhab_en | text |
| birth_year | int nullable |
| death_year | int nullable |
| image_path | text |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

فهارس:

- `teachers(slug)`
- `teachers(status)`
- Full text على الاسم والنبذة.

## 5.6 جدول `books`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| title_ar | text |
| title_en | text |
| author_ar | text |
| author_en | text |
| category_id | uuid FK categories.id |
| description_short_ar | text |
| description_short_en | text |
| description_long_ar | text |
| description_long_en | text |
| cover_path | text |
| pdf_path | text |
| external_url | text |
| pages_count | int |
| volumes_count | int |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

## 5.7 جدول `book_volumes`

للكتب متعددة المجلدات.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| book_id | uuid FK books.id |
| title_ar | text |
| title_en | text |
| volume_number | int |
| pages_count | int |
| cover_path | text |
| pdf_path | text |
| external_url | text |
| sort_order | int |
| created_at | timestamptz |

## 5.8 جدول `courses`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| title_ar | text |
| title_en | text |
| description_short_ar | text |
| description_short_en | text |
| description_long_ar | text |
| description_long_en | text |
| category_id | uuid FK categories.id |
| teacher_id | uuid FK teachers.id |
| level | text |
| thumbnail_path | text |
| youtube_playlist_url | text |
| lessons_count | int |
| duration_minutes | int |
| status | text |
| featured | boolean |
| sort_order | int |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

فهارس:

- `courses(slug)`
- `courses(category_id)`
- `courses(teacher_id)`
- `courses(status)`
- `courses(featured)`

## 5.9 جدول `course_books`

يربط الدورات بالكتب. العلاقة many-to-many.

| الحقل | النوع |
|---|---|
| course_id | uuid FK courses.id |
| book_id | uuid FK books.id |
| relation_type | text | `main_text`, `explained_book`, `reference` |
| sort_order | int |
| created_at | timestamptz |

مفتاح مركب: `course_id`, `book_id`.

## 5.10 جدول `lessons`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| course_id | uuid FK courses.id |
| teacher_id | uuid FK teachers.id |
| category_id | uuid FK categories.id |
| slug | text |
| title_ar | text |
| title_en | text |
| description_ar | text |
| description_en | text |
| lesson_number | int |
| youtube_video_id | text |
| youtube_url | text |
| duration_seconds | int |
| thumbnail_path | text |
| published_at | timestamptz |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

قيود:

- unique على `course_id`, `lesson_number`.
- `youtube_video_id` unique إذا أردنا منع التكرار العام.

فهارس:

- `lessons(course_id, lesson_number)`
- `lessons(status)`
- `lessons(teacher_id)`
- `lessons(category_id)`
- `lessons(youtube_video_id)`

## 5.11 جدول `lectures`

محاضرات مستقلة غير تابعة لدورة.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| title_ar | text |
| title_en | text |
| description_ar | text |
| description_en | text |
| teacher_id | uuid FK teachers.id |
| category_id | uuid FK categories.id |
| youtube_video_id | text |
| youtube_url | text |
| duration_seconds | int |
| thumbnail_path | text |
| published_at | timestamptz |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

## 5.12 جدول `fatwas`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| question_ar | text |
| question_en | text |
| answer_summary_ar | text |
| answer_summary_en | text |
| teacher_id | uuid FK teachers.id |
| category_id | uuid FK categories.id |
| source_type | text | `video`, `audio`, `text` |
| youtube_video_id | text |
| youtube_url | text |
| start_seconds | int |
| end_seconds | int |
| duration_seconds | int |
| thumbnail_path | text |
| status | text |
| seo_title | text |
| seo_description | text |
| seo_keywords | text |
| created_by | uuid |
| updated_by | uuid |
| created_at | timestamptz |
| updated_at | timestamptz |

## 5.13 جدول `attachments`

يربط الملفات والروابط بأي نوع محتوى.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| owner_type | text | `course`, `lesson`, `lecture`, `fatwa`, `book`, `teacher`, `category` |
| owner_id | uuid |
| title_ar | text |
| title_en | text |
| attachment_type | text | `pdf`, `image`, `external_link`, `audio`, `document` |
| storage_path | text |
| external_url | text |
| file_size | bigint |
| mime_type | text |
| sort_order | int |
| status | text |
| created_by | uuid |
| created_at | timestamptz |

ملاحظة: لأن `owner_id` polymorphic، لا يوجد FK مباشر. إذا أردنا صرامة أعلى نستخدم جداول ربط منفصلة مثل `lesson_attachments`، لكن للمرونة في المرحلة الأولى هذا التصميم جيد.

## 5.14 جدول `tags`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| slug | text unique |
| name_ar | text |
| name_en | text |
| description_ar | text |
| description_en | text |
| created_at | timestamptz |

## 5.15 جدول `content_tags`

| الحقل | النوع |
|---|---|
| tag_id | uuid FK tags.id |
| owner_type | text |
| owner_id | uuid |
| created_at | timestamptz |

## 5.16 جدول `audit_logs`

ضروري منذ البداية لمعرفة من عدل وحذف.

| الحقل | النوع |
|---|---|
| id | uuid PK |
| actor_id | uuid |
| action | text | `create`, `update`, `delete`, `publish`, `archive` |
| table_name | text |
| record_id | uuid |
| old_data | jsonb |
| new_data | jsonb |
| created_at | timestamptz |

## 6. جداول المرحلة الثانية: يوتيوب

## 6.1 جدول `youtube_channels`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| youtube_channel_id | text unique |
| title | text |
| url | text |
| thumbnail_url | text |
| imported_at | timestamptz |
| status | text |

## 6.2 جدول `youtube_playlists`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| youtube_playlist_id | text unique |
| channel_id | uuid FK youtube_channels.id |
| title | text |
| description | text |
| thumbnail_url | text |
| videos_count | int |
| imported_at | timestamptz |
| status | text |

## 6.3 جدول `youtube_videos`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| youtube_video_id | text unique |
| channel_id | uuid nullable |
| playlist_id | uuid nullable |
| title | text |
| description | text |
| thumbnail_url | text |
| duration_seconds | int |
| published_at | timestamptz |
| raw_payload | jsonb |
| import_status | text | `new`, `reviewed`, `approved`, `ignored`, `duplicate` |
| matched_content_type | text |
| matched_content_id | uuid |
| created_at | timestamptz |

## 6.4 جدول `import_jobs`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| source_type | text | `channel`, `playlist`, `video` |
| source_url | text |
| status | text | `pending`, `running`, `completed`, `failed` |
| total_items | int |
| processed_items | int |
| error_message | text |
| started_by | uuid |
| started_at | timestamptz |
| finished_at | timestamptz |

## 6.5 جدول `import_items`

| الحقل | النوع |
|---|---|
| id | uuid PK |
| import_job_id | uuid FK import_jobs.id |
| youtube_video_id | text |
| status | text |
| error_message | text |
| raw_payload | jsonb |
| created_at | timestamptz |

## 7. جداول المراحل اللاحقة

## 7.1 الطلاب

الجداول:

- `favorites`
- `user_courses`
- `watch_progress`
- `watch_history`
- `student_notes`

## 7.2 التفاعل

الجداول:

- `comments`
- `likes`
- `reports`
- `forms`
- `form_fields`
- `form_submissions`
- `notifications`

## 7.3 التفريغات والذكاء الاصطناعي

الجداول:

- `transcripts`
- `transcript_chunks`
- `embeddings`
- `ai_queries`
- `ai_citations`

## 8. API المطلوب

في Supabase يوجد نوعان من الـ API:

1. API تلقائي عبر الجداول والـ Views.
2. API مخصص عبر RPC Functions أو Edge Functions.

الأصل أن نستخدم API الجداول للقراءة والكتابة البسيطة، ونستخدم RPC عندما نحتاج استعلام مركب أو عملية خاصة.

## 8.1 Public Read APIs

هذه APIs يستخدمها الزائر.

### الصفحة الرئيسية

`GET /rest/v1/homepage_view`

يرجع:

- الأقسام الظاهرة.
- الدورات المميزة.
- أحدث الدروس.
- أحدث الفتاوى.
- مشايخ مختارون.
- أرقام عامة.

يفضل أن تكون `homepage_view` View أو RPC:

`rpc_get_homepage()`

### الأقسام

`GET /rest/v1/categories?status=eq.published&order=sort_order.asc`

استخدام:

- صفحة الأقسام.
- فلاتر الدورات.
- فلاتر الفتاوى.

### تفاصيل قسم

`GET /rest/v1/categories?slug=eq.{slug}&select=*`

ثم:

`GET /rest/v1/courses?category_id=eq.{id}&status=eq.published`

أو RPC أفضل:

`POST /rest/v1/rpc/get_category_detail`

المدخل:

```json
{ "category_slug": "fiqh" }
```

يرجع:

- بيانات القسم.
- الدورات.
- المشايخ.
- الكتب.
- الفتاوى.
- المحاضرات.

### الدورات

`GET /rest/v1/courses`

فلاتر:

- `category_id`
- `teacher_id`
- `level`
- `status=published`
- `featured`
- search term عبر RPC

مثال:

`GET /rest/v1/courses?status=eq.published&category_id=eq.{id}&order=created_at.desc`

### تفاصيل دورة

يفضل RPC:

`POST /rest/v1/rpc/get_course_detail`

المدخل:

```json
{ "course_slug": "manhaj-salikin" }
```

يرجع:

- الدورة.
- الشيخ.
- القسم.
- الكتب المرتبطة.
- الدروس مرتبة.
- المرفقات.
- دورات مشابهة.

### مشاهدة درس

`POST /rest/v1/rpc/get_lesson_watch`

المدخل:

```json
{ "course_slug": "manhaj-salikin", "lesson_number": 5 }
```

يرجع:

- بيانات الدرس.
- رابط يوتيوب.
- السابق والتالي.
- مرفقات الدرس.
- بيانات الدورة.
- بيانات الشيخ.

### المشايخ

`GET /rest/v1/teachers?status=eq.published&order=name_ar.asc`

### تفاصيل شيخ

`POST /rest/v1/rpc/get_teacher_profile`

المدخل:

```json
{ "teacher_slug": "ibn-baz" }
```

يرجع:

- بيانات الشيخ.
- دوراته.
- محاضراته.
- فتاواه.
- كتبه أو شروحاته.

### الكتب

`GET /rest/v1/books?status=eq.published`

### تفاصيل كتاب

`POST /rest/v1/rpc/get_book_detail`

يرجع:

- بيانات الكتاب.
- المجلدات.
- الدورات التي تشرحه.
- المرفقات.
- كتب مشابهة.

### الفتاوى

`GET /rest/v1/fatwas?status=eq.published`

فلاتر:

- `teacher_id`
- `category_id`
- `tag`
- search term

### تفاصيل فتوى

`GET /rest/v1/fatwas?slug=eq.{slug}&select=*,teacher:teachers(*),category:categories(*)`

أو:

`POST /rest/v1/rpc/get_fatwa_detail`

### المحاضرات

`GET /rest/v1/lectures?status=eq.published`

فلاتر:

- الشيخ.
- القسم.
- الوسم.
- التاريخ.

### البحث العام

`POST /rest/v1/rpc/search_public_content`

المدخل:

```json
{
  "query_text": "الطهارة",
  "content_types": ["course", "lesson", "fatwa", "book", "teacher", "lecture"],
  "category_id": null,
  "teacher_id": null,
  "limit_count": 20,
  "offset_count": 0
}
```

يرجع:

- النوع.
- العنوان.
- الوصف.
- الرابط.
- الشيخ.
- القسم.
- score.

## 8.2 Admin APIs

هذه APIs تحتاج مستخدم مصادق وله دور `admin` أو `editor`.

### إدارة الأقسام

- `GET /rest/v1/categories`
- `POST /rest/v1/categories`
- `PATCH /rest/v1/categories?id=eq.{id}`
- `DELETE /rest/v1/categories?id=eq.{id}`

عمليات إضافية:

`POST /rest/v1/rpc/reorder_categories`

### إدارة المشايخ

- `GET /rest/v1/teachers`
- `POST /rest/v1/teachers`
- `PATCH /rest/v1/teachers?id=eq.{id}`
- `DELETE /rest/v1/teachers?id=eq.{id}`

### إدارة الكتب

- `GET /rest/v1/books`
- `POST /rest/v1/books`
- `PATCH /rest/v1/books?id=eq.{id}`
- `DELETE /rest/v1/books?id=eq.{id}`

### إدارة مجلدات الكتب

- `GET /rest/v1/book_volumes?book_id=eq.{book_id}`
- `POST /rest/v1/book_volumes`
- `PATCH /rest/v1/book_volumes?id=eq.{id}`
- `DELETE /rest/v1/book_volumes?id=eq.{id}`

### إدارة الدورات

- `GET /rest/v1/courses`
- `POST /rest/v1/courses`
- `PATCH /rest/v1/courses?id=eq.{id}`
- `DELETE /rest/v1/courses?id=eq.{id}`

### ربط الكتب بالدورات

- `GET /rest/v1/course_books?course_id=eq.{course_id}`
- `POST /rest/v1/course_books`
- `DELETE /rest/v1/course_books?course_id=eq.{course_id}&book_id=eq.{book_id}`

RPC مريح:

`POST /rest/v1/rpc/set_course_books`

المدخل:

```json
{
  "course_id": "uuid",
  "book_ids": ["uuid1", "uuid2"]
}
```

### إدارة الدروس

- `GET /rest/v1/lessons?course_id=eq.{course_id}&order=lesson_number.asc`
- `POST /rest/v1/lessons`
- `PATCH /rest/v1/lessons?id=eq.{id}`
- `DELETE /rest/v1/lessons?id=eq.{id}`

RPC:

`POST /rest/v1/rpc/reorder_lessons`

### إدارة المحاضرات

- `GET /rest/v1/lectures`
- `POST /rest/v1/lectures`
- `PATCH /rest/v1/lectures?id=eq.{id}`
- `DELETE /rest/v1/lectures?id=eq.{id}`

### إدارة الفتاوى

- `GET /rest/v1/fatwas`
- `POST /rest/v1/fatwas`
- `PATCH /rest/v1/fatwas?id=eq.{id}`
- `DELETE /rest/v1/fatwas?id=eq.{id}`

### إدارة المرفقات

- `GET /rest/v1/attachments?owner_type=eq.lesson&owner_id=eq.{id}`
- `POST /rest/v1/attachments`
- `PATCH /rest/v1/attachments?id=eq.{id}`
- `DELETE /rest/v1/attachments?id=eq.{id}`

### إدارة الوسوم

- `GET /rest/v1/tags`
- `POST /rest/v1/tags`
- `PATCH /rest/v1/tags?id=eq.{id}`
- `DELETE /rest/v1/tags?id=eq.{id}`

### ربط الوسوم

- `POST /rest/v1/content_tags`
- `DELETE /rest/v1/content_tags?tag_id=eq.{tag_id}&owner_type=eq.{type}&owner_id=eq.{id}`

## 8.3 Auth APIs

هذه تأتي من Supabase Auth عبر `supabase-js`.

### تسجيل الدخول

```ts
supabase.auth.signInWithPassword({ email, password })
```

### تسجيل الخروج

```ts
supabase.auth.signOut()
```

### المستخدم الحالي

```ts
supabase.auth.getUser()
```

### جلب الدور

يفضل RPC:

`POST /rest/v1/rpc/get_current_user_roles`

يرجع:

```json
["admin", "editor"]
```

## 8.4 Storage APIs

Buckets مقترحة:

| Bucket | Public? | الاستخدام |
|---|---|---|
| `public-images` | yes | صور عامة: أغلفة، مشايخ، thumbnails |
| `public-files` | yes | PDF وملفات عامة |
| `private-imports` | no | ملفات استيراد مؤقتة |
| `avatars` | protected | صور المستخدمين |

عمليات:

- رفع صورة شيخ.
- رفع غلاف كتاب.
- رفع PDF كتاب.
- رفع مرفق درس.
- حذف ملف عند حذف السجل.

مهم: التحكم الحقيقي عبر Storage Policies، وليس فقط من الواجهة.

## 8.5 Edge Functions المطلوبة

نبدأ بدون Edge Functions قدر الإمكان. نضيفها عندما توجد عملية لا يجب تنفيذها من المتصفح.

### `youtube-import-start`

المهمة:

- يستقبل رابط قناة أو Playlist.
- ينشئ `import_job`.
- يجلب بيانات يوتيوب.
- يخزن العناصر في `youtube_videos` و`import_items`.

المدخل:

```json
{
  "source_type": "playlist",
  "source_url": "https://youtube.com/playlist?list=..."
}
```

المخرجات:

```json
{
  "job_id": "uuid",
  "status": "pending"
}
```

### `youtube-import-refresh`

المهمة:

- تحديث قناة أو Playlist موجودة.
- اكتشاف الفيديوهات الجديدة.
- تحديث حالة الفيديوهات المحذوفة أو الخاصة.

### `generate-slug`

ليست ضرورية إذا عملناها داخل Postgres trigger، لكن يمكن استخدامها إذا أردنا توحيد توليد الروابط.

### `transcribe-video`

لاحقا:

- يأخذ فيديو.
- يرسل الصوت إلى خدمة تفريغ.
- يخزن transcript وchunks.

### `generate-embeddings`

لاحقا:

- يحول transcript chunks إلى embeddings.
- يخزنها في pgvector.

### `ai-search`

لاحقا:

- يستقبل سؤال.
- يبحث في embeddings.
- يرجع مصادر مع توقيتات.
- لا يصدر فتوى مستقلة.

## 9. صلاحيات RLS

## 9.1 أدوار النظام

| الدور | الصلاحيات |
|---|---|
| anon | قراءة المحتوى المنشور فقط |
| authenticated | قراءة المحتوى المنشور + ميزات الطالب |
| student | المفضلة، التقدم، سجل المشاهدة |
| editor | إنشاء وتعديل المحتوى غير الحساس |
| reviewer | مراجعة ونشر المحتوى |
| admin | كل شيء |

## 9.2 سياسات عامة

لكل جدول محتوى:

- `SELECT` للزائر فقط عندما `status = 'published'`.
- `SELECT` للأدمن والمحرر لكل الحالات.
- `INSERT` للمحرر والأدمن.
- `UPDATE` للمحرر والأدمن.
- `DELETE` للأدمن فقط أو نستخدم soft delete.

## 9.3 Helper Functions

نحتاج دوال Postgres خاصة بالصلاحيات:

- `auth_has_role(role_key text)`
- `auth_is_admin()`
- `auth_can_edit_content()`
- `auth_can_publish()`

ويفضل وضع دوال security-definer في schema غير مكشوف مثل `private`، أو الانتباه لتقييد الوصول لها.

## 10. البحث

## 10.1 البحث الأولي

نستخدم PostgreSQL Full Text Search.

مطلوب:

- عمود `search_vector` في الجداول الأساسية أو view موحدة.
- تحديثه عبر trigger.
- دعم العربية والإنجليزية قدر الإمكان.

الجداول التي تدخل البحث:

- categories
- teachers
- books
- courses
- lessons
- lectures
- fatwas

## 10.2 Search View

يمكن إنشاء view:

`public_search_index`

الحقول:

| الحقل | الوصف |
|---|---|
| owner_type | نوع المحتوى |
| owner_id | المعرف |
| title | العنوان |
| description | الوصف |
| slug | الرابط |
| category_id | القسم |
| teacher_id | الشيخ |
| status | حالة النشر |
| search_vector | نص البحث |

مهم: إذا استخدمنا View مع Supabase يجب أن نراعي RLS، ويفضل أن تكون `security_invoker = true` في Postgres 15+.

## 10.3 البحث الذكي لاحقا

عند إضافة التفريغات:

- جدول `transcripts`.
- جدول `transcript_chunks`.
- جدول `chunk_embeddings`.
- البحث عبر pgvector.
- كل نتيجة تعرض: الدرس، الشيخ، الدقيقة، النص.

## 11. الواجهة مع Supabase

## 11.1 ملفات مقترحة في React

```txt
src/lib/supabaseClient.ts
src/lib/supabaseTypes.ts
src/services/categoriesApi.ts
src/services/teachersApi.ts
src/services/booksApi.ts
src/services/coursesApi.ts
src/services/lessonsApi.ts
src/services/fatwasApi.ts
src/services/searchApi.ts
src/services/adminApi.ts
src/services/storageApi.ts
src/context/AuthContext.tsx
```

## 11.2 متغيرات البيئة

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

لا نضع `service_role` في الواجهة أبدا.

## 11.3 Typed Database

بعد إنشاء الجداول نولد أنواع TypeScript من Supabase CLI:

```bash
supabase gen types typescript --project-id <project-ref> > src/lib/database.types.ts
```

## 12. خطة الهجرة من البيانات الحالية

البيانات الحالية موجودة في:

- `src/data/shared/archive.ts`
- `src/context/ArchiveDataContext.tsx`
- `localStorage`

الخطوات:

1. تثبيت schema في Supabase.
2. كتابة seed SQL أو سكربت import.
3. تحويل `sharedCategories` إلى `categories`.
4. تحويل `sharedScholars` إلى `teachers`.
5. تحويل `sharedBooks` إلى `books`.
6. تحويل `sharedCourses` إلى `courses`.
7. تحويل `lessonsByCourse` إلى `lessons`.
8. تحويل `sharedFatwas` إلى `fatwas`.
9. ربط الدورات بالكتب عند توفر البيانات.
10. تعديل الواجهة لتقرأ من Supabase بدلا من seed.
11. إبقاء seed كـ fallback أثناء التطوير فقط.

## 13. صفحات الأدمن المطلوبة للمرحلة الأولى

## 13.1 Dashboard

يعرض:

- عدد الأقسام.
- عدد المشايخ.
- عدد الكتب.
- عدد الدورات.
- عدد الدروس.
- عدد الفتاوى.
- عدد المحتوى تحت المراجعة.

API:

`POST /rest/v1/rpc/get_admin_dashboard_stats`

## 13.2 إدارة الأقسام

وظائف:

- عرض.
- بحث.
- إضافة.
- تعديل.
- حذف أو أرشفة.
- ترتيب.

## 13.3 إدارة المشايخ

وظائف:

- عرض.
- بحث.
- إضافة بيانات الشيخ.
- صورة.
- SEO.
- حالة النشر.

## 13.4 إدارة الكتب

وظائف:

- بيانات الكتاب.
- الغلاف.
- PDF.
- مجلدات.
- ربط بالدورات.

## 13.5 إدارة الدورات

وظائف:

- بيانات الدورة.
- الشيخ.
- القسم.
- المستوى.
- الكتب.
- الصورة.
- الحالة.
- الدروس.

## 13.6 إدارة الدروس

وظائف:

- إضافة درس.
- رقم الدرس.
- رابط يوتيوب.
- مدة.
- مرفقات.
- إعادة ترتيب.

## 13.7 إدارة الفتاوى

وظائف:

- سؤال.
- جواب مختصر إن وجد.
- الشيخ.
- القسم.
- رابط الفيديو.
- توقيت البداية والنهاية.

## 14. شكل API Services في الواجهة

مثال:

```ts
export async function getPublishedCourses(filters) {
  let query = supabase
    .from('courses')
    .select('*, teacher:teachers(*), category:categories(*)')
    .eq('status', 'published')

  if (filters.categoryId) query = query.eq('category_id', filters.categoryId)
  if (filters.teacherId) query = query.eq('teacher_id', filters.teacherId)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data
}
```

للتفاصيل المركبة:

```ts
export async function getCourseDetail(slug: string) {
  const { data, error } = await supabase.rpc('get_course_detail', {
    course_slug: slug,
  })
  if (error) throw error
  return data
}
```

## 15. API مفصل حسب الصفحات الحالية

## 15.1 `LandingPage`

تحتاج:

- `get_homepage`
- `categories`
- featured courses
- featured teachers
- latest content

## 15.2 `CategoriesPage`

تحتاج:

- `categories`
- counts لكل قسم.

RPC:

`get_categories_with_counts`

## 15.3 `CategoryDetailPage`

تحتاج:

- بيانات القسم.
- دورات القسم.
- كتب القسم.
- فتاوى القسم.
- مشايخ القسم.

RPC:

`get_category_detail`

## 15.4 `CoursesPage`

تحتاج:

- قائمة دورات.
- فلاتر الأقسام.
- فلاتر المشايخ.
- فلاتر الكتب.
- بحث.

RPC:

`search_courses`

## 15.5 `CourseDetailPage`

تحتاج:

- بيانات الدورة.
- الدروس.
- الكتب.
- مرفقات.
- الشيخ.
- دورات مشابهة.

RPC:

`get_course_detail`

## 15.6 `LibraryPage`

تحتاج:

- كتب.
- فلاتر أقسام.
- فلاتر مؤلف.
- فلاتر وجود PDF.

## 15.7 `LibraryDetailPage`

تحتاج:

- كتاب.
- مجلدات.
- دورات تشرحه.
- كتب مشابهة.

RPC:

`get_book_detail`

## 15.8 `ScholarsPage`

تحتاج:

- مشايخ.
- فلاتر تخصص وقسم.

## 15.9 `ScholarProfilePage`

تحتاج:

- بيانات الشيخ.
- دوراته.
- محاضراته.
- فتاواه.
- كتبه.

RPC:

`get_teacher_profile`

## 15.10 `FatwaPage`

تحتاج:

- فتاوى.
- بحث.
- فلاتر شيخ وقسم ووسم.

RPC:

`search_fatwas`

## 15.11 `SearchResultsPage`

تحتاج:

- بحث موحد في كل المحتوى.

RPC:

`search_public_content`

## 16. خطة الحماية

1. RLS على كل الجداول.
2. `anon` يقرأ `published` فقط.
3. `authenticated` يقرأ `published` فقط مع بياناته الشخصية.
4. `editor` يعدل المحتوى.
5. `reviewer` ينشر أو يرجع للمراجعة.
6. `admin` يدير كل شيء.
7. عدم حذف حقيقي للمحتوى المهم، بل `archived` أو `deleted_at`.
8. audit logs لكل عمليات الأدمن.
9. Storage policies تمنع رفع الملفات إلا للمحررين.
10. Edge Functions التي تستخدم مفاتيح سرية لا تستدعى إلا من أدمن.

## 17. خطة الاختبار

## 17.1 اختبارات قاعدة البيانات

- هل الزائر يرى المنشور فقط؟
- هل لا يرى draft؟
- هل المحرر يستطيع الإضافة؟
- هل الطالب لا يستطيع تعديل المحتوى؟
- هل حذف الدورة لا يكسر الدروس؟
- هل ربط الكتاب بالدورة يعمل؟

## 17.2 اختبارات الواجهة

- الصفحة الرئيسية من Supabase.
- صفحة دورة مع دروسها.
- صفحة كتاب مع شروحه.
- صفحة شيخ مع محتواه.
- البحث.
- تسجيل دخول الأدمن.
- إضافة دورة من الأدمن ثم ظهورها في الجمهور بعد النشر.

## 17.3 اختبارات الأمان

- تجربة قراءة draft باستخدام anon.
- تجربة تعديل محتوى بدون تسجيل.
- تجربة رفع ملف بدون صلاحية.
- تجربة مستخدم student على admin API.

## 18. ترتيب التنفيذ العملي

1. إنشاء مشروع Supabase.
2. إنشاء الجداول الأساسية.
3. تفعيل RLS.
4. إنشاء roles وhelper functions.
5. إنشاء policies.
6. إنشاء buckets.
7. كتابة seed data أولية.
8. إنشاء RPC للصفحات المركبة.
9. إضافة `supabase-js` للواجهة.
10. إنشاء `supabaseClient`.
11. إنشاء services.
12. ربط صفحات الجمهور.
13. ربط صفحات الأدمن.
14. إضافة Auth.
15. اختبار الصلاحيات.
16. إزالة الاعتماد على `localStorage`.
17. تجهيز المرحلة الثانية: YouTube import.

## 19. قائمة RPC المقترحة

| RPC | الغرض |
|---|---|
| `get_homepage` | بيانات الصفحة الرئيسية |
| `get_categories_with_counts` | الأقسام مع أعداد المحتوى |
| `get_category_detail` | صفحة القسم |
| `get_course_detail` | صفحة الدورة |
| `get_lesson_watch` | صفحة مشاهدة الدرس |
| `get_teacher_profile` | صفحة الشيخ |
| `get_book_detail` | صفحة الكتاب |
| `search_public_content` | البحث العام |
| `search_courses` | بحث الدورات |
| `search_fatwas` | بحث الفتاوى |
| `get_admin_dashboard_stats` | إحصائيات الأدمن |
| `set_course_books` | ربط الكتب بالدورات |
| `reorder_lessons` | ترتيب الدروس |
| `reorder_categories` | ترتيب الأقسام |
| `get_current_user_roles` | أدوار المستخدم الحالي |

## 20. قائمة Edge Functions المقترحة

| Function | المرحلة | الغرض |
|---|---:|---|
| `youtube-import-start` | 2 | بدء استيراد قناة أو Playlist |
| `youtube-import-refresh` | 2 | تحديث استيراد سابق |
| `youtube-detect-duplicates` | 2 | كشف التكرار |
| `transcribe-video` | 6 | تفريغ فيديو |
| `generate-embeddings` | 7 | توليد embeddings |
| `ai-search` | 7 | بحث ذكي بالمصادر |

## 21. القرار المعماري النهائي

للمشروع الحالي، الأفضل هو:

```txt
React + TypeScript
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Supabase REST API
Postgres RPC Functions
Edge Functions عند الحاجة فقط
```

ولا نحتاج Laravel الآن. Laravel يصبح مفيدا فقط إذا ظهر لاحقا منطق سيرفر ثقيل جدا، مثل نظام دفع معقد، processing طويل، أو لوحة إدارة مؤسسية منفصلة. أما المرحلة الحالية فهي أرشيف ومحتوى وعلاقات وبحث، وهذا مناسب جدا لـ Supabase.

## 22. مصادر رسمية اعتمدت عليها الخطة

- Supabase Data REST API: https://supabase.com/docs/guides/api
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Securing Supabase APIs: https://supabase.com/docs/guides/api/securing-your-api
- Supabase Database overview: https://supabase.com/docs/guides/database/overview
- Supabase Database Functions: https://supabase.com/docs/guides/database/functions
