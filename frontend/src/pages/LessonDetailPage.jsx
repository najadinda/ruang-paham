import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Video, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

export function LessonDetailPage({ lessonId: propLessonId, onBack, onComplete }) {
  const { lessonId: paramLessonId } = useParams();
  const navigate = useNavigate();
  const lessonId = propLessonId || (paramLessonId ? parseInt(paramLessonId, 10) : 4);

  const handleBack = () => {
    if (typeof onBack === 'function') onBack();
    else navigate('/jelajahi');
  };

  const handleComplete = () => {
    if (typeof onComplete === 'function') onComplete();
    else navigate('/dashboard');
  };

  const { user, setUser } = useAuth();
  const [phase, setPhase] = useState('materi'); // 'materi' | 'kuis' | 'selesai'
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quiz interactive state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [quizId]: 'A' | 'B' | 'C' | 'D' }
  const [answeredState, setAnsweredState] = useState(null); // { isCorrect: bool, selectedKey: 'A', explanation: string }
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    loadLessonAndQuiz();
  }, [lessonId]);

  const loadLessonAndQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const lessonRes = await api.getLesson(lessonId);
      setLesson(lessonRes.lesson);

      const quizRes = await api.getQuiz(lessonId);
      setQuizzes(quizRes.quizzes || []);
    } catch (err) {
      console.error('Failed to load lesson & quiz:', err);
      setError('Gagal memuat materi dan kuis dari server. Pastikan koneksi server aktif lalu coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (key) => {
    if (answeredState) return; // Prevent re-click before next

    const currentQuiz = quizzes[currentQuizIndex];
    const isCorrect = key.toUpperCase() === currentQuiz.correct_option.toUpperCase();

    const newAnswers = { ...selectedAnswers, [currentQuiz.id]: key };
    setSelectedAnswers(newAnswers);

    const correctOpt = currentQuiz.options?.find(
      opt => opt.key.toUpperCase() === currentQuiz.correct_option.toUpperCase()
    );
    const correctKey = currentQuiz.correct_option?.toUpperCase() || '';
    const correctText = correctOpt ? correctOpt.text : '';

    // Bersihkan prefix pujian jika ada di penjelasan dasar
    const cleanExp = (currentQuiz.explanation || '')
      .replace(/^(?:Bagus|Hebat|Pintar|Tepat sekali|Tepat|Keren|Luar biasa|Mantap|Sip|Benar sekali|Benar|Sempurna|Masya Allah|Wah hebat|Cerdas|Good job|Well done|Brilliant)[!,\.]?\s*[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u26ff\u2700-\u27bf\s]*/iu, '')
      .trim() || currentQuiz.explanation;

    // Logika IF-ELSE:
    // Jika benar -> responnya "Bagus! ..."
    // Jika salah/kurang tepat -> responnya diberikan penjelasan jawaban yang benar
    let feedbackComment = '';
    if (isCorrect) {
      feedbackComment = `Bagus! 🎉 ${cleanExp}`;
    } else {
      feedbackComment = `Jawaban yang benar adalah pilihan ${correctKey} (${correctText}). Penjelasan: ${cleanExp}`;
    }

    setAnsweredState({
      isCorrect,
      selectedKey: key,
      correctKey,
      correctText,
      cleanExplanation: cleanExp,
      feedbackComment,
      explanation: feedbackComment
    });

    if (isCorrect) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Confetti optional
      }
    }
  };

  const handleNextQuizQuestion = () => {
    setAnsweredState(null);
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      const res = await api.submitQuiz(lesson.id, selectedAnswers);
      setQuizScore(res);
      if (user && res.total_user_points) {
        setUser({ ...user, points: res.total_user_points });
      }
    } catch {
      // Calculate locally if offline
      let correct = 0;
      quizzes.forEach(q => {
        if (selectedAnswers[q.id]?.toUpperCase() === q.correct_option?.toUpperCase()) {
          correct++;
        }
      });
      const score = Math.round((correct / quizzes.length) * 100);
      setQuizScore({
        score,
        correct_count: correct,
        total_questions: quizzes.length,
        points_earned: correct * 10
      });
    }

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // Ignored
    }

    setPhase('selesai');
  };

  if (loading || !lesson) {
    if (error && !loading) {
      return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '520px', textAlign: 'center' }}>
          <div className="kids-card" style={{ padding: '40px 28px', border: '2px dashed #FCA5A5' }}>
            <AlertCircle size={44} color="var(--error-red)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Gagal Memuat Materi</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>{error}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={handleBack}>
                Kembali ke Jelajahi
              </button>
              <button className="btn-primary" onClick={loadLessonAndQuiz} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={16} /> Coba Lagi
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <LoadingScreen text="Membuka modul pembelajaran..." />;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div style={{ padding: '30px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Back navigation button */}
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            color: 'var(--primary-blue)',
            fontWeight: 700,
            fontSize: '0.95rem',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} />
          <span>Kembali ke Daftar Materi</span>
        </button>

        {/* ======================================================== */}
        {/* 3.6 FASE MATERI (Chunking, Foto & Video dalam Bingkai Biru) */}
        {/* ======================================================== */}
        {phase === 'materi' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header Materi */}
            <div
              className="lesson-header-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '30px',
                border: '2px solid var(--border-blue)',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '30px'
              }}
            >
              <div className="lesson-category-badges">
                <span className="badge badge-blue">
                  {lesson.subject?.name || 'Mata Pelajaran'}
                </span>
                <span className="badge badge-orange">
                  Kelas {lesson.grade} SD • Bab {lesson.chapter_number}
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', margin: '8px 0' }}>
                {lesson.title}
              </h1>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
                {lesson.summary}
              </p>
            </div>

            {/* Video Edukasi & Ilustrasi dalam Bingkai Biru (Blue Frame) */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              border: '3px solid var(--primary-blue)',
              boxShadow: '0 12px 30px rgba(59, 130, 246, 0.15)',
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                color: 'var(--primary-blue)',
                fontWeight: 700
              }}>
                <Video size={20} />
                <span>Video Edukasi Interaktif</span>
              </div>

              {lesson.video_url && (
                <div style={{
                  position: 'relative',
                  paddingBottom: '52%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--accent-blue)',
                  backgroundColor: '#000000',
                  marginBottom: '20px'
                }}>
                  <iframe
                    src={lesson.video_url}
                    title={lesson.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Foto Ilustrasi dalam Bingkai Biru */}
              {lesson.image_url && (
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '2px solid var(--accent-blue)',
                  position: 'relative',
                  maxHeight: '380px'
                }}>
                  <img
                    src={lesson.image_url}
                    alt={lesson.title}
                    style={{ width: '100%', height: 'clamp(180px, 42vw, 340px)', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 18px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    Ilustrasi Belajar: {lesson.title}
                  </div>
                </div>
              )}
            </div>

            {/* Teks Penjelasan Dipecah Pendek (Chunking Maksimal 3-4 Baris) */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px',
                color: 'var(--text-main)',
                fontWeight: 800,
                fontSize: '1.25rem'
              }}>
                <BookOpen size={22} color="var(--primary-blue)" />
                <span>Poin-Poin Penting Materi (Mudah Dipahami!)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {lesson.content_chunks?.map((chunk, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    className="kids-card lesson-chunk-card"
                    style={{
                      borderLeft: '8px solid var(--primary-blue)',
                      padding: '24px 28px'
                    }}
                  >
                    <div className="lesson-chunk-header">
                      <h3 className="lesson-chunk-title">
                        {idx + 1}. {chunk.title}
                      </h3>
                      {chunk.highlight && (
                        <span className="badge badge-blue lesson-topic-badge">
                          ✨ {chunk.highlight}
                        </span>
                      )}
                    </div>

                    {/* Short chunked text (max 3-4 lines with clean whitespace) */}
                    <p style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      color: 'var(--text-main)',
                      whiteSpace: 'pre-line',
                      margin: 0,
                      fontWeight: 500
                    }}>
                      {chunk.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3.6 CTA Bawah: Tombol Berdenyut "Aku Sudah Paham! Mulai Kuis" */}
            <div style={{
              textAlign: 'center',
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--accent-blue)',
              boxShadow: 'var(--shadow-card)'
            }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
                Apakah Kamu Sudah Siap Menguji Pemahamanmu? 🎯
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Ada {quizzes.length} soal kuis santai dan seru untuk mengumpulkan bintang emas!
              </p>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setPhase('kuis')}
                className="btn btn-primary btn-lg btn-pulse"
                style={{
                  fontSize: 'clamp(0.98rem, 3.5vw, 1.2rem)',
                  fontWeight: 800,
                  padding: 'clamp(14px, 3vw, 18px) clamp(20px, 5vw, 44px)',
                  borderRadius: 'var(--radius-xl)',
                  maxWidth: '100%',
                  whiteSpace: 'normal',
                  textAlign: 'center'
                }}
              >
                <Sparkles size={24} />
                <span>Aku Sudah Paham! Mulai Kuis</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 3.6 FASE KUIS (1 Soal per Layar, Teks Besar, Opsi Grid Besar, Feedback Instan) */}
        {/* ======================================================== */}
        {phase === 'kuis' && currentQuiz && (
          <motion.div
            key={currentQuizIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            {/* Header Status Kuis */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              backgroundColor: '#FFFFFF',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #DBEAFE',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Soal Kuis
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  Nomor {currentQuizIndex + 1} dari {quizzes.length}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: 'clamp(120px, 28vw, 180px)', height: '10px', backgroundColor: 'var(--accent-soft)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary-blue)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {/* UI FOKUS: 1 Soal per Layar dengan Teks Besar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(20px, 4vw, 40px)',
              border: '3px solid var(--accent-blue)',
              boxShadow: 'var(--shadow-card-hover)',
              marginBottom: '28px',
              textAlign: 'center'
            }}>
              <span className="badge badge-blue" style={{ marginBottom: '16px' }}>
                Pertanyaan #{currentQuizIndex + 1}
              </span>

              <h2 style={{
                fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.45,
                margin: '10px 0 28px 0'
              }}>
                "{currentQuiz.question}"
              </h2>

              {/* 3.6 Opsi Jawaban: Kotak Opsi (A, B, C, D) Berbentuk Grid Besar */}
              <div className="quiz-options-grid">
                {currentQuiz.options?.map((opt) => {
                  const isSelected = answeredState?.selectedKey === opt.key;
                  const isCorrectKey = opt.key.toUpperCase() === currentQuiz.correct_option?.toUpperCase();

                  let optBg = '#FFFFFF';
                  let optBorder = 'var(--border-light)';
                  let optColor = 'var(--text-main)';

                  if (answeredState) {
                    if (isCorrectKey) {
                      optBg = 'var(--success-light)';
                      optBorder = 'var(--success-green)';
                      optColor = '#065F46';
                    } else if (isSelected && !answeredState.isCorrect) {
                      optBg = 'var(--danger-light)';
                      optBorder = 'var(--danger-red)';
                      optColor = '#991B1B';
                    }
                  }

                  return (
                    <motion.button
                      key={opt.key}
                      whileHover={!answeredState ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!answeredState ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectOption(opt.key)}
                      disabled={!!answeredState}
                      style={{
                        padding: '20px 24px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: optBg,
                        border: `2px solid ${optBorder}`,
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: answeredState ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        color: optColor
                      }}
                    >
                      {/* Option Key Badge A, B, C, D */}
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: isCorrectKey && answeredState ? 'var(--success-green)' : isSelected && answeredState && !answeredState.isCorrect ? 'var(--danger-red)' : 'var(--accent-tint)',
                        color: (isCorrectKey || isSelected) && answeredState ? '#FFFFFF' : 'var(--primary-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        flexShrink: 0
                      }}>
                        {opt.key}
                      </div>

                      <div style={{ fontSize: '1.1rem', fontWeight: 700, flex: 1 }}>
                        {opt.text}
                      </div>

                      {/* Icon indicator */}
                      {answeredState && isCorrectKey && (
                        <CheckCircle2 size={24} color="var(--success-green)" />
                      )}
                      {answeredState && isSelected && !answeredState.isCorrect && (
                        <XCircle size={24} color="var(--danger-red)" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* 3.6 Feedback Instan: Tombol hijau + centang (benar) atau tombol merah + silang + pop-up penjelasan (salah) */}
              <AnimatePresence>
                {answeredState && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      marginTop: '28px',
                      padding: '22px 26px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: answeredState.isCorrect ? '#ECFDF5' : '#FEF2F2',
                      border: `2px solid ${answeredState.isCorrect ? 'var(--success-green)' : 'var(--danger-red)'}`,
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      {answeredState.isCorrect ? (
                        <>
                          <CheckCircle2 size={26} color="var(--success-green)" />
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065F46', margin: 0 }}>
                            Bagus Sekali! Jawabanmu Benar! 🎉
                          </h4>
                        </>
                      ) : (
                        <>
                          <XCircle size={26} color="var(--danger-red)" />
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#991B1B', margin: 0 }}>
                            Jawaban Kurang Tepat, Tetap Semangat! 💪
                          </h4>
                        </>
                      )}
                    </div>

                    {/* Respon Komentar Berdasarkan If-Else */}
                    {answeredState.isCorrect ? (
                      /* IF BENAR: Respon bernada "Bagus! ..." */
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#047857',
                        margin: '8px 0 16px 0',
                        fontWeight: 600
                      }}>
                        Bagus! 🎉 {answeredState.cleanExplanation}
                      </p>
                    ) : (
                      /* ELSE SALAH/KURANG TEPAT: Diberikan penjelasan jawaban yang benar */
                      <div style={{
                        fontSize: '0.98rem',
                        lineHeight: 1.6,
                        margin: '10px 0 18px 0'
                      }}>
                        <div style={{
                          backgroundColor: '#FEE2E2',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          color: '#991B1B',
                          fontWeight: 700
                        }}>
                          Jawaban yang benar:{' '}
                          <span style={{ textDecoration: 'underline' }}>
                            Pilihan {answeredState.correctKey} ({answeredState.correctText})
                          </span>
                        </div>
                        <p style={{ color: '#7F1D1D', margin: 0, fontWeight: 500 }}>
                          <strong>Penjelasan:</strong> {answeredState.cleanExplanation}
                        </p>
                      </div>
                    )}

                    <div style={{ textAlign: 'right' }}>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleNextQuizQuestion}
                        className={`btn ${answeredState.isCorrect ? 'btn-success' : 'btn-primary'}`}
                        style={{ padding: '12px 28px' }}
                      >
                        <span>
                          {currentQuizIndex + 1 < quizzes.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}
                        </span>
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* FASE SELESAI (Perayaan Skor & Poin Bintang) */}
        {/* ======================================================== */}
        {phase === 'selesai' && quizScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="kids-card"
            style={{
              textAlign: 'center',
              padding: '50px 30px',
              border: '3px solid var(--primary-blue)'
            }}
          >
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: '#FEF3C7',
              color: '#D97706',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.4rem',
              marginBottom: '16px'
            }}>
              🏆
            </div>

            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              Selamat Sahabat Pintar!
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
              Kamu telah menyelesaikan modul dan kuis <strong>{lesson.title}</strong>!
            </p>

            {/* Score Ring / Card */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 'clamp(16px, 4vw, 40px)',
              backgroundColor: 'var(--accent-tint)',
              border: '2px solid var(--accent-blue)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px)',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Skor Kuis
                </div>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  {quizScore.score}%
                </div>
              </div>

              <div className="score-ring-divider" style={{ width: '2px', height: '40px', backgroundColor: 'var(--accent-blue)' }} />

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Poin Diraih
                </div>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, color: '#D97706' }}>
                  +{quizScore.points_earned || 20} ⭐
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPhase('materi');
                  setCurrentQuizIndex(0);
                  setSelectedAnswers({});
                  setAnsweredState(null);
                }}
                className="btn btn-outline"
              >
                <RotateCcw size={18} />
                <span>Pelajari Lagi Materi</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleComplete}
                className="btn btn-primary"
              >
                <CheckCircle2 size={18} />
                <span>Kembali ke Dashboard</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
