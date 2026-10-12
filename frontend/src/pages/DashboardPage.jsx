import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  CheckCircle, 
  Award, 
  Atom, 
  Calculator, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  Languages, 
  Palette,
  HeartPulse,
  Clock, 
  BookCheck, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { StreakFlame } from '../components/StreakFlame';
import { CircularProgress } from '../components/CircularProgress';
import { AvatarDisplay } from '../utils/avatars';
import { LoadingScreen } from '../components/LoadingScreen';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nowTime, setNowTime] = useState(Date.now());
  const [questPageIndex, setQuestPageIndex] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  // Otomatis arahkan carousel ke halaman misi yang belum selesai
  useEffect(() => {
    if (dashboardData?.daily_quests && dashboardData.daily_quests.length > 0) {
      const firstIncompleteIdx = dashboardData.daily_quests.findIndex(q => !q.completed);
      if (firstIncompleteIdx !== -1) {
        setQuestPageIndex(Math.floor(firstIncompleteIdx / 3));
      }
    }
  }, [dashboardData]);

  // Timer realtime untuk memperbarui keterangan waktu secara dinamis
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Date.now());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Format tanggal otomatis bahasa Indonesia (contoh: "Sabtu, 10 Oktober 2026")
  const getFormattedToday = () => {
    const today = new Date();
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(today);
  };

  // Format waktu realtime ramah anak (contoh: "Baru saja", "5 menit yang lalu", "Hari ini, 13:03 WIB")
  const formatRealtimeAgo = (dateStr) => {
    if (!dateStr) return 'Hari ini';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const diffSeconds = Math.max(0, Math.floor((nowTime - date.getTime()) / 1000));

    if (diffSeconds < 45) {
      return 'Baru saja';
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} menit yang lalu`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      return `Hari ini, ${hours}:${mins} WIB (${diffHours} jam lalu)`;
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) {
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      return `Kemarin, ${hours}:${mins} WIB`;
    }
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date) + ' WIB';
  };

  // Sapaan otomatis sesuai waktu jam saat ini
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat Pagi';
    if (hour >= 11 && hour < 15) return 'Selamat Siang';
    if (hour >= 15 && hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboard();
      setDashboardData(data);
    } catch {
      // Fallback data
      const isNewUser = (user?.points ?? 0) === 0;
      const userPoints = user?.points ?? 0;
      const userGrade = user?.grade || 3;

      setDashboardData({
        student: user,
        streak: {
          count: user?.streak_count || 1,
          title: 'Api Semangat',
          message: `Luar biasa! Kamu sudah ${user?.streak_count || 1} hari berturut-turut belajar di Ruang Paham!`
        },
        continue_learning: {
          has_activity: !isNewUser,
          data: isNewUser ? null : {
            lesson_id: 4,
            title: 'Siklus Daur Hidup Kupu-Kupu (Metamorfosis)',
            subject_name: 'Ilmu Pengetahuan Alam (IPA)',
            subject_icon: 'Atom',
            subject_color: '#3B82F6',
            progress_percent: 60,
            grade: userGrade
          },
          empty_state: {
            message: 'Kamu belum mulai belajar. Mulai petualangan belajarmu sekarang!',
            cta_text: 'Mulai Belajar'
          }
        },
        learning_activities: {
          total_completed: isNewUser ? 0 : 3,
          total_in_progress: isNewUser ? 0 : 1,
          total_points: userPoints,
          last_active: isNewUser ? null : 'Hari ini',
          estimated_minutes: isNewUser ? 0 : 40,
          items: isNewUser ? [] : [
            {
              id: 101,
              lesson_id: 4,
              lesson_title: 'Siklus Daur Hidup Kupu-Kupu (Metamorfosis)',
              subject_name: 'Ilmu Pengetahuan Alam (IPA)',
              subject_icon: 'Atom',
              subject_color: '#3B82F6',
              status: 'sedang_belajar',
              score: 60,
              points_earned: 15,
              updated_at: 'Hari ini, 10:15'
            },
            {
              id: 102,
              lesson_id: 2,
              lesson_title: 'Mengenal Pecahan Senilai dengan Potongan Pizza',
              subject_name: 'Matematika Petualang',
              subject_icon: 'Calculator',
              subject_color: '#10B981',
              status: 'selesai',
              score: 100,
              points_earned: 30,
              updated_at: 'Kemarin, 14:20'
            },
            {
              id: 103,
              lesson_id: 1,
              lesson_title: 'Organ Gerak Hewan Vertebrata dan Avertebrata',
              subject_name: 'Ilmu Pengetahuan Alam (IPA)',
              subject_icon: 'Atom',
              subject_color: '#3B82F6',
              status: 'selesai',
              score: 95,
              points_earned: 25,
              updated_at: '2 hari lalu'
            },
            {
              id: 104,
              lesson_id: 5,
              lesson_title: 'Membaca Cerita Fabel Sang Kancil yang Cerdik',
              subject_name: 'Bahasa Indonesia',
              subject_icon: 'BookOpen',
              subject_color: '#F59E0B',
              status: 'selesai',
              score: 90,
              points_earned: 20,
              updated_at: '3 hari lalu'
            }
          ]
        },
        daily_quests: [
          {
            id: 1,
            title: 'Selesaikan 1 Kuis IPA atau Matematika',
            description: 'Uji pengetahuanmu dengan kuis seru hari ini!',
            current: 1,
            target: 1,
            reward_points: 20,
            completed: true
          },
          {
            id: 2,
            title: 'Pelajari 1 Bab Materi Baru',
            description: 'Buka materi baru dan baca ringkasan ceria.',
            current: 0,
            target: 1,
            reward_points: 30,
            completed: false
          },
          {
            id: 3,
            title: 'Kumpulkan 100 Poin Bintang',
            description: 'Tuntaskan kuis ceria dengan jawaban tepat.',
            current: Math.min(userPoints, 100),
            target: 100,
            reward_points: 50,
            completed: userPoints >= 100
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getSubjectIcon = (iconName, color = 'var(--primary-blue)') => {
    switch (iconName) {
      case 'Atom': return <Atom size={24} color={color} />;
      case 'Calculator': return <Calculator size={24} color={color} />;
      case 'BookOpen': return <BookOpen size={24} color={color} />;
      case 'Globe': return <Globe size={24} color={color} />;
      case 'ShieldCheck': return <ShieldCheck size={24} color={color} />;
      case 'Languages': return <Languages size={24} color={color} />;
      case 'Palette': return <Palette size={24} color={color} />;
      case 'HeartPulse': return <HeartPulse size={24} color={color} />;
      default: return <Sparkles size={24} color={color} />;
    }
  };

  if (loading && !dashboardData) {
    return <LoadingScreen text="Menyiapkan petualangan belajarmu..." />;
  }

  const { streak, continue_learning, learning_activities, daily_quests, daily_quests_meta } = dashboardData;
  const currentPoints = user?.points ?? 0;

  // Carousel Misi Harian: Batasi maksimal 3 misi per card / tampilan
  const QUESTS_PER_PAGE = 3;
  const totalQuestPages = Math.max(1, Math.ceil((daily_quests?.length || 0) / QUESTS_PER_PAGE));
  const safeQuestPageIndex = Math.min(questPageIndex, totalQuestPages - 1);
  const currentQuests = (daily_quests || []).slice(
    safeQuestPageIndex * QUESTS_PER_PAGE,
    (safeQuestPageIndex + 1) * QUESTS_PER_PAGE
  );

  // Pastikan daftar aktivitas belajar diambil dari API tanpa mock fallback
  const activityItems = Array.isArray(learning_activities?.items) ? learning_activities.items : [];

  return (
    <div style={{ padding: '36px 0 80px 0' }}>
      <div className="container">
        {/* =========================================================================
            HEADER DASHBOARD:
            1. Sebelum sapaan diberi tanggal hari ini (otomatis)
            2. Sapaan diubah menjadi: "Selamat Pagi/Siang/Sore/Malam, [Nama]!"
            ========================================================================= */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          marginBottom: '28px',
          flexWrap: 'wrap'
        }}>
          <AvatarDisplay avatarId={user?.avatar} size={64} />
          <div style={{ minWidth: 0, flex: '1 1 240px' }}>
            {/* 1. Sebelum sapaan: Tanggal Hari Ini Otomatis */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'var(--primary-blue)',
              backgroundColor: 'var(--accent-tint)',
              border: '1px solid var(--accent-soft)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '6px'
            }}>
              <Calendar size={14} color="var(--primary-blue)" />
              <span>{getFormattedToday()}</span>
            </div>

            {/* 2. Sapaan menyesuaikan waktu */}
            <h1 style={{
              fontSize: 'clamp(1.35rem, 3.8vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              margin: '0 0 4px 0',
              letterSpacing: '-0.3px',
              lineHeight: 1.25
            }}>
              {getTimeGreeting()}, {user?.name || 'Siswa Pintar'}!
            </h1>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
              Siswa Kelas <strong style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>{user?.grade || 3} SD</strong> • Total Poin: <strong style={{ color: '#D97706', fontWeight: 700 }}>{currentPoints} ⭐</strong>
            </p>
          </div>
        </div>

        {/* Learning Streak Widget (Api Semangat) */}
        <div style={{
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          marginBottom: 'clamp(20px, 3.5vw, 28px)'
        }}>
          <StreakFlame
            streakCount={streak?.count || user?.streak_count || 1}
            message={streak?.message}
            weeklyDays={streak?.weekly_days}
            todayIndex={streak?.today_index}
          />
        </div>

        {/* =========================================================================
            DASHBOARD 2 KOLOM:
            Kolom 1 (kebawah) : Lanjutkan Belajar dan Misi Harian
            Kolom 2          : Aktivitas Belajar (semua aktivitas ditampilkan bentuk list)
            ========================================================================= */}
        <div className="dashboard-two-columns">
          {/* =====================================================================
              KOLOM 1 (KEBAWAH): Lanjutkan Belajar & Misi Harian
              ===================================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* SECTION: Lanjutkan Belajar */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{
                  width: '8px',
                  height: '22px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-blue)'
                }} />
                <h2 style={{ fontSize: '1.28rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                  {continue_learning?.has_activity ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                </h2>
              </div>

              {continue_learning?.has_activity ? (
                /* Card: Lanjutkan Belajar Aktif */
                <div
                  className="kids-card"
                  style={{
                    borderLeft: `6px solid ${continue_learning.data.subject_color || 'var(--primary-blue)'}`,
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--accent-tint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1.5px solid var(--accent-soft)'
                    }}>
                      {getSubjectIcon(continue_learning.data.subject_icon, continue_learning.data.subject_color)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: continue_learning.data.subject_color || 'var(--primary-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px'
                      }}>
                        {continue_learning.data.subject_name} • Kelas {continue_learning.data.grade}
                      </span>
                      
                      {/* Judul materi: Font weight dibuat BOLD sesuai instruksi user */}
                      <h3 style={{
                        fontSize: '1.22rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        margin: '4px 0 0 0',
                        lineHeight: 1.35
                      }}>
                        {continue_learning.data.title}
                      </h3>
                    </div>
                  </div>

                  {/* Progress Bar Kemajuan Belajar */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      marginBottom: '6px'
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>Kemajuan Belajar</span>
                      <span style={{ color: 'var(--primary-blue)' }}>
                        {continue_learning.data.progress_percent}% Selesai
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--accent-soft)',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${continue_learning.data.progress_percent}%`,
                          height: '100%',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: continue_learning.data.subject_color || 'var(--primary-blue)',
                          transition: 'width 0.6s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA Button Lanjut Belajar */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/materi/${continue_learning.data.lesson_id}`)}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Play size={16} fill="#FFFFFF" />
                    <span>Lanjut Belajar</span>
                  </motion.button>
                </div>
              ) : (
                /* Empty state jika belum ada aktivitas */
                <div
                  className="kids-card"
                  style={{
                    textAlign: 'center',
                    padding: '36px 20px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px dashed #93C5FD'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    fontSize: '1.8rem'
                  }}>
                    🎒
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Petualangan Baru Menunggumu!
                  </h3>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    maxWidth: '300px',
                    margin: '0 auto 18px auto',
                    lineHeight: 1.5
                  }}>
                    {continue_learning?.empty_state?.message || 'Kamu belum mulai belajar. Mulai petualangan belajarmu sekarang!'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/jelajahi')}
                    className="btn btn-primary"
                    style={{ padding: '10px 22px', fontSize: '0.92rem', fontWeight: 700 }}
                  >
                    <Sparkles size={16} />
                    <span>{continue_learning?.empty_state?.cta_text || 'Mulai Belajar'}</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* SECTION: Misi Harian (Daily Quests) dengan Carousel (Maks. 3 Misi Per View) */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '8px',
                    height: '22px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#F59E0B'
                  }} />
                  <h2 style={{ fontSize: '1.28rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                    Misi Harian (Daily Quests)
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {daily_quests_meta?.has_bonus_unlocked && (
                    <span className="badge badge-orange" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      🔥 Misi Ekstra Terbuka!
                    </span>
                  )}

                  {/* Carousel Controls (Jika lebih dari 3 misi / lebih dari 1 halaman) */}
                  {totalQuestPages > 1 && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#F1F5F9',
                      padding: '3px 6px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #E2E8F0'
                    }}>
                      <button
                        type="button"
                        onClick={() => setQuestPageIndex((prev) => Math.max(0, prev - 1))}
                        disabled={safeQuestPageIndex === 0}
                        style={{
                          border: 'none',
                          background: safeQuestPageIndex === 0 ? 'transparent' : '#FFFFFF',
                          color: safeQuestPageIndex === 0 ? '#94A3B8' : 'var(--text-main)',
                          cursor: safeQuestPageIndex === 0 ? 'not-allowed' : 'pointer',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: safeQuestPageIndex === 0 ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'all 0.15s ease'
                        }}
                        title="Misi Sebelumnya"
                        aria-label="Misi Sebelumnya"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <span style={{
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        padding: '0 6px',
                        userSelect: 'none'
                      }}>
                        {safeQuestPageIndex + 1} / {totalQuestPages}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuestPageIndex((prev) => Math.min(totalQuestPages - 1, prev + 1))}
                        disabled={safeQuestPageIndex >= totalQuestPages - 1}
                        style={{
                          border: 'none',
                          background: safeQuestPageIndex >= totalQuestPages - 1 ? 'transparent' : '#FFFFFF',
                          color: safeQuestPageIndex >= totalQuestPages - 1 ? '#94A3B8' : 'var(--text-main)',
                          cursor: safeQuestPageIndex >= totalQuestPages - 1 ? 'not-allowed' : 'pointer',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: safeQuestPageIndex >= totalQuestPages - 1 ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'all 0.15s ease'
                        }}
                        title="Misi Berikutnya"
                        aria-label="Misi Berikutnya"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner apresiasi ketika misi utama selesai dan misi ekstra terbuka */}
              {daily_quests_meta?.has_bonus_unlocked && (
                <div style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 16px',
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '14px',
                  fontSize: '0.86rem',
                  color: '#065F46',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>🎉</span>
                  <span>
                    Hebat! Misi yang ada sudah kamu selesaikan, misi tantangan ekstra baru otomatis terbuka untukmu!
                  </span>
                </div>
              )}

              {/* Kontainer Carousel Misi (Maksimal 3 misi ditampilkan per halaman) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeQuestPageIndex}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  {currentQuests.map((quest) => {
                    const percent = quest.target > 0 ? Math.round((quest.current / quest.target) * 100) : 0;
                    return (
                      <div
                        key={quest.id}
                        className="kids-card"
                        style={{
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '14px',
                          borderLeft: quest.completed
                            ? '5px solid var(--success-green)'
                            : (quest.tier > 1 ? '5px solid #F59E0B' : '5px solid #FCD34D'),
                          backgroundColor: quest.completed ? '#FAFAF9' : '#FFFFFF',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                            {quest.badge && (
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-full)',
                                  backgroundColor: quest.tier > 1 ? '#FEF3C7' : '#EFF6FF',
                                  color: quest.tier > 1 ? '#B45309' : 'var(--primary-blue)',
                                  border: quest.tier > 1 ? '1px solid #FDE68A' : '1px solid #BFDBFE'
                                }}
                              >
                                {quest.badge}
                              </span>
                            )}

                            {quest.completed ? (
                              <span className="badge badge-green" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                                <CheckCircle size={12} /> Selesai!
                              </span>
                            ) : (
                              <span className="badge badge-orange" style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                                +{quest.reward_points} Poin ⭐
                              </span>
                            )}

                            {quest.progress_text && (
                              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                ({quest.progress_text})
                              </span>
                            )}
                          </div>

                          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', margin: '3px 0' }}>
                            {quest.title}
                          </h4>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                            {quest.description}
                          </p>
                        </div>

                        <div style={{ flexShrink: 0, textAlign: 'center' }}>
                          <CircularProgress
                            progress={percent}
                            size={48}
                            strokeWidth={5}
                            color={quest.completed ? 'var(--success-green)' : 'var(--primary-blue)'}
                          />
                          <div style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: quest.completed ? 'var(--success-green)' : 'var(--primary-blue)',
                            marginTop: '3px'
                          }}>
                            {percent}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Indikator Titik Halaman Carousel (Dots Pagination) */}
              {totalQuestPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  {Array.from({ length: totalQuestPages }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuestPageIndex(idx)}
                      style={{
                        border: 'none',
                        height: '7px',
                        width: safeQuestPageIndex === idx ? '24px' : '8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: safeQuestPageIndex === idx ? 'var(--primary-blue)' : '#CBD5E1',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      title={`Halaman Misi ${idx + 1}`}
                      aria-label={`Ke halaman misi ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* =====================================================================
              KOLOM 2: Aktivitas Belajar
              Menampilkan semua aktivitas-aktivitasnya dalam bentuk list
              ===================================================================== */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '22px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--success-green)'
                }} />
                <h2 style={{ fontSize: '1.28rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                  Aktivitas Belajar
                </h2>
              </div>
              <span className={activityItems.length > 0 ? "badge badge-green" : "badge badge-blue"} style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                {activityItems.length} Aktivitas
              </span>
            </div>

            <div
              className="kids-card"
              style={{
                padding: 'clamp(16px, 3.5vw, 24px)',
                borderLeft: '6px solid var(--success-green)'
              }}
            >
              {/* Ringkasan Singkat 3 Metrik Belajar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-md)',
                  padding: 'clamp(8px, 2vw, 12px) 4px',
                  textAlign: 'center'
                }}>
                  <BookCheck size={18} color="var(--primary-blue)" style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: 'clamp(1rem, 3.2vw, 1.15rem)', fontWeight: 800, color: 'var(--text-main)' }}>
                    {learning_activities?.total_completed ?? 0}
                  </div>
                  <div style={{ fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Bab Tuntas
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-md)',
                  padding: 'clamp(8px, 2vw, 12px) 4px',
                  textAlign: 'center'
                }}>
                  <Clock size={18} color="#D97706" style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: 'clamp(1rem, 3.2vw, 1.15rem)', fontWeight: 800, color: 'var(--text-main)' }}>
                    {learning_activities?.total_study_minutes || learning_activities?.estimated_minutes || 0}m
                  </div>
                  <div style={{ fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Waktu Belajar
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-md)',
                  padding: 'clamp(8px, 2vw, 12px) 4px',
                  textAlign: 'center'
                }}>
                  <Award size={18} color="var(--success-green)" style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: 'clamp(1rem, 3.2vw, 1.15rem)', fontWeight: 800, color: 'var(--text-main)' }}>
                    {currentPoints}
                  </div>
                  <div style={{ fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Bintang Poin
                  </div>
                </div>
              </div>

              {/* Sub-header List Aktivitas */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                paddingBottom: '12px',
                borderBottom: '1.5px solid #F1F5F9',
                marginBottom: '16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--text-main)'
              }}>
                <History size={16} color="var(--primary-blue)" />
                <span>Riwayat Semua Aktivitas</span>
              </div>

              {/* DAFTAR LIST SEMUA AKTIVITAS BELAJAR ATAU EMPTY STATE */}
              {activityItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '38px 16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px dashed #CBD5E1',
                  margin: '4px 0 10px 0'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#EDF2F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    fontSize: '1.5rem'
                  }}>
                    📝
                  </div>
                  <h4 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    margin: '0 0 6px 0'
                  }}>
                    Belum ada aktivitas belajar.
                  </h4>
                  <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-muted)',
                    margin: '0 auto 16px auto',
                    maxWidth: '320px',
                    lineHeight: 1.5
                  }}>
                    Materi yang kamu buka atau pelajari akan tercatat di sini. Yuk, mulai petualangan belajarmu!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/jelajahi')}
                    className="btn btn-outline"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '8px 20px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    Pilih Materi Pertama
                  </motion.button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activityItems.map((item, idx) => {
                    const isDone = item.status === 'selesai';
                    return (
                      <motion.div
                        key={item.id || idx}
                        whileHover={{ scale: 1.01, backgroundColor: '#F8FAFC' }}
                        className="activity-item-card"
                        style={{
                          borderRadius: 'var(--radius-lg)',
                          border: '1.5px solid #E2E8F0',
                          backgroundColor: '#FFFFFF',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {/* Sisi Kiri Item: Icon & Info Materi */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, width: '100%' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            backgroundColor: item.subject_color ? `${item.subject_color}18` : 'var(--accent-tint)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {getSubjectIcon(item.subject_icon, item.subject_color || 'var(--primary-blue)')}
                          </div>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              flexWrap: 'wrap',
                              marginBottom: '2px'
                            }}>
                              <span style={{
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                color: item.subject_color || 'var(--primary-blue)',
                                textTransform: 'uppercase'
                              }}>
                                {item.subject_name}
                              </span>
                              <span style={{ color: '#CBD5E1', fontSize: '0.74rem' }}>•</span>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  color: 'var(--text-muted)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  fontWeight: 600
                                }}
                                title={item.updated_at ? `${item.updated_at} WIB` : 'Waktu belajar'}
                              >
                                <Clock size={11} color="var(--primary-blue)" />
                                <span>{formatRealtimeAgo(item.raw_updated_at || item.updated_at)}</span>
                              </span>
                            </div>

                            <h4 style={{
                              fontSize: '0.94rem',
                              fontWeight: 700,
                              color: 'var(--text-main)',
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                            title={item.lesson_title}
                            >
                              {item.lesson_title}
                            </h4>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                              {isDone ? (
                                <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '2px 8px', fontWeight: 700 }}>
                                  <CheckCircle size={11} /> Selesai
                                </span>
                              ) : (
                                <span className="badge badge-blue" style={{ fontSize: '0.72rem', padding: '2px 8px', fontWeight: 700 }}>
                                  Sedang Belajar
                                </span>
                              )}
                              {item.duration_minutes ? (
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  color: '#D97706',
                                  backgroundColor: '#FEF3C7',
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-full)'
                                }}>
                                  ⏱️ {item.duration_minutes}m belajar
                                </span>
                              ) : null}
                              {item.points_earned && (
                                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#D97706' }}>
                                  +{item.points_earned} Poin ⭐
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sisi Kanan: Tombol Aksi Buka Materi */}
                        <div className="activity-item-actions">
                          <button
                            onClick={() => navigate(`/materi/${item.lesson_id}`)}
                            style={{
                              padding: '7px 14px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: isDone ? 'var(--accent-tint)' : 'var(--primary-blue)',
                              color: isDone ? 'var(--primary-blue)' : '#FFFFFF',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>{isDone ? 'Ulangi' : 'Buka'}</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Footer Aktivitas Terakhir */}
              <div style={{
                marginTop: '18px',
                paddingTop: '12px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}>
                <span>Aktivitas Terakhir: <strong>{activityItems.length > 0 ? (learning_activities?.last_active || 'Hari ini') : '-'}</strong></span>
                <button
                  onClick={() => navigate('/jelajahi')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-blue)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.82rem'
                  }}
                >
                  Lihat Semua Materi &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
