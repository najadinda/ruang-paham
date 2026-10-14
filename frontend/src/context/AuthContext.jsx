import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rp_user');
      if (!saved || saved === 'undefined' || saved === 'null') return null;
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem('rp_user');
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sinkronkan profil terbaru jika token tersimpan dan valid
    const token = localStorage.getItem('rp_token');
    const isValidToken = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';

    if (isValidToken) {
      api.getProfile()
        .then(res => {
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('rp_user', JSON.stringify(res.user));
          }
        })
        .catch((err) => {
          const msg = err?.message || '';
          // Hanya hapus sesi jika token kedaluwarsa atau tidak valid (401)
          if (msg.includes('Unauthenticated') || msg.includes('unauthenticated') || msg.includes('Sesi telah berakhir')) {
            localStorage.removeItem('rp_token');
            localStorage.removeItem('rp_user');
            setUser(null);
          }
        });
    } else {
      localStorage.removeItem('rp_token');
      localStorage.removeItem('rp_user');
      setUser(null);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await api.login(credentials);
      if (!data || !data.token || !data.user) {
        throw new Error('Respons masuk tidak valid dari server. Silakan coba beberapa saat lagi.');
      }
      localStorage.setItem('rp_token', data.token);
      localStorage.setItem('rp_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await api.register(formData);
      if (!data || !data.token || !data.user) {
        throw new Error('Pendaftaran berhasil, tetapi sesi tidak valid. Silakan masuk secara manual.');
      }
      localStorage.setItem('rp_token', data.token);
      localStorage.setItem('rp_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.logout();
    } catch {
      // Abaikan kegagalan jaringan saat logout
    } finally {
      localStorage.removeItem('rp_token');
      localStorage.removeItem('rp_user');
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await api.updateProfile(formData);
      if (res?.user) {
        setUser(res.user);
        localStorage.setItem('rp_user', JSON.stringify(res.user));
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
