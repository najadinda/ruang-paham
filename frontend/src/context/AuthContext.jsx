import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rp_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Jika token tersimpan, sinkronkan profil data aktivitas terbaru dari database
    const token = localStorage.getItem('rp_token');
    if (token) {
      api.getProfile()
        .then(res => {
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('rp_user', JSON.stringify(res.user));
          }
        })
        .catch((err) => {
          // Hanya jika token sudah kedaluwarsa/tidak valid (401), hapus sesi
          if (err?.message?.includes('Unauthenticated') || err?.message?.includes('unauthenticated')) {
            localStorage.removeItem('rp_token');
            localStorage.removeItem('rp_user');
            setUser(null);
          }
        });
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await api.login(credentials);
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
      localStorage.setItem('rp_token', data.token);
      localStorage.setItem('rp_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('rp_token');
      localStorage.removeItem('rp_user');
      setUser(null);
    }
  };

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await api.updateProfile(formData);
      setUser(res.user);
      localStorage.setItem('rp_user', JSON.stringify(res.user));
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
