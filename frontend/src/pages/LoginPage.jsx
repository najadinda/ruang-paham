import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  Lock, 
  LogIn, 
  Sparkles, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Mail,
  ExternalLink,
  CheckCircle,
  X,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export function LoginPage({ setActivePage }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // State untuk Modal Lupa Kata Sandi (Forgot Password -> Gmail)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDirectReset, setShowDirectReset] = useState(false);

  // Tutup modal forgot password dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showForgotModal) {
        setShowForgotModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showForgotModal]);

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

  const openForgotModal = () => {
    setForgotEmail(loginInput.trim());
    setForgotMessage('');
    setForgotError('');
    setResetSuccess(false);
    setNewPassword('');
    setShowDirectReset(false);
    setShowForgotModal(true);
  };

  // Arahkan ke Gmail
  const handleGoToGmail = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');
    setForgotMessage('');

    if (!forgotEmail.trim()) {
      setForgotError('Tolong masukkan email terdaftarmu ya!');
      return;
    }

    try {
      setForgotLoading(true);
      let targetUrl = 'https://mail.google.com/mail/u/0/#inbox';
      try {
        const res = await api.forgotPassword(forgotEmail.trim());
        if (res?.gmail_url) {
          targetUrl = res.gmail_url;
        }
      } catch (err) {
        setForgotError(err.message || 'Gagal memverifikasi akun.');
        return;
      }

      // Langsung buka Gmail di tab baru
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setForgotMessage(`✅ Halaman Gmail telah berhasil dibuka di tab baru! Silakan periksa kotak masuk atau permohonan pemulihan di akun Gmail (${forgotEmail}).`);
    } finally {
      setForgotLoading(false);
    }
  };

  // Reset Kata Sandi Langsung
  const handleDirectReset = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');

    if (!forgotEmail.trim()) {
      setForgotError('Tolong masukkan email terdaftarmu!');
      return;
    }
    if (newPassword.length < 8) {
      setForgotError('Kata sandi baru minimal 8 karakter ya!');
      return;
    }

    try {
      setForgotLoading(true);
      const res = await api.resetPassword({
        email: forgotEmail.trim(),
        password: newPassword
      });
      setResetSuccess(true);
      setForgotMessage(res.message || 'Kata sandi berhasil diperbarui! 🎉');
      setPassword(newPassword);
      setLoginInput(forgotEmail.trim());
    } catch (err) {
      setForgotError(err.message || 'Gagal memperbarui kata sandi.');
    } finally {
      setForgotLoading(false);
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
          maxWidth: '460px',
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
            <label htmlFor="login-input" className="form-label">
              <UserCheck size={17} color="var(--primary-blue)" />
              Nama Lengkap atau Email
            </label>
            <input
              id="login-input"
              type="text"
              className="form-input"
              placeholder="Budi Pratama atau budi@ruangpaham.id"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
            />
          </div>

          {/* 2. Password dengan Icon Mata Toggle */}
          <div className="form-group" style={{ marginBottom: '8px' }}>
            <label htmlFor="login-password" className="form-label">
              <Lock size={17} color="var(--primary-blue)" />
              Kata Sandi (Password)
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="login-password"
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

          {/* Tautan Lupa Kata Sandi */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
            <button
              type="button"
              onClick={openForgotModal}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-blue)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <KeyRound size={14} />
              <span>Lupa Kata Sandi?</span>
            </button>
          </div>

          {/* 3.3 CTA: Tombol besar "Masuk" */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
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

      {/* =========================================================================
          MODAL: Lupa Kata Sandi (Arahkan ke Gmail / Reset Sandi)
          ========================================================================= */}
      <AnimatePresence>
        {showForgotModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 1000
            }}
            onClick={() => setShowForgotModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="forgot-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '460px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(20px, 4vw, 30px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '2px solid #E2E8F0',
                position: 'relative'
              }}
            >
              {/* Tombol Tutup X */}
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
                aria-label="Tutup"
              >
                <X size={17} />
              </button>

              {/* Header Modal */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 id="forgot-modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                    Lupa Kata Sandi?
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    Arahkan ke Gmail untuk pemulihan akun
                  </p>
                </div>
              </div>

              {/* Feedback Pesan Sukses / Error */}
              {forgotMessage && (
                <div style={{
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  color: '#065F46',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{forgotMessage}</span>
                </div>
              )}

              {forgotError && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  border: '1.5px solid #FCA5A5',
                  color: '#B91C1C',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{forgotError}</span>
                </div>
              )}

              {/* Input Email */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="forgot-email" className="form-label" style={{ fontSize: '0.86rem' }}>
                  <Mail size={15} color="var(--primary-blue)" />
                  Email Akun Terdaftar
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  className="form-input"
                  placeholder="contoh: naja@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={{ fontSize: '0.92rem' }}
                />
              </div>

              {/* Bagian 1: Tombol Arahkan ke Gmail */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                border: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                  Klik tombol di bawah ini untuk <strong>langsung diarahkan ke Gmail</strong>. Kamu bisa memeriksa kotak masuk Gmail atau meminta bantuan reset sandi.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGoToGmail}
                  disabled={forgotLoading}
                  style={{
                    width: '100%',
                    padding: '11px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'linear-gradient(135deg, #EA4335 0%, #D93025 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: forgotLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.3)'
                  }}
                >
                  <Mail size={18} />
                  <span>{forgotLoading ? 'Menghubungkan...' : 'Buka Gmail Sekarang'}</span>
                  <ExternalLink size={16} />
                </motion.button>
              </div>

              {/* Bagian 2: Alternatif Reset Sandi Langsung */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowDirectReset(!showDirectReset)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-blue)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={14} />
                  <span>{showDirectReset ? 'Tutup Atur Ulang Sandi' : 'Atau Atur Ulang Sandi Langsung'}</span>
                </button>
              </div>

              {showDirectReset && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleDirectReset}
                  style={{ marginTop: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}
                >
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label htmlFor="new-password" className="form-label" style={{ fontSize: '0.84rem' }}>
                      <Lock size={15} color="var(--primary-blue)" />
                      Kata Sandi Baru (Min. 8 Karakter)
                    </label>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Ketik kata sandi baru"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ paddingRight: '42px', fontSize: '0.9rem' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={forgotLoading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.88rem', fontWeight: 700 }}
                  >
                    <span>{forgotLoading ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}</span>
                  </motion.button>
                </motion.form>
              )}

              {/* Tombol Tutup / Selesai */}
              {resetSuccess && (
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '12px', padding: '9px' }}
                >
                  Kembali ke Halaman Masuk
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

