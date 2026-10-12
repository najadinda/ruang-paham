import React from 'react';
import { Heart, Sparkles, Shield, BookOpen, Smile } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#FFFFFF',
      borderTop: '2px solid #EFF6FF',
      marginTop: '80px',
      paddingTop: '50px',
      paddingBottom: '36px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img
                src="/favicon.svg"
                alt="Logo Ruang Paham"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)'
                }}
              />
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                Ruang <span style={{ color: 'var(--text-main)' }}>Paham</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 400 }}>
              Platform edukasi interaktif untuk siswa Sekolah Dasar (Kelas 1 - 6 SD). Belajar dengan rasa gembira, visual ramah anak, dan pemahaman bermakna.
            </p>
          </div>

          {/* Nilai Utama */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '14px', color: 'var(--text-main)' }}>
              Komitmen Kami
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="var(--primary-blue)" /> 100% Ramah Privasi & Aman untuk Anak
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="var(--primary-blue)" /> Kurikulum SD Terpadu (Kelas 1 - 6)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smile size={16} color="var(--primary-blue)" /> Gamifikasi & Motivasi Belajar Positif
              </li>
            </ul>
          </div>

          {/* Akses Cepat */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '14px', color: 'var(--text-main)' }}>
              Mata Pelajaran Favorit
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge badge-blue">IPA Petualang</span>
              <span className="badge badge-blue">Matematika Ceria</span>
              <span className="badge badge-blue">Bahasa Indonesia</span>
              <span className="badge badge-blue">Pendidikan Pancasila</span>
              <span className="badge badge-blue">IPS Jelajah</span>
              <span className="badge badge-blue">English for Kids</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar: tema theme name removed as requested */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          fontSize: '0.86rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>Ruang Paham</strong>. Dibuat dengan cinta untuk generasi penerus bangsa.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Platform Belajar Ramah Anak</span>
            <Heart size={15} fill="#EF4444" color="#EF4444" />
          </div>
        </div>
      </div>
    </footer>
  );
}
