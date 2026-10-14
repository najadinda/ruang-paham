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

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat Sistem
- **PHP**: Versi 8.2 atau lebih baru dengan ekstensi `pdo`, `pdo_mysql` / `pdo_sqlite`, `bcmath`, `curl`.
- **Composer**: Versi 2.x
- **Node.js**: Versi 18 atau 20 LTS & npm
- **Database**: MySQL / MariaDB (misal via Laragon atau XAMPP)

---

### 2. Langkah 1: Menjalankan Backend (Laravel RESTful API)
Buka terminal pertama di direktori project:
```bash
cd backend
composer install
php artisan serve --host=127.0.0.1 --port=8000
```
> Server backend akan aktif di: **`http://127.0.0.1:8000`**

*(Catatan: Pastikan file `.env` di folder `backend/` telah terhubung ke database `ruang_paham` dan migrasi/seeder telah dijalankan).*

---

### 3. Langkah 2: Menjalankan Frontend (React + Vite)
Buka terminal kedua di direktori project:
```bash
cd frontend
npm install
npm run dev
```
> Server development frontend akan aktif di: **`http://localhost:5173`**

---

## 📑 Dokumentasi & Prompt Log
Semua catatan arsitektur, analisis kebutuhan, skema tabel database, endpoint API, dan log prompt tersimpan rapi di:  
👉 [`docs/log-prompt.md`](docs/log-prompt.md)
