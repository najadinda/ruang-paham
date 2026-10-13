import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AVATAR_OPTIONS, AvatarDisplay } from '../utils/avatars';
import { api } from '../services/api';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [stats, setStats] = useState({
    completed_lessons: 1,
    in_progress_lessons: 1,
    points: user?.points || 0,
    streak_count: user?.streak_count || 1,
    level: 1
  });

  // Edit form state
  const [name, setName] = useState(user?.name || '');
  const [grade, setGrade] = useState(user?.grade ? String(user.grade) : '3');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'robot-blue');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setGrade(String(user.grade));
      setSelectedAvatar(user.avatar || 'robot-blue');
    }
    loadProfileStats();
  }, [user]);

  const loadProfileStats = async () => {
    try {
      const res = await api.getProfile();
      if (res?.stats) {
        setStats(res.stats);
      }
    } catch {
      // Use existing stats
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (password && password.length < 8) {
      setErrorMsg('Kata sandi baru minimal 8 karakter!');
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        name,
        grade: parseInt(grade, 10),
        avatar: selectedAvatar,
        ...(password ? { password } : {})
      });
      setSuccessMsg('Profil dan avatar karakter berhasil diperbarui! ✨');
      setPassword('');
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '36px 0 80px 0' }}>
      <div className="container">
        {/* Tombol Panah Kembali (Menyesuaikan halaman yang dibuka sebelumnya) */}
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--primary-blue)',
            fontWeight: 700,
            fontSize: '0.98rem',
            marginBottom: '16px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        {/* Header Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
            Profil Siswa
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
            Kelola data akunmu dan lihat pencapaian belajar di Ruang Paham.
          </p>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div style={{
            backgroundColor: '#ECFDF5',
            border: '1.5px solid #6EE7B7',
            color: '#065F46',
            padding: '12px 18px',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 500,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle size={18} color="var(--success-green)" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            color: '#991B1B',
            padding: '12px 18px',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 500,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* =========================================================================
            PROFIL 2 KOLOM:
            Sebelah Kiri: Nama profil, avatar, info & statistik
            Sebelah Kanan: Edit profil form & pemilihan avatar
            ========================================================================= */}
        <div className="rp-profile-layout">
          {/* ==================== KOLOM KIRI: NAMA PROFIL & STATISTIK ==================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Card Info Siswa */}
            <div className="kids-card" style={{ padding: 'clamp(18px, 4vw, 30px)' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <div style={{ marginBottom: '14px' }}>
                  <AvatarDisplay avatarId={user?.avatar} size={92} />
                </div>
                <span className="badge badge-blue" style={{ marginBottom: '8px', fontSize: '0.82rem' }}>
                  Kelas {user?.grade || 3} SD
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                  {user?.name || 'Siswa Pintar'}
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
                  {user?.email || 'siswa@ruangpaham.id'}
                </p>
              </div>

              {/* Grid 4 Statistik Siswa (Dibagi menjadi 2 baris: 2 kolom x 2 baris) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div style={{
                  backgroundColor: '#FFFBEB',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  border: '1px solid #FDE68A',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '2px' }}>⭐</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#D97706' }}>
                    {stats.points}
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 500, color: '#B45309' }}>
                    Total Bintang
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  border: '1px solid #FCD34D',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '2px' }}>🔥</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#B45309' }}>
                    {stats.streak_count} Hari
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 500, color: '#92400E' }}>
                    Api Semangat
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#ECFDF5',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  border: '1px solid #A7F3D0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '2px' }}>🎓</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#059669' }}>
                    {stats.completed_lessons}
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 500, color: '#047857' }}>
                    Materi Tuntas
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#EFF6FF',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  border: '1px solid #BFDBFE',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '2px' }}>🚀</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                    Level {stats.level}
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 500, color: 'var(--primary-dark)' }}>
                    Tingkat Siswa
                  </div>
                </div>
              </div>
            </div>

            {/* Privasi & Keamanan Notice */}
            <div style={{
              backgroundColor: '#EFF6FF',
              border: '1.5px solid var(--accent-blue)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 22px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={22} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                  Aman & Terlindungi
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
                  Ruang Paham menjaga privasi anak dengan menggunakan avatar ilustrasi karakter tanpa mengumpulkan foto asli wajah anak.
                </p>
              </div>
            </div>
          </div>

          {/* ==================== KOLOM KANAN: EDIT PROFIL ==================== */}
          <div className="kids-card" style={{ padding: 'clamp(18px, 4vw, 30px)' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                Edit Profil
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
                Ubah nama lengkap, tingkat kelas, avatar karakter, dan kata sandi.
              </p>
            </div>

            <form onSubmit={handleSaveProfile}>
              {/* 1. Pemilihan Avatar: Galeri default (hewan/robot) */}
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label" style={{ marginBottom: '10px' }}>
                  <Sparkles size={16} color="var(--primary-blue)" />
                  Pilih Avatar Karakter:
                </label>

                {/* Pilihan Avatar Karakter (Dibagi menjadi 2 baris: 4 kolom x 2 baris) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px'
                }}>
                  {AVATAR_OPTIONS.map((av) => {
                    const isPicked = selectedAvatar === av.id;
                    return (
                      <div
                        key={av.id}
                        onClick={() => setSelectedAvatar(av.id)}
                        style={{
                          padding: '10px 6px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isPicked ? 'var(--accent-tint)' : '#FFFFFF',
                          border: isPicked ? '2px solid var(--primary-blue)' : '1.5px solid var(--border-light)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isPicked && (
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-blue)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <AvatarDisplay avatarId={av.id} size={42} />
                        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-main)', textAlign: 'center' }}>
                          {av.name.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Form edit Nama Lengkap */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} color="var(--primary-blue)" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* 3. Ubah Kelas (1-6) */}
              <div className="form-group">
                <label className="form-label">
                  <GraduationCap size={16} color="var(--primary-blue)" />
                  Tingkat Kelas (SD)
                </label>
                <select
                  className="form-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="1">Kelas 1 SD</option>
                  <option value="2">Kelas 2 SD</option>
                  <option value="3">Kelas 3 SD</option>
                  <option value="4">Kelas 4 SD</option>
                  <option value="5">Kelas 5 SD</option>
                  <option value="6">Kelas 6 SD</option>
                </select>
              </div>

              {/* 4. Ubah Password dengan Icon Mata Toggle */}
              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} color="var(--primary-blue)" />
                  Ubah Kata Sandi (Kosongkan bila tidak diubah)
                </label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Kata sandi baru (minimal 8 karakter)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '48px' }}
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', marginTop: '10px' }}
              >
                <CheckCircle size={17} />
                <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
