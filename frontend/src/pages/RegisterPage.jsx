import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Lock, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RegisterPage({ setActivePage }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '3',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Tolong isi nama lengkapmu ya!');
      return;
    }
    if (!formData.email.trim()) {
      setError('Tolong isi email ya!');
      return;
    }
    if (formData.password.length < 8) {
      setError('Kata sandi minimal 8 karakter agar aman!');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        grade: parseInt(formData.grade, 10),
        password: formData.password.trim()
      });
      if (typeof setActivePage === 'function') setActivePage('dashboard');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Periksa kembali datamu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(24px, 5vw, 40px) clamp(12px, 3.5vw, 20px)',
      background: 'radial-gradient(ellipse at center, #EFF6FF 0%, #F8FAFC 80%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(20px, 5vw, 38px)',
          boxShadow: '0 20px 45px -10px rgba(59, 130, 246, 0.12)',
          border: '2px solid #DBEAFE'
        }}
      >
        {/* Tombol Kembali ke Beranda */}
        <div style={{ marginBottom: '18px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0'
            }}
          >
            <ArrowLeft size={15} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
        {/* Header Form */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '18px',
            backgroundColor: 'var(--accent-tint)',
            color: 'var(--primary-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            border: '2px solid var(--accent-blue)'
          }}>
            <Sparkles size={26} />
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
            Daftar Akun Baru
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
            Mulai petualangan belajarmu di Ruang Paham hari ini.
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1.5px solid #FCA5A5',
            color: '#B91C1C',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* 3.2 Formulir Pendaftaran */}
        <form onSubmit={handleSubmit}>
          {/* 1. Nama Lengkap */}
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              <User size={17} color="var(--primary-blue)" />
              Nama Lengkap
            </label>
            <input
              id="reg-name"
              type="text"
              className="form-input"
              placeholder="Contoh: Budi Pratama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* 2. Email */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              <Mail size={17} color="var(--primary-blue)" />
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              className="form-input"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* 3. Dropdown Kelas (1-6) */}
          <div className="form-group">
            <label htmlFor="reg-grade" className="form-label">
              <GraduationCap size={17} color="var(--primary-blue)" />
              Pilih Kelas (SD)
            </label>
            <select
              id="reg-grade"
              className="form-select"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            >
              <option value="1">Kelas 1 SD (Awal Mula Petualangan)</option>
              <option value="2">Kelas 2 SD (Makin Mahir & Ceria)</option>
              <option value="3">Kelas 3 SD (Sahabat Pintar)</option>
              <option value="4">Kelas 4 SD (Petualang Hebat)</option>
              <option value="5">Kelas 5 SD (Penjelajah Sains)</option>
              <option value="6">Kelas 6 SD (Juara Sekolah Dasar)</option>
            </select>
          </div>

          {/* 4. Password dengan Icon Mata Toggle */}
          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              <Lock size={17} color="var(--primary-blue)" />
              Kata Sandi (Password)
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ paddingRight: '48px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* 3.2 CTA Tombol besar "Daftar Sekarang" */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '12px' }}
          >
            <span>{loading ? 'Sedang Mendaftarkan...' : 'Daftar Sekarang'}</span>
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* 3.2 Footer Form: Teks tautan "Sudah punya akun? Masuk" */}
        <div style={{
          marginTop: '26px',
          textAlign: 'center',
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '18px',
          fontWeight: 400
        }}>
          Sudah punya akun?{' '}
          <button
            onClick={() => {
              if (typeof setActivePage === 'function') setActivePage('login');
              navigate('/login');
            }}
            style={{
              background: 'none',
              color: 'var(--primary-blue)',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              padding: 0
            }}
          >
            Masuk
          </button>
        </div>
      </motion.div>
    </div>
  );
}
