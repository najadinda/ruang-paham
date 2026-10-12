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

### Cara Menjalankan:
Cukup jalankan frontend :
```bash
cd d:\laragon\www\ruang-paham\frontend
npm install
npm run dev
```

### 🌐 Akses Website:
Buka di browser:
👉 **`http://localhost:5173/`** 

*(Frontend berjalan di server Vite, Backend berjalan di server Laravel)*

---

## 📑 Dokumentasi & Prompt Log
Semua catatan arsitektur, analisis kebutuhan, skema tabel database, endpoint API, dan log prompt tersimpan rapi di:  
👉 [`docs/log-prompt.md`](docs/log-prompt.md)
