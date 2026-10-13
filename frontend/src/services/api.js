const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('rp_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

/**
 * Helper untuk parsing response HTTP secara aman:
 * Mencegah error "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
 * saat server mengembalikan body kosong, proxy timeout (502/504), atau halaman HTML error.
 */
async function parseResponse(res, defaultErrorMsg = 'Terjadi kendala pada server. Silakan coba lagi.') {
  let json = null;
  let text = '';
  try {
    text = await res.text();
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    if (res.status === 502 || res.status === 503 || res.status === 504) {
      throw new Error('Server backend sedang bersiap atau belum aktif (port 8000). Silakan tunggu sebentar dan coba lagi.');
    }
    const errMsg = json?.errors
      ? Object.values(json.errors).flat().join(' ')
      : (json?.message || defaultErrorMsg);
    throw new Error(errMsg);
  }

  // Jika response status OK (200-299) tetapi body kosong, kembalikan objek kosong
  return json !== null ? json : {};
}

export const api = {
  // Auth
  async register(data) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    return parseResponse(res, 'Pendaftaran gagal');
  },

  async login(data) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    return parseResponse(res, 'Nama/Email atau password salah.');
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email })
    });
    return parseResponse(res, 'Gagal memproses lupa kata sandi');
  },

  async resetPassword(data) {
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    return parseResponse(res, 'Gagal memperbarui kata sandi');
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } finally {
      localStorage.removeItem('rp_token');
      localStorage.removeItem('rp_user');
    }
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat profil');
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return parseResponse(res, 'Gagal memperbarui profil');
  },

  // Dashboard
  async getDashboard() {
    const res = await fetch(`${API_BASE}/dashboard`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat dashboard');
  },

  // Learning Activities
  async getActivities() {
    const res = await fetch(`${API_BASE}/activities`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat riwayat aktivitas');
  },

  // Subjects & Lessons
  async getSubjects(grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    const res = await fetch(`${API_BASE}/subjects${query}`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat mata pelajaran');
  },

  async getSubject(id, grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    const res = await fetch(`${API_BASE}/subjects/${id}${query}`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat mata pelajaran');
  },

  async getLesson(id) {
    const res = await fetch(`${API_BASE}/lessons/${id}`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat materi');
  },

  async getQuiz(lessonId) {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}/quiz`, {
      headers: getAuthHeaders()
    });
    return parseResponse(res, 'Gagal memuat kuis');
  },

  async submitQuiz(lessonId, answers) {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    return parseResponse(res, 'Gagal mengirim jawaban');
  }
};

