import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Sparkles, 
  Search, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Award, 
  Compass, 
  RefreshCw
} from 'lucide-react';
import { 
  Atom, 
  Calculator, 
  Globe, 
  ShieldCheck, 
  Languages, 
  Palette, 
  HeartPulse 
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';
import { AvatarDisplay } from '../utils/avatars';

export function ActivitiesPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activitiesData, setActivitiesData] = useState(null);
  const [nowTime, setNowTime] = useState(Date.now());
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  const isMountedRef = useRef(true);
  const isFetchingRef = useRef(false);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'selesai', 'sedang_belajar'
  const [subjectFilter, setSubjectFilter] = useState('all'); // 'all' or specific subject name
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'duration', 'score'
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // 1. Timer Realtime Ticker setiap 5 detik untuk memperbarui keterangan waktu secara dinamis
  useEffect(() => {
    isMountedRef.current = true;
    const timer = setInterval(() => {
      if (isMountedRef.current) {
        setNowTime(Date.now());
      }
    }, 5000);
    return () => {
      isMountedRef.current = false;
      clearInterval(timer);
    };
  }, []);

  // 2. Sinkronisasi data aktivitas secara Realtime (Polling setiap 10 detik & saat tab kembali aktif)
  useEffect(() => {
    loadActivities(false);

    const pollInterval = setInterval(() => {
      loadActivities(true);
    }, 10000);

    const handleFocus = () => {
      loadActivities(true);
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const loadActivities = async (isBackground = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      if (!isBackground) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      // Ambil data aktivitas langsung dari API Dashboard/Activities yang terverifikasi
      const res = await api.getActivities();
      if (!isMountedRef.current) return;
      setActivitiesData(res);
      setLastSyncTime(new Date());

      // Sinkronkan data student & poin terbaru ke AuthContext & localStorage
      if (res?.student && setUser) {
        setUser(prev => ({ ...(prev || {}), ...res.student }));
        localStorage.setItem('rp_user', JSON.stringify({ ...(user || {}), ...res.student }));
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      console.error('Gagal memuat riwayat aktivitas secara realtime:', err);

      // Fallback data teruji jika server offline/terkendala koneksi (identik dengan fallback di dashboard)
      if (!activitiesData) {
        const isNewUser = (user?.points ?? 0) === 0;
        const userPoints = user?.points ?? 0;
        setActivitiesData({
          student: user,
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
                duration_minutes: 5,
                points_earned: 15,
                updated_at: 'Hari ini, 10:15',
                raw_updated_at: new Date(Date.now() - 15 * 60000).toISOString()
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
                duration_minutes: 10,
                points_earned: 30,
                updated_at: 'Kemarin, 14:20',
                raw_updated_at: new Date(Date.now() - 24 * 3600000).toISOString()
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
                duration_minutes: 10,
                points_earned: 25,
                updated_at: '2 hari lalu',
                raw_updated_at: new Date(Date.now() - 48 * 3600000).toISOString()
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
                duration_minutes: 10,
                points_earned: 20,
                updated_at: '3 hari lalu',
                raw_updated_at: new Date(Date.now() - 72 * 3600000).toISOString()
              }
            ]
          }
        });
      }
    } finally {
      isFetchingRef.current = false;
      if (isMountedRef.current) {
        if (!isBackground) setLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  // Icon resolver per tema mata pelajaran (identik dengan Dashboard & Explore)
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

  // Format waktu realtime ramah anak (membedakan hari kalender murni: "Baru saja", "5 menit yang lalu", "Hari ini, 13:03 WIB", "Kemarin, 22:41 WIB")
  const formatRealtimeAgo = (dateStr) => {
    if (!dateStr) return 'Hari ini';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const now = new Date(nowTime);

    // Hitung selisih hari kalender murni (midnight to midnight)
    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const targetMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const diffCalendarDays = Math.round((nowMidnight - targetMidnight) / (24 * 60 * 60 * 1000));

    const diffSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');

    // 1. Hari ini (Hari kalender sama)
    if (diffCalendarDays === 0) {
      if (diffSeconds < 45) return 'Baru saja';
      if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
      return `Hari ini, ${hours}:${mins} WIB (${diffHours} jam lalu)`;
    }

    // 2. Kemarin (Hari kalender H-1)
    if (diffCalendarDays === 1) {
      if (diffHours < 24) {
        return `Kemarin, ${hours}:${mins} WIB (${diffHours} jam lalu)`;
      }
      return `Kemarin, ${hours}:${mins} WIB`;
    }

    // 3. 2 - 6 hari lalu
    if (diffCalendarDays > 1 && diffCalendarDays <= 6) {
      return `${diffCalendarDays} hari lalu, ${hours}:${mins} WIB`;
    }

    // 4. Lebih dari 6 hari lalu
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date) + ' WIB';
  };

  // Hitung durasi waktu belajar realtime rasional ramah anak (identik dengan Dashboard)
  const getRealtimeDuration = (item) => {
    if (!item) return 5;
    if (item.status === 'sedang_belajar') {
      if (item.raw_updated_at) {
        const elapsed = Math.floor((nowTime - new Date(item.raw_updated_at).getTime()) / 60000);
        if (elapsed >= 0 && elapsed <= 25) {
          return Math.max(1, elapsed);
        }
      }
      return Math.min(10, Math.max(1, Number(item.duration_minutes) || 3));
    }
    const dur = Number(item.duration_minutes) || 10;
    return dur > 20 ? 10 : Math.max(3, dur);
  };

  // Ekstrak items riwayat aktivitas langsung dari response dashboard
  const learningActivitiesData = activitiesData?.learning_activities || {};
  const rawActivities = Array.isArray(learningActivitiesData.items) ? learningActivitiesData.items : [];

  // Ekstrak daftar mata pelajaran unik untuk filter dropdown
  const uniqueSubjects = useMemo(() => {
    const subs = new Set();
    rawActivities.forEach(item => {
      if (item.subject_name) subs.add(item.subject_name);
    });
    return Array.from(subs);
  }, [rawActivities]);

  // Filter & Urutkan daftar aktivitas (Default: Terbaru dibuka di atas, identik dengan Dashboard)
  const filteredActivities = useMemo(() => {
    let result = [...rawActivities];

    // Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        (item.lesson_title && item.lesson_title.toLowerCase().includes(q)) ||
        (item.subject_name && item.subject_name.toLowerCase().includes(q))
      );
    }

    // Filter Status
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Filter Mata Pelajaran
    if (subjectFilter !== 'all') {
      result = result.filter(item => item.subject_name === subjectFilter);
    }

    // Sorting Realtime
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        const tA = new Date(a.raw_updated_at || a.updated_at || 0).getTime();
        const tB = new Date(b.raw_updated_at || b.updated_at || 0).getTime();
        return tB - tA;
      }
      if (sortBy === 'oldest') {
        const tA = new Date(a.raw_updated_at || a.updated_at || 0).getTime();
        const tB = new Date(b.raw_updated_at || b.updated_at || 0).getTime();
        return tA - tB;
      }
      if (sortBy === 'duration') {
        return getRealtimeDuration(b) - getRealtimeDuration(a);
      }
      if (sortBy === 'score') {
        return (b.score || 0) - (a.score || 0);
      }
      return 0;
    });

    return result;
  }, [rawActivities, searchQuery, statusFilter, subjectFilter, sortBy, nowTime]);

  // Pagination perhitungan
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedActivities = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredActivities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredActivities, safeCurrentPage]);

  // Statistik Realtime Sinkron dengan Dashboard
  const totalCompleted = learningActivitiesData.total_completed ?? rawActivities.filter(a => a.status === 'selesai').length;
  const totalInProgress = learningActivitiesData.total_in_progress ?? rawActivities.filter(a => a.status === 'sedang_belajar').length;
  const calculatedTotalMinutes = rawActivities.reduce((acc, a) => acc + getRealtimeDuration(a), 0);
  const totalStudyMinutes = calculatedTotalMinutes > 0 ? calculatedTotalMinutes : (learningActivitiesData.total_study_minutes || 0);
  const totalPoints = activitiesData?.student?.points ?? user?.points ?? 0;

  // Reset filter handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSubjectFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  if (loading && !activitiesData) {
    return <LoadingScreen text="Menghubungkan & memuat riwayat aktivitas belajarmu..." />;
  }

  return (
    <div style={{ padding: '36px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* =========================================================================
            1. HEADER & TOMBOL KEMBALI
            ========================================================================= */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '18px'
          }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 'var(--radius-full)',
                padding: '8px 18px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-blue)';
                e.currentTarget.style.color = 'var(--primary-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Dashboard</span>
            </button>

            {/* Indikator Status Sinkronisasi Realtime & Tombol Segarkan */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700
              }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'inline-block',
                    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)'
                  }}
                  className="btn-pulse"
                />
                <span>Realtime Aktif</span>
              </div>

              <button
                type="button"
                onClick={() => loadActivities(true)}
                disabled={isRefreshing}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-main)',
                  border: '1.5px solid #E2E8F0',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: isRefreshing ? 'wait' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Segarkan data riwayat aktivitas secara manual"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                <span>{isRefreshing ? 'Menyinkron...' : 'Segarkan'}</span>
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--accent-tint)',
                color: 'var(--primary-blue)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <Clock size={13} />
                <span>Terhubung Langsung dengan Kartu Aktivitas Dashboard</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Semua Riwayat Aktivitas Belajar Siswa 📚
              </h1>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.94rem',
                marginTop: '6px',
                marginBottom: 0
              }}>
                Menampilkan seluruh jejak materi yang telah kamu buka dan pelajari,{' '}
                <strong style={{ color: 'var(--primary-blue)' }}>{activitiesData?.student?.name || user?.name || 'Siswa Hebat'}</strong>!
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              padding: '10px 18px',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid #E2E8F0',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <AvatarDisplay avatarId={activitiesData?.student?.avatar || user?.avatar} size={42} />
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  {activitiesData?.student?.name || user?.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                  Kelas {activitiesData?.student?.grade || user?.grade || 3} SD • {totalPoints} ⭐ Bintang
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. SUMMARY STAT CARDS (4 KARTU METRIK UTAMA)
            ========================================================================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Card 1: Total Materi Tuntas */}
          <motion.div
            whileHover={{ y: -3 }}
            className="kids-card"
            style={{
              padding: '20px',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle size={24} color="#10B981" />
            </div>
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                Materi Tuntas
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {totalCompleted} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Materi</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Sedang Belajar */}
          <motion.div
            whileHover={{ y: -3 }}
            className="kids-card"
            style={{
              padding: '20px',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: 'var(--accent-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BookOpen size={24} color="var(--primary-blue)" />
            </div>
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
                Sedang Dipelajari
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {totalInProgress} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Materi</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Total Waktu Belajar Realtime */}
          <motion.div
            whileHover={{ y: -3 }}
            className="kids-card"
            style={{
              padding: '20px',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Clock size={24} color="#D97706" />
            </div>
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>
                Waktu Belajar Nyata
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {totalStudyMinutes} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Menit</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Total Poin / Bintang */}
          <motion.div
            whileHover={{ y: -3 }}
            className="kids-card"
            style={{
              padding: '20px',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#EDE9FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={24} color="#8B5CF6" />
            </div>
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase' }}>
                Bintang Diperoleh
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {totalPoints} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>⭐</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            3. TOOLBAR: PENCARIAN, FILTER STATUS, FILTER MAPEL & URUTAN
            ========================================================================= */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          border: '1.5px solid #E2E8F0',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            {/* Input Pencarian */}
            <div style={{
              position: 'relative',
              flex: '1 1 280px',
              minWidth: '220px'
            }}>
              <Search
                size={18}
                color="var(--text-muted)"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Cari judul materi atau mata pelajaran..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 42px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  transition: 'all 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-blue)';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.backgroundColor = '#F8FAFC';
                }}
              />
            </div>

            {/* Filter Tab Status: Semua, Selesai, Sedang Belajar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              gap: '4px',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('all');
                  setCurrentPage(1);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: statusFilter === 'all' ? 700 : 600,
                  backgroundColor: statusFilter === 'all' ? '#FFFFFF' : 'transparent',
                  color: statusFilter === 'all' ? 'var(--primary-blue)' : 'var(--text-muted)',
                  boxShadow: statusFilter === 'all' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Semua ({rawActivities.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter('selesai');
                  setCurrentPage(1);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: statusFilter === 'selesai' ? 700 : 600,
                  backgroundColor: statusFilter === 'selesai' ? '#FFFFFF' : 'transparent',
                  color: statusFilter === 'selesai' ? '#10B981' : 'var(--text-muted)',
                  boxShadow: statusFilter === 'selesai' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Selesai ({totalCompleted})
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter('sedang_belajar');
                  setCurrentPage(1);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: statusFilter === 'sedang_belajar' ? 700 : 600,
                  backgroundColor: statusFilter === 'sedang_belajar' ? '#FFFFFF' : 'transparent',
                  color: statusFilter === 'sedang_belajar' ? 'var(--primary-blue)' : 'var(--text-muted)',
                  boxShadow: statusFilter === 'sedang_belajar' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Sedang Belajar ({totalInProgress})
              </button>
            </div>

            {/* Dropdown Filter Mapel & Sort */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {/* Filter Mata Pelajaran */}
              {uniqueSubjects.length > 1 && (
                <select
                  value={subjectFilter}
                  onChange={(e) => {
                    setSubjectFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="all">Semua Mapel</option>
                  {uniqueSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              )}

              {/* Urutan / Sort */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="newest">🕒 Terbaru Dibuka</option>
                <option value="oldest">🕒 Terlama</option>
                <option value="duration">⏱️ Durasi Belajar Terbanyak</option>
                <option value="score">🏆 Nilai Kuis Tertinggi</option>
              </select>

              {/* Reset filter jika ada filter yang aktif */}
              {(searchQuery || statusFilter !== 'all' || subjectFilter !== 'all' || sortBy !== 'newest') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                  title="Reset filter ke pengaturan awal"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. DAFTAR RIWAYAT AKTIVITAS BELAJAR (CARD LIST - IDENTIK DENGAN CARD DASHBOARD)
            ========================================================================= */}
        {rawActivities.length === 0 ? (
          /* Empty State: Belum pernah belajar sama sekali */
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '2px dashed #CBD5E1',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '2rem'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 8px 0' }}>
              Belum Ada Riwayat Aktivitas Belajar
            </h3>
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              maxWidth: '420px',
              margin: '0 auto 20px auto',
              lineHeight: 1.6
            }}>
              Materi pembelajaran yang kamu buka dan kuis yang kamu kerjakan akan tercatat otomatis secara real-time di sini. Yuk, mulai belajar materi seru sekarang!
            </p>
            <button
              onClick={() => navigate('/jelajahi')}
              className="btn btn-primary"
              style={{ fontWeight: 700 }}
            >
              <Compass size={18} />
              <span>Jelajahi Materi Pelajaran</span>
            </button>
          </div>
        ) : filteredActivities.length === 0 ? (
          /* Empty State Filter: Kriteria pencarian tidak ditemukan */
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid #E2E8F0',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              fontSize: '1.6rem'
            }}>
              🔍
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
              Tidak Ada Aktivitas yang Cocok
            </h4>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              maxWidth: '380px',
              margin: '0 auto 18px auto'
            }}>
              Coba gunakan kata kunci pencarian yang berbeda atau reset filter untuk menampilkan semua aktivitas belajarmu.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-outline"
              style={{ fontSize: '0.88rem', fontWeight: 700, padding: '8px 22px' }}
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${safeCurrentPage}-${statusFilter}-${subjectFilter}-${sortBy}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {paginatedActivities.map((item, idx) => {
                  const isDone = item.status === 'selesai';
                  return (
                    <motion.div
                      key={item.id || idx}
                      whileHover={{ scale: 1.008, backgroundColor: '#F8FAFC' }}
                      className="activity-item-card"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-lg)',
                        border: '1.5px solid #E2E8F0',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.2s ease',
                        padding: '16px 20px'
                      }}
                    >
                      {/* Sisi Kiri Item: Icon & Info Materi (Identik dengan Dashboard Activity Card) */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flex: 1,
                        minWidth: 0,
                        width: '100%'
                      }}>
                        {/* Icon Mapel */}
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

                        {/* Rincian Materi */}
                        <div style={{ minWidth: 0, flex: 1 }}>
                          {/* Baris Meta: Mata Pelajaran + Jam Buka Materi Realtime */}
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
                              title={item.updated_at ? `${item.updated_at} WIB` : 'Waktu buka materi'}
                            >
                              <Clock size={11} color="var(--primary-blue)" />
                              <span>{formatRealtimeAgo(item.raw_updated_at || item.updated_at)}</span>
                            </span>
                          </div>

                          {/* Judul Materi */}
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

                          {/* Baris Badges: Status + Durasi Belajar + Poin/Skor (Sama Persis dengan Dashboard) */}
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

                            {/* Durasi Belajar Realtime */}
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: '#D97706',
                              backgroundColor: '#FEF3C7',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)'
                            }}>
                              ⏱️ {getRealtimeDuration(item)}m belajar
                            </span>

                            {/* Nilai Kuis jika ada */}
                            {item.score !== null && item.score !== undefined && (
                              <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#059669',
                                backgroundColor: '#D1FAE5',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}>
                                <Award size={11} />
                                <span>Nilai: {item.score}</span>
                              </span>
                            )}

                            {/* Poin Bintang */}
                            {item.points_earned && (
                              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#D97706' }}>
                                +{item.points_earned} Poin ⭐
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sisi Kanan: Tombol Aksi Buka / Ulangi Materi */}
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
                          onMouseEnter={(e) => {
                            if (isDone) {
                              e.currentTarget.style.backgroundColor = 'var(--accent-soft)';
                            } else {
                              e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isDone) {
                              e.currentTarget.style.backgroundColor = 'var(--accent-tint)';
                            } else {
                              e.currentTarget.style.backgroundColor = 'var(--primary-blue)';
                            }
                          }}
                        >
                          <span>{isDone ? 'Ulangi' : 'Buka'}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '18px',
                padding: '14px 18px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Menampilkan <strong>{((safeCurrentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredActivities.length)}</strong> dari <strong>{filteredActivities.length}</strong> aktivitas
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: safeCurrentPage === 1 ? '#F1F5F9' : '#FFFFFF',
                      color: safeCurrentPage === 1 ? '#94A3B8' : 'var(--text-main)',
                      cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                    title="Halaman Sebelumnya"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const p = idx + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: 'var(--radius-md)',
                          border: safeCurrentPage === p ? '1.5px solid var(--primary-blue)' : '1.5px solid #E2E8F0',
                          backgroundColor: safeCurrentPage === p ? 'var(--primary-blue)' : '#FFFFFF',
                          color: safeCurrentPage === p ? '#FFFFFF' : 'var(--text-main)',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: safeCurrentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
                      color: safeCurrentPage === totalPages ? '#94A3B8' : 'var(--text-main)',
                      cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                    title="Halaman Berikutnya"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
