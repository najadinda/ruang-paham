import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Brain, 
  Flame, 
  Award, 
  CheckCircle2, 
  Atom, 
  Calculator, 
  BookOpen, 
  ShieldCheck, 
  Languages, 
  Palette, 
  HeartPulse, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LandingPage({ setActivePage }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRegisterClick = () => {
    if (typeof setActivePage === 'function') setActivePage('register');
    navigate('/register');
  };
  const pillars = [
    {
      icon: <Brain size={28} color="var(--primary-blue)" />,
      title: 'Materi Ringkas (Chunking)',
      desc: 'Setiap bab materi dipecah pendek 3-4 baris agar sahabat kecil tidak cepat lelah dan langsung paham intinya.',
      badge: 'Bebas Pusing'
    },
    {
      icon: <Flame size={28} color="#D97706" />,
      title: 'Gamifikasi & Api Semangat',
      desc: 'Belajar seperti bermain petualangan! Kumpulkan poin, pelihara api semangat harian, dan selesaikan daily quest.',
      badge: 'Seru Tiap Hari'
    },
    {
      icon: <Award size={28} color="#059669" />,
      title: 'Kuis Ceria & Feedback Instan',
      desc: 'Soal kuis interaktif satu per satu dengan penjelasan ramah anak. Salah tidak apa-apa, ayo belajar lagi bersama!',
      badge: 'Percaya Diri'
    }
  ];

  const subjectPreviews = [
    {
      id: 1,
      name: 'IPAS (Sains & Sosial)',
      icon: <Atom size={30} />,
      color: '#3B82F6',
      bg: '#EFF6FF',
      desc: 'Eksplorasi panca indra, wujud benda, daur hidup kupu-kupu, fotosintesis, tata surya, dan sejarah sosial nusantara.'
    },
    {
      id: 2,
      name: 'Matematika (Numerasi & Logika)',
      icon: <Calculator size={30} />,
      color: '#10B981',
      bg: '#ECFDF5',
      desc: 'Bilangan cacah, penjumlahan gembira, pecahan senilai, keliling & luas, hingga volume bangun ruang.'
    },
    {
      id: 3,
      name: 'Bahasa Indonesia (Literasi & Sastra)',
      icon: <BookOpen size={30} />,
      color: '#F59E0B',
      bg: '#FFFBEB',
      desc: 'Membaca dongeng fabel, kalimat santun, ide pokok paragraf, puisi anak, dan pantun nasehat nusantara.'
    },
    {
      id: 4,
      name: 'Pendidikan Pancasila / PKn',
      icon: <ShieldCheck size={30} />,
      color: '#EF4444',
      bg: '#FEF2F2',
      desc: 'Makna simbol Garuda Pancasila, aturan di rumah & sekolah, hak dan kewajiban anak, serta persatuan NKRI.'
    },
    {
      id: 5,
      name: 'Bahasa Inggris (English for Kids)',
      icon: <Languages size={30} />,
      color: '#06B6D4',
      bg: '#ECFEFF',
      desc: 'Learn cheerful alphabet, colors, animals, telling time, daily activities, and friendly conversations.'
    },
    {
      id: 6,
      name: 'SBdP (Seni Budaya & Prakarya)',
      icon: <Palette size={30} />,
      color: '#EC4899',
      bg: '#FDF2F8',
      desc: 'Berekspresi lewat warna primer, karya kolase bahan alam, seni origami, tempo musik, dan komik bergambar.'
    },
    {
      id: 7,
      name: 'PJOK (Pendidikan Jasmani & Kesehatan)',
      icon: <HeartPulse size={30} />,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      desc: 'Gerak lokomotor, kebugaran jasmani, senam irama ceria, teknik bola, dan budaya hidup bersih sehat.'
    },
    {
      id: 8,
      name: 'Pendidikan Agama & Budi Pekerti',
      icon: <Sparkles size={30} />,
      color: '#14B8A6',
      bg: '#F0FDFA',
      desc: 'Mengenal keagungan Tuhan, doa harian anak beriman, akhlak mulia kejujuran, dan kisah teladan luhur.'
    }
  ];

  return (
    <div>
      {/* 3.1 Hero Section */}
      <section style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        background: 'radial-gradient(ellipse at top, #EFF6FF 0%, #F8FAFC 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Floating Shapes */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '5%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(147, 197, 253, 0.25)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '5%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.15)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          alignItems: 'center',
          gap: 'clamp(28px, 5vw, 50px)'
        }}>
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--text-main)',
              letterSpacing: '-0.4px',
              marginBottom: '20px'
            }}>
              Belajar Makin Seru dan Mudah di <span style={{ color: 'var(--primary-blue)' }}>Ruang Paham!</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '520px',
              fontWeight: 400
            }}>
              Ruang belajar digital yang dirancang khusus untuk siswa SD Kelas 1 hingga 6. Dilengkapi materi ringkas, video edukasi, kuis interaktif, dan karakter robot & satwa sahabatmu!
            </p>

            {/* CTA Button: Mulai Petualangan Belajarmu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRegisterClick}
                className="btn btn-primary btn-lg"
              >
                <Rocket size={20} />
                <span>Mulai Petualangan Belajarmu</span>
              </motion.button>
            </div>

            {/* Micro Highlights */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--success-green)" /> Kelas 1 - 6 SD
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--success-green)" /> 100% Ramah Privasi Anak
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--success-green)" /> Gratis & Interaktif
              </div>
            </div>
          </motion.div>

          {/* Right Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(18px, 4vw, 32px)',
              boxShadow: '0 20px 50px -12px rgba(59, 130, 246, 0.18)',
              border: '2px solid #DBEAFE',
              position: 'relative'
            }}>
              {/* Header inside mockup */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#DBEAFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem'
                  }}>
                    🤖
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-main)' }}>Robo Pintar</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 500 }}>Teman Belajar Setiamu</div>
                  </div>
                </div>
                <div className="badge badge-orange" style={{ fontWeight: 600 }}>
                  <Flame size={13} fill="#F59E0B" /> 5 Hari Streak
                </div>
              </div>

              {/* Sample chunk card preview */}
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: 'var(--radius-lg)',
                padding: '18px',
                marginBottom: '18px'
              }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--primary-blue)',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  IPA Kelas 3 • Bab 1
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Metamorfosis Kupu-Kupu 🦋
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                  Dari telur mungil di atas daun, berubah menjadi kepompong, hingga terbang menjadi kupu-kupu bersayap indah!
                </p>
              </div>

              {/* Interactive preview badge */}
              <div style={{
                backgroundColor: 'var(--accent-tint)',
                border: '1.5px solid var(--accent-blue)',
                color: 'var(--primary-blue)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                <span>Belajar Jadi Mudah & Seru</span>
              </div>
            </div>

            {/* Floating Badge 1: Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-badge-top"
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-8px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '10px 16px',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.1)',
                border: '1.5px solid #E0F2FE',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>🌟</div>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>Skor Kuis</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--success-green)' }}>100% Sempurna!</div>
              </div>
            </motion.div>

            {/* Floating Badge 2: Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-badge-bottom"
              style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-10px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '10px 16px',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.1)',
                border: '1.5px solid #FEF3C7',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>🔥</div>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>Api Semangat</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#D97706' }}>Aktif Tiap Hari</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.1 Section 3 Pilar Keunggulan (id="keunggulan" untuk smooth scroll) */}
      <section id="keunggulan" style={{ padding: '80px 0', backgroundColor: '#FFFFFF', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 46px auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: '12px' }}>
              Keunggulan Ruang Paham
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
              Mengapa Anak-Anak Suka Belajar di Sini?
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Metode pembelajaran berbasis teknologi yang disesuaikan dengan psikologi dan rasa ingin tahu anak sekolah dasar.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '24px'
          }}>
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="kids-card"
                style={{ textAlign: 'left', padding: '28px' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--accent-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid var(--accent-soft)'
                  }}>
                    {pillar.icon}
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: '0.8rem' }}>{pillar.badge}</span>
                </div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 600, marginBottom: '8px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.1 Section Pratinjau Mata Pelajaran (id="jelajahi" untuk navigasi Landing Page) */}
      {/* Catatan: Di Landing Page HANYA menampilkan card mata pelajaran, modul materi diakses di Halaman Siswa */}
      <section id="jelajahi" style={{ padding: '80px 0', backgroundColor: 'var(--bg-main)', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 46px auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: '12px' }}>
              Jelajahi Mata Pelajaran
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
              Mata Pelajaran Sekolah Dasar
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Materi lengkap dan seru yang disesuaikan dengan kurikulum SD Kelas 1 hingga 6. Masuk atau daftar akun untuk mengakses seluruh modul materi dan kuis interaktif!
            </p>
          </div>

          <div className="rp-grid-subjects">
            {subjectPreviews.map((subj) => (
              <div
                key={subj.id}
                className="kids-card"
                style={{
                  borderTop: `5px solid ${subj.color}`,
                  cursor: 'default',
                  padding: '26px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: subj.bg,
                    color: subj.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {subj.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                      {subj.name}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: subj.color, fontWeight: 600 }}>
                      Tersedia Kelas 1 - 6 SD
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                  {subj.desc}
                </p>

                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1.5px dashed #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                    Tersedia di Halaman Siswa
                  </span>
                  <span style={{ color: subj.color, fontWeight: 700 }}>
                    Modul Lengkap ✨
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.1 Final Call to Action: Button mengarahkan ke register page */}
      <section style={{
        padding: '70px 0',
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.1rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
            Siap Menjadi Sahabat Pintar di Ruang Paham?
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.6, marginBottom: '28px', fontWeight: 400 }}>
            Daftar sekarang secara gratis, pilih avatar karakter favoritmu, dan nikmati petualangan belajar yang mengasyikkan!
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRegisterClick}
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--primary-blue)',
              fontSize: 'clamp(0.95rem, 3vw, 1.08rem)',
              fontWeight: 700,
              padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 38px)',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Rocket size={20} color="var(--primary-blue)" />
            <span>Daftar Sekarang - Gratis!</span>
          </motion.button>
        </div>
      </section>
    </div>
  );
}
