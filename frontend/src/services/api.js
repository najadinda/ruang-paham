const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('rp_token');
  // Pastikan token valid dan bukan string literal "undefined" atau "null"
  const isValidToken = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(isValidToken ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

/**
 * Universal safe request wrapper:
 * 1. Menangkap network error (koneksi ditolak / backend mati) -> pesan anak-anak yang ramah
 * 2. Membaca response sebagai text terlebih dahulu (TIDAK PERNAH memanggil res.json() mentah)
 * 3. Menangani Content-Type non-JSON atau respons kosong dengan aman
 * 4. Membedakan status kode 401, 403, 404, 419, 422, 500, 502, 503, 504
 * 5. Mencegah error "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
 */
async function request(endpoint, options = {}, defaultErrorMsg = 'Terjadi kendala pada server. Silakan coba lagi.') {
  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, options);
  } catch (networkErr) {
    // Tangani jika backend offline / koneksi terputus / fetch gagal
    console.warn(`[Ruang Paham API] Network error on ${endpoint}:`, networkErr?.message);
    throw new Error('Tidak dapat terhubung ke server. Silakan periksa koneksi atau tunggu server backend aktif, lalu coba lagi beberapa saat.');
  }

  // Baca body secara aman sebagai text (hindari res.json() mentah)
  let rawText = '';
  try {
    rawText = await res.text();
  } catch {
    rawText = '';
  }

  // Parse JSON jika terdapat payload yang valid
  let json = null;
  if (rawText && rawText.trim() !== '') {
    try {
      json = JSON.parse(rawText);
    } catch {
      // Respons bukan JSON (misalnya HTML error atau plain text)
      json = null;
    }
  }

  // Penanganan HTTP status code error
  if (!res.ok) {
    // 502 Bad Gateway / 503 Service Unavailable / 504 Gateway Timeout
    if (res.status === 502 || res.status === 503 || res.status === 504) {
      throw new Error('Server backend sedang bersiap atau belum aktif (port 8000). Silakan tunggu sebentar dan coba lagi.');
    }

    // 419 CSRF Token Expired / Session Expired
    if (res.status === 419) {
      throw new Error('Sesi telah berakhir. Silakan muat ulang halaman dan coba lagi.');
    }

    // 404 Not Found
    if (res.status === 404) {
      const msg = json?.message || 'Data atau halaman yang dicari tidak ditemukan.';
      throw new Error(msg);
    }

    // 422 Unprocessable Entity (Validasi form Laravel)
    if (res.status === 422 && json?.errors) {
      const firstError = Object.values(json.errors).flat().filter(Boolean)[0];
      throw new Error(firstError || json.message || defaultErrorMsg);
    }

    // 401 Unauthorized
    if (res.status === 401) {
      // Jika unauthenticated saat akses endpoint privat, bersihkan token rusak
      if (!endpoint.includes('/login') && !endpoint.includes('/register')) {
        localStorage.removeItem('rp_token');
        localStorage.removeItem('rp_user');
      }
      throw new Error(json?.message || defaultErrorMsg || 'Nama/Email atau kata sandi tidak cocok.');
    }

    // 500 Internal Server Error
    if (res.status >= 500) {
      const msg = json?.message && !json.message.includes('SQLSTATE') && !json.message.includes('Stack trace')
        ? json.message
        : 'Terjadi gangguan pada server backend. Silakan coba beberapa saat lagi.';
      throw new Error(msg);
    }

    // Status lainnya (misal 400, 403)
    const fallbackMsg = json?.message || defaultErrorMsg;
    throw new Error(fallbackMsg);
  }

  // Response OK (200 - 299)
  return json !== null ? json : {};
}

export const api = {
  // Health-check ringan untuk verifikasi kesiapan backend
  async ping() {
    try {
      const res = await fetch(`${API_BASE}/subjects?grade=1`, {
        method: 'HEAD',
        headers: { 'Accept': 'application/json' }
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth
  async register(data) {
    return request('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }, 'Pendaftaran gagal. Periksa kembali datamu.');
  },

  async login(data) {
    return request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }, 'Nama Lengkap / Email atau kata sandi tidak cocok.');
  },

  async forgotPassword(email) {
    return request('/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email })
    }, 'Gagal memproses lupa kata sandi.');
  },

  async resetPassword(data) {
    return request('/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }, 'Gagal memperbarui kata sandi.');
  },

  async logout() {
    try {
      await request('/logout', {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch {
      // Abaikan kegagalan jaringan saat logout
    } finally {
      localStorage.removeItem('rp_token');
      localStorage.removeItem('rp_user');
    }
  },

  async getProfile() {
    return request('/profile', {
      headers: getAuthHeaders()
    }, 'Gagal memuat profil');
  },

  async updateProfile(data) {
    return request('/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    }, 'Gagal memperbarui profil');
  },

  // Dashboard
  async getDashboard() {
    return request('/dashboard', {
      headers: getAuthHeaders()
    }, 'Gagal memuat dashboard');
  },

  // Learning Activities
  async getActivities() {
    return request('/activities', {
      headers: getAuthHeaders()
    }, 'Gagal memuat riwayat aktivitas');
  },

  // Subjects & Lessons
  async getSubjects(grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    return request(`/subjects${query}`, {
      headers: getAuthHeaders()
    }, 'Gagal memuat mata pelajaran');
  },

  async getSubject(id, grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    return request(`/subjects/${id}${query}`, {
      headers: getAuthHeaders()
    }, 'Gagal memuat mata pelajaran');
  },

  async getLesson(id) {
    return request(`/lessons/${id}`, {
      headers: getAuthHeaders()
    }, 'Gagal memuat materi');
  },

  async getQuiz(lessonId) {
    return request(`/lessons/${lessonId}/quiz`, {
      headers: getAuthHeaders()
    }, 'Gagal memuat kuis');
  },

  async submitQuiz(lessonId, answers) {
    return request(`/lessons/${lessonId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    }, 'Gagal mengirim jawaban');
  }
};


