# Ruang Paham 🚀
> Platform pembelajaran interaktif dan ramah anak untuk siswa Sekolah Dasar (Kelas 1 - 6 SD).

---

## 🌟 Ikhtisar Proyek

Proyek **Ruang Paham** dirancang khusus untuk anak-anak dengan estetika visual ramah anak, bersih, responsif, dan kaya gamifikasi.

### 🎨 Desain & UI/UX
- **Palet Warna Utama (Blue-Themed):**
  - **Primary Blue (`#3B82F6`)**: Tombol utama, header, dan CTA.
  - **Accent Blue (`#93C5FD`)**: Latar belakang card dan aksen pendukung.
  - **Background (`#F8FAFC`)**: Putih salju lembut agar mata anak tidak lelah.
  - **Text (`#1E293B`)**: Biru dongker gelap kontras tinggi agar nyaman dibaca.
- **Tipografi:** Menggunakan font **Poppins** dari Google Fonts.
- **Elemen & Interaksi:**
  - Border-radius besar (`20px - 28px`) dan soft shadow pastel.
  - Ikon ilustratif di setiap card.
  - Animasi smooth fade-in, micro-interactions bouncy, dan tombol berdenyut (*pulse effect*).
  - Privasi anak terjamin: tanpa fitur unggah foto wajah asli, diganti dengan galeri avatar robot dan satwa lucu.

---

## 🗂️ Struktur Direktori

```
ruang-paham/
├── docs/
│   └── log-prompt.md      # Rekam jejak prompt, arsitektur, dan spesifikasi sistem
├── backend/               # Laravel RESTful API (Sanctum Headless CMS)
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── SubjectController.php
│   │   │   ├── LessonController.php
│   │   │   ├── QuizController.php
│   │   │   └── DashboardController.php
│   │   └── Models/
│   │       ├── Subject.php, Lesson.php, Quiz.php, UserProgress.php, User.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/ (SubjectSeeder, LessonSeeder, QuizSeeder, DatabaseSeeder)
│   └── routes/api.php
└── frontend/              # React JS (Vite + Framer Motion + Lucide Icons)
    ├── src/
    │   ├── components/ (Navbar, Footer, StreakFlame, CircularProgress)
    │   ├── pages/ (Landing, Register, Login, Dashboard, Explore, LessonDetail, Profile)
    │   ├── context/ (AuthContext.jsx)
    │   ├── services/ (api.js)
    │   ├── utils/ (avatars.jsx)
    │   ├── App.jsx
    │   └── index.css
```

---

## 🚀 Panduan Menjalankan Proyek (1 Rute Web.php Terpadu)

Website Ruang Paham telah disatukan sepenuhnya ke dalam **Laravel (`backend/routes/web.php`)**, di mana seluruh rute API, Autentikasi, dan Frontend SPA React disajikan secara langsung dari 1 instance Laravel:

### Cara Menjalankan:
Cukup jalankan Laravel backend (atau buka via Laragon):
```bash
cd d:\laragon\www\ruang-paham\backend
php artisan serve
```

### 🌐 Akses Website:
Buka di browser:
👉 **`http://127.0.0.1:8000`** *(atau `http://localhost:8000`)*

*(Frontend dan Backend berjalan bersamaan dalam 1 server Laravel, tanpa perlu file script tambahan)*

---

## 👥 Akun Uji Coba (Seeded Demo Accounts)

| Nama Siswa | Email | Password | Kelas | Catatan |
| :--- | :--- | :--- | :--- | :--- |
| **Budi Pratama** | `budi@ruangpaham.id` | `password123` | Kelas 3 SD | Siswa aktif (Streak 5 hari 🔥, 140 ⭐, untuk uji coba Kondisi 1 Lanjutkan Belajar) |
| **Siti Aisyah** | `siti@ruangpaham.id` | `password123` | Kelas 1 SD | Siswa baru (Streak 1 hari 🔥, 0 ⭐, untuk uji coba Kondisi 2 Empty State "Kamu belum mulai belajar") |

---

## 📑 Dokumentasi & Prompt Log
Semua catatan arsitektur, analisis kebutuhan, skema tabel database, endpoint API, dan log prompt tersimpan rapi di:  
👉 [`docs/log-prompt.md`](docs/log-prompt.md)
