const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('rp_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async register(data) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
      const errMsg = json.errors ? Object.values(json.errors).flat().join(' ') : (json.message || 'Pendaftaran gagal');
      throw new Error(errMsg);
    }
    return json;
  },

  async login(data) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
      const errMsg = json.errors ? Object.values(json.errors).flat().join(' ') : (json.message || 'Login gagal');
      throw new Error(errMsg);
    }
    return json;
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    if (!res.ok) {
      const errMsg = json.errors ? Object.values(json.errors).flat().join(' ') : (json.message || 'Gagal memproses lupa kata sandi');
      throw new Error(errMsg);
    }
    return json;
  },

  async resetPassword(data) {
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
      const errMsg = json.errors ? Object.values(json.errors).flat().join(' ') : (json.message || 'Gagal memperbarui kata sandi');
      throw new Error(errMsg);
    }
    return json;
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
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat profil');
    return json;
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memperbarui profil');
    return json;
  },

  // Dashboard
  async getDashboard() {
    const res = await fetch(`${API_BASE}/dashboard`, {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat dashboard');
    return json;
  },

  // Subjects & Lessons
  async getSubjects(grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    const res = await fetch(`${API_BASE}/subjects${query}`, {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat mata pelajaran');
    return json;
  },

  async getSubject(id, grade = null) {
    const query = grade ? `?grade=${grade}` : '';
    const res = await fetch(`${API_BASE}/subjects/${id}${query}`, {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat mata pelajaran');
    return json;
  },

  async getLesson(id) {
    const res = await fetch(`${API_BASE}/lessons/${id}`, {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat materi');
    return json;
  },

  async getQuiz(lessonId) {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}/quiz`, {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat kuis');
    return json;
  },

  async submitQuiz(lessonId, answers) {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal mengirim jawaban');
    return json;
  }
};
