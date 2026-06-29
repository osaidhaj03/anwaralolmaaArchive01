# ملخص قوي لخطة الباك اند

## القرار

الأفضل لمشروع أرشيف القنوات العلمية هو اعتماد:

```txt
React + TypeScript + Supabase
```

وليس Laravel في هذه المرحلة.

السبب أن المشروع يحتاج قاعدة بيانات علاقات قوية، Auth، Storage، بحث، وصلاحيات، وليس باك اند تقليدي كبير. Supabase يعطي هذه الأشياء مباشرة فوق PostgreSQL مع API تلقائي وRLS.

## ما هو المشروع؟

المشروع أرشيف علمي شرعي منظم لمحتوى يوتيوب، يبدأ بعرض وإدارة:

- الأقسام العلمية.
- المشايخ.
- الكتب.
- الدورات.
- الدروس.
- المحاضرات.
- الفتاوى.
- المرفقات.
- الوسوم.
- البحث.

ثم يتوسع لاحقا إلى:

- استيراد من يوتيوب.
- حسابات الطلاب.
- المفضلة والتقدم.
- التعليقات والتفاعل.
- التفريغات.
- البحث داخل الفيديو.
- ذكاء اصطناعي يرجع للمصادر ولا يفتي من نفسه.

## لماذا Supabase؟

Supabase مناسب لأنه يوفر:

- PostgreSQL للعلاقات المعقدة.
- REST API تلقائي لكل الجداول.
- Auth لتسجيل الأدمن والطلاب.
- Storage للصور وPDF والمرفقات.
- RLS لحماية البيانات.
- Full Text Search للبحث.
- pgvector لاحقا للبحث الذكي.
- Edge Functions عند الحاجة لمنطق خاص.

## أهم جداول المرحلة الأولى

الجداول الأساسية:

- `profiles`
- `roles`
- `user_roles`
- `categories`
- `teachers`
- `books`
- `book_volumes`
- `courses`
- `course_books`
- `lessons`
- `lectures`
- `fatwas`
- `attachments`
- `tags`
- `content_tags`
- `audit_logs`

هذه الجداول تكفي لتشغيل أرشيف حقيقي قابل للإدارة.

## أهم APIs

Supabase سيولد CRUD API تلقائيا للجداول، ونضيف RPC للصفحات المركبة.

أهم RPC:

- `get_homepage`
- `get_categories_with_counts`
- `get_category_detail`
- `get_course_detail`
- `get_lesson_watch`
- `get_teacher_profile`
- `get_book_detail`
- `search_public_content`
- `get_admin_dashboard_stats`
- `set_course_books`
- `reorder_lessons`
- `get_current_user_roles`

## الصلاحيات

الأدوار:

- `anon`: يقرأ المنشور فقط.
- `student`: يقرأ المنشور ويستخدم المفضلة والتقدم لاحقا.
- `editor`: يضيف ويعدل المحتوى.
- `reviewer`: يراجع وينشر.
- `admin`: كامل الصلاحيات.

كل جدول في `public` يجب أن يكون عليه RLS. الزائر لا يرى إلا `status = published`.

## التخزين

Buckets مقترحة:

- `public-images`: صور المشايخ والأغلفة.
- `public-files`: PDF والمرفقات العامة.
- `private-imports`: ملفات وبيانات الاستيراد المؤقتة.
- `avatars`: صور المستخدمين.

## خطة التنفيذ

1. إنشاء مشروع Supabase.
2. بناء الجداول الأساسية.
3. تفعيل RLS والسياسات.
4. إنشاء Storage buckets.
5. نقل بيانات seed الحالية إلى Supabase.
6. ربط صفحات الجمهور بالبيانات الحقيقية.
7. ربط لوحة الأدمن.
8. إضافة Auth للأدمن.
9. إضافة البحث.
10. بعد ثبات النواة، نبدأ استيراد يوتيوب.

## الخلاصة

ابدأ بـ Supabase الآن.  
لا تدخل Laravel إلا إذا ظهر لاحقا احتياج حقيقي لمنطق سيرفر كبير.

المسار الصحيح:

```txt
واجهة موجودة -> Supabase schema -> RLS -> APIs/RPC -> ربط الواجهة -> استيراد يوتيوب -> الطلاب -> التفريغات -> AI
```
