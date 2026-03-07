# 📤 دليل الرفع على Vercel

## الخطوة 1: رفع المشروع على GitHub

```bash
# تهيئة Git (إذا لم يكن مهيأ بالفعل)
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit - Investor Radar Carousel Maker"

# إنشاء فرع main
git branch -M main

# إضافة remote (استبدل YOUR_USERNAME و YOUR_REPO_NAME بمعلوماتك)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# رفع المشروع
git push -u origin main
```

## الخطوة 2: الرفع على Vercel

### الطريقة A: من خلال الموقع (الأسهل)

1. اذهب إلى [Vercel.com](https://vercel.com)
2. سجل الدخول باستخدام GitHub
3. انقر على **"Add New Project"**
4. اختر **"Import Git Repository"**
5. ابحث عن مستودعك واضغط **"Import"**
6. اترك الإعدادات الافتراضية:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. انقر **"Deploy"**

### الطريقة B: من خلال CLI

```bash
# تثبيت Vercel CLI عالمياً
npm install -g vercel

# الانتقال لمجلد المشروع
cd c:\Users\ASUS\Desktop\ssoo\55

# تسجيل الدخول
vercel login

# رفع المشروع
vercel

# اتبع التعليمات:
# - Set up and deploy? Y
# - Which scope? (اختر حسابك)
# - Link to existing project? N
# - Project name? (اختر اسماً)
# - Directory? ./
# - Override settings? N
```

## الخطوة 3: إضافة متغيرات البيئة (إذا لزم الأمر)

إذا كنت تستخدم API Keys:

1. اذهب إلى مشروعك على Vercel
2. انقر على **"Settings"**
3. اختر **"Environment Variables"**
4. أضف المتغيرات:
   - `GEMINI_API_KEY` (إذا كنت تستخدمه)
5. انقر **"Save"**

## الخطوة 4: التحقق من النشر

بعد اكتمال النشر:
- ستحصل على رابط مثل: `https://your-project-name.vercel.app`
- يمكنك ربط نطاق مخصص من **"Domains"** في الإعدادات

## 📝 ملاحظات مهمة

### ملفات تم إعدادها تلقائياً:

✅ `vercel.json` - إعدادات النشر
✅ `.gitignore` - يستثني الملفات غير الضرورية
✅ `.env.example` - قالب لمتغيرات البيئة
✅ `README.md` - دليل المشروع

### إعدادات Vercel التلقائية:

- **Framework**: Vite (يتم التعرف عليه تلقائياً)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔄 إعادة النشر

### النشر التلقائي:
- أي push على GitHub يتم نشره تلقائياً

### النشر اليدوي:
```bash
vercel --prod
```

## 🎯 روابط مفيدة

- [توثيق Vercel](https://vercel.com/docs)
- [Vite على Vercel](https://vercel.com/docs/frameworks/vite)
- [متغيرات البيئة](https://vercel.com/docs/environment-variables)

## 🆘 حل المشاكل

### المشكلة: البناء يفشل
```bash
# جرب البناء محلياً أولاً
npm run build

# إذا نجح محلياً وفشل على Vercel:
# - تحقق من node_modules في .gitignore
# - تحقق من إصدارات Node.js
```

### المشكلة: CSS لا يعمل
- تأكد من أن `styles.css` يتم استيراده في `App.tsx`
- تحقق من أن المسار صحيح

### المشكلة: الصفحة البيضاء
- افتح Console في المتصفح
- تحقق من الأخطاء
- تأكد من أن `index.html` يشير إلى `index.tsx` بشكل صحيح
