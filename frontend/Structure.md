ecommerce-frontend/
│
├── src/
│ ├── api/ # همه‌ی درخواست‌های axios به بک‌اند
│ │ ├── axiosClient.js
│ │ ├── authApi.js
│ │ ├── productApi.js
│ │ ├── cartApi.js
│ │ ├── orderApi.js
│ │ ├── paymentApi.js
│ │ └── reviewApi.js
│ │
│ ├── assets/ # عکس‌ها، آیکون‌ها و فایل‌های استاتیک
│ │ └── logo.png
│ │
│ ├── components/ # کامپوننت‌های تکرارپذیر
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ ├── ProductCard.jsx
│ │ ├── ProductList.jsx
│ │ ├── ReviewCard.jsx
│ │ ├── RatingStars.jsx
│ │ ├── CartItem.jsx
│ │ └── ProtectedRoute.jsx # برای کنترل دسترسی صفحات لاگین‌شده
│ │
│ ├── context/ # مدیریت state عمومی (Cart, Auth, ...)
│ │ ├── AuthContext.jsx
│ │ ├── CartContext.jsx
│ │ └── ThemeContext.jsx (اختیاری)
│ │
│ ├── hooks/ # هوک‌های اختصاصی (مثلاً useAuth، useFetch)
│ │ └── useAuth.js
│ │
│ ├── layouts/ # قالب‌های کلی صفحات
│ │ ├── MainLayout.jsx
│ │ └── AuthLayout.jsx
│ │
│ ├── pages/ # صفحات اصلی سایت
│ │ ├── Home.jsx
│ │ ├── ProductDetail.jsx
│ │ ├── Cart.jsx
│ │ ├── Checkout.jsx
│ │ ├── Orders.jsx
│ │ ├── Profile.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ │
│ ├── routes/ # مسیرها و تنظیمات React Router
│ │ └── AppRouter.jsx
│ │
│ │
│ │
│ ├── index.css
│ ├── App.jsx # ریشه اصلی اپ
│ ├── main.jsx # نقطه ورود به React (Vite)
│ └── index.html # فایل HTML اصلی (برای Vite)
│
├── package.json
└── vite.config.js
