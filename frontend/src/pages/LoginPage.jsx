import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCheck, Lock, LogIn, Sparkles, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage({ setActivePage }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginInput.trim() || !password.trim()) {
      setError('Tolong isi nama/email dan kata sandi ya!');
      return;
    }

    try {
      setLoading(true);
      await login({
        login: loginInput,
        password: password
      });
      if (typeof setActivePage === 'function') setActivePage('dashboard');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Nama/Email atau password salah.');
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
      padding: '40px 20px',
      background: 'radial-gradient(ellipse at center, #EFF6FF 0%, #F8FAFC 80%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '38px',
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
            Masuk ke Ruang Paham
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
            Lanjutkan petualangan belajarmu yang menyenangkan.
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

        {/* 3.3 Formulir Masuk */}
        <form onSubmit={handleSubmit}>
          {/* 1. Nama Lengkap / Email */}
          <div className="form-group">
            <label className="form-label">
              <UserCheck size={17} color="var(--primary-blue)" />
              Nama Lengkap atau Email
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Budi Pratama atau budi@ruangpaham.id"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
            />
          </div>

          {/* 2. Password dengan Icon Mata Toggle */}
          <div className="form-group">
            <label className="form-label">
              <Lock size={17} color="var(--primary-blue)" />
              Kata Sandi (Password)
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Masukkan kata sandimu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* 3.3 CTA: Tombol besar "Masuk" */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '12px' }}
          >
            <span>{loading ? 'Sedang Masuk...' : 'Masuk'}</span>
            <LogIn size={18} />
          </motion.button>
        </form>

        {/* 3.3 Footer Form: Teks tautan "Belum punya akun? Daftar" */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '18px',
          fontWeight: 400
        }}>
          Belum punya akun?{' '}
          <button
            onClick={() => {
              if (typeof setActivePage === 'function') setActivePage('register');
              navigate('/register');
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
            Daftar Sekarang
          </button>
        </div>
      </motion.div>
    </div>
  );
}
