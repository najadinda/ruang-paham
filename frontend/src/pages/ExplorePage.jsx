import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Calculator, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  Languages, 
  Sparkles, 
  Palette,
  HeartPulse,
  Clock, 
  CheckCircle, 
  Play, 
  ArrowLeft,
  ChevronRight,
  BookMarked,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function ExplorePage({ onOpenLesson, initialSubjectId = null }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState(user?.grade ? String(user.grade) : '3');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Detail view state: if user clicked a subject card to see its Lesson List
  const [activeSubject, setActiveSubject] = useState(null);
  const [subjectLessons, setSubjectLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [errorLessons, setErrorLessons] = useState(null);

  useEffect(() => {
    loadSubjects();
  }, [selectedGrade]);

  useEffect(() => {
    if (initialSubjectId) {
      handleSelectSubject(initialSubjectId);
    }
  }, [initialSubjectId]);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.getSubjects(selectedGrade === 'all' ? null : selectedGrade);
      setSubjects(res.subjects || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubject = async (subjectId) => {
    try {
      setLoadingLessons(true);
      setErrorLessons(null);
      const res = await api.getSubject(subjectId, selectedGrade === 'all' ? null : selectedGrade);
      setActiveSubject(res.subject);
      setSubjectLessons(res.lessons || []);
    } catch (err) {
      console.error('Error fetching subject lessons:', err);
      const matched = subjects.find(s => s.id === subjectId);
      if (matched) setActiveSubject(matched);
      setErrorLessons('Gagal memuat materi dari server. Pastikan koneksi server aktif lalu coba lagi.');
      setSubjectLessons([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  const getSubjectIcon = (iconName, size = 32, color = '#FFFFFF') => {
    switch (iconName) {
      case 'Atom': return <Atom size={size} color={color} />;
      case 'Calculator': return <Calculator size={size} color={color} />;
      case 'BookOpen': return <BookOpen size={size} color={color} />;
      case 'Globe': return <Globe size={size} color={color} />;
      case 'ShieldCheck': return <ShieldCheck size={size} color={color} />;
      case 'Languages': return <Languages size={size} color={color} />;
      case 'Palette': return <Palette size={size} color={color} />;
      case 'HeartPulse': return <HeartPulse size={size} color={color} />;
      default: return <Sparkles size={size} color={color} />;
    }
  };

  const grades = [
    { id: '1', label: 'Kelas 1' },
    { id: '2', label: 'Kelas 2' },
    { id: '3', label: 'Kelas 3' },
    { id: '4', label: 'Kelas 4' },
    { id: '5', label: 'Kelas 5' },
    { id: '6', label: 'Kelas 6' },
    { id: 'all', label: 'Semua Kelas' },
  ];

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* If Active Subject is selected: Show Lesson List (3.5 Alur saat card diklik) */}
        <AnimatePresence mode="wait">
          {activeSubject ? (
            <motion.div
              key="lesson-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <button
                onClick={() => setActiveSubject(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  color: 'var(--primary-blue)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginBottom: '24px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={18} />
                <span>Kembali ke Pilihan Mata Pelajaran</span>
              </button>

              {/* Subject Banner */}
              <div style={{
                background: `linear-gradient(135deg, ${activeSubject.theme_color || 'var(--primary-blue)'} 0%, #1E3A8A 100%)`,
                borderRadius: 'var(--radius-xl)',
                padding: '36px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '40px',
                boxShadow: '0 12px 30px rgba(59, 130, 246, 0.25)'
              }}>
                <div style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getSubjectIcon(activeSubject.icon, 40, '#FFFFFF')}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    opacity: 0.9,
                    marginBottom: '4px'
                  }}>
                    Daftar Urutan Materi • {selectedGrade === 'all' ? 'Semua Tingkat' : `Kelas ${selectedGrade} SD`}
                  </div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    {activeSubject.name}
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, marginTop: '8px', maxWidth: '640px' }}>
                    {activeSubject.description}
                  </p>
                </div>
              </div>

              {/* Lesson List Cards */}
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>
                Bab Pembelajaran (Lesson List)
              </h2>

              {loadingLessons ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Sparkles size={32} color="var(--primary-blue)" />
                  <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Memuat bab materi...</p>
                </div>
              ) : errorLessons ? (
                <div className="kids-card" style={{ textAlign: 'center', padding: '40px', border: '2px dashed #FCA5A5' }}>
                  <AlertCircle size={36} color="var(--error-red)" style={{ margin: '0 auto 12px' }} />
                  <p style={{ color: 'var(--text-dark)', fontWeight: 700, marginBottom: '6px' }}>Koneksi Belum Terhubung</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>{errorLessons}</p>
                  <button
                    className="btn-primary"
                    onClick={() => handleSelectSubject(activeSubject?.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
                  >
                    <RotateCcw size={16} />
                    <span>Coba Muat Ulang</span>
                  </button>
                </div>
              ) : subjectLessons.length === 0 ? (
                <div className="kids-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--text-muted)' }}>Belum ada materi untuk kelas ini. Coba pilih kelas lainnya!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {subjectLessons.map((lesson) => {
                    const isCompleted = lesson.status === 'selesai';
                    const isInProgress = lesson.status === 'sedang_belajar';

                    return (
                      <motion.div
                        key={lesson.id}
                        whileHover={{ y: -3, scale: 1.005 }}
                        className="kids-card"
                        style={{
                          padding: '24px 28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '20px',
                          cursor: 'pointer',
                          borderLeft: `8px solid ${isCompleted ? 'var(--success-green)' : isInProgress ? '#F59E0B' : 'var(--accent-blue)'}`
                        }}
                        onClick={() => {
                          if (typeof onOpenLesson === 'function') onOpenLesson(lesson.id);
                          navigate(`/materi/${lesson.id}`);
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '16px',
                            backgroundColor: isCompleted ? 'var(--success-light)' : isInProgress ? '#FEF3C7' : 'var(--accent-tint)',
                            color: isCompleted ? 'var(--success-green)' : isInProgress ? '#D97706' : 'var(--primary-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            flexShrink: 0
                          }}>
                            {isCompleted ? <CheckCircle size={26} /> : `Bab ${lesson.chapter_number}`}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                {lesson.title}
                              </h3>
                              {isCompleted && <span className="badge badge-green">Selesai</span>}
                              {isInProgress && <span className="badge badge-orange">Sedang Belajar</span>}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                              {lesson.summary}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            <Clock size={16} />
                            <span>{lesson.duration_minutes || 10} menit</span>
                          </div>

                          <button
                            className={`btn ${isCompleted ? 'btn-outline' : 'btn-primary'}`}
                            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                          >
                            <Play size={16} fill={isCompleted ? 'none' : '#FFFFFF'} />
                            <span>{isCompleted ? 'Ulangi Materi' : 'Mulai Belajar'}</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            /* 3.5 Grid Mata Pelajaran + Filter Tabs Kelas */
            <motion.div
              key="grid-subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header Title */}
              <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px' }}>
                  Jelajahi Mata Pelajaran
                </span>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
                  Pilih Kelas & Materi Favoritmu
                </h1>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  Gunakan tombol filter di bawah untuk melihat mata pelajaran yang sesuai dengan tingkat kelasmu!
                </p>
              </div>

              {/* 3.5 Filter / Tabs Kelas (Kelas 1 hingga Kelas 6) */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '40px'
              }}>
                {grades.map((g) => {
                  const isSelected = selectedGrade === g.id;
                  return (
                    <motion.button
                      key={g.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedGrade(g.id)}
                      style={{
                        padding: '11px 22px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.94rem',
                        fontWeight: 600,
                        backgroundColor: isSelected ? 'var(--primary-blue)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                        border: isSelected ? '2px solid var(--primary-blue)' : '2px solid var(--border-light)',
                        boxShadow: isSelected ? '0 4px 14px rgba(59, 130, 246, 0.25)' : 'var(--shadow-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {g.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* 3.5 Grid Mata Pelajaran */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <Sparkles size={36} color="var(--primary-blue)" />
                  <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Memuat mata pelajaran...</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '26px'
                }}>
                  {subjects.map((subj) => (
                    <motion.div
                      key={subj.id}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="kids-card"
                      style={{
                        cursor: 'pointer',
                        borderTop: `5px solid ${subj.theme_color || 'var(--primary-blue)'}`
                      }}
                      onClick={() => handleSelectSubject(subj.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '20px',
                          backgroundColor: 'var(--accent-tint)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1.5px solid var(--accent-soft)`
                        }}>
                          {getSubjectIcon(subj.icon, 30, subj.theme_color)}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            {subj.name}
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: subj.theme_color, fontWeight: 600 }}>
                            {subj.lessons_count || 1} Bab Pembelajaran
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
                        {subj.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid #F1F5F9'
                      }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: subj.theme_color }}>
                          Buka Urutan Materi
                        </span>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-tint)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: subj.theme_color
                        }}>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
