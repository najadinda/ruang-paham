import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Compass, 
  Sparkles,
  Clock
} from 'lucide-react';
import { AvatarDisplay } from '../utils/avatars';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Navigasi siswa (Dashboard, Jelajahi, Profil, Aktivitas) HANYA aktif jika SUDAH login dan berada di rute halaman siswa
  const isStudentPage = location.pathname.startsWith('/dashboard') || 
                        location.pathname.startsWith('/jelajahi') || 
                        location.pathname.startsWith('/materi') || 
                        location.pathname.startsWith('/aktivitas') || 
                        location.pathname.startsWith('/profil');
  const showStudentNav = !!user && isStudentPage;

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (anchorId) => {
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
    } else {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '2px solid #EFF6FF',
      boxShadow: '0 4px 16px -2px rgba(59, 130, 246, 0.06)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        position: 'relative'
      }}>
        {/* =========================================================================
            1. POSISI KIRI: Logo Buku & Nama Website "Ruang Paham"
            ========================================================= */}
        <div style={{ flex: '0 0 auto' }}>
          <Link
            to={showStudentNav ? '/dashboard' : '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <img
              src="/favicon.svg"
              alt="Logo Ruang Paham"
              className="nav-brand-logo"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                display: 'block'
              }}
            />
            <div>
              <div
                className="nav-brand-title"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--primary-blue)',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.15
                }}
              >
                Ruang <span style={{ color: 'var(--text-main)' }}>Paham</span>
              </div>
              <div
                className="nav-brand-tagline"
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.3px'
                }}
              >
                Belajar Makin Seru!
              </div>
            </div>
          </Link>
        </div>

        {/* =========================================================================
            2. POSISI TENGAH: Navigasi Desktop
            - Belum Login / Landing Page: Keunggulan, Jelajahi (beda halaman)
            - Sudah Login (Halaman Siswa): Dashboard, Jelajahi
            ========================================================= */}
        <nav className="nav-desktop-links">
          {showStudentNav ? (
            /* =======================================================
               NAVIGASI HALAMAN SISWA (ketika sudah login/register):
               1. Dashboard
               2. Jelajahi
               3. Profil
               ======================================================= */
            <>
              <Link
                to="/dashboard"
                style={{
                  background: location.pathname === '/dashboard' ? 'var(--accent-tint)' : 'transparent',
                  color: location.pathname === '/dashboard' ? 'var(--primary-blue)' : 'var(--text-main)',
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.96rem',
                  fontWeight: location.pathname === '/dashboard' ? 700 : 600,
                  transition: 'all 0.15s ease',
                  border: location.pathname === '/dashboard' ? '1.5px solid var(--accent-blue)' : '1.5px solid transparent',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Dashboard
              </Link>

              <Link
                to="/jelajahi"
                style={{
                  background: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? 'var(--accent-tint)' : 'transparent',
                  color: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? 'var(--primary-blue)' : 'var(--text-main)',
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.96rem',
                  fontWeight: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? 700 : 600,
                  transition: 'all 0.15s ease',
                  border: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? '1.5px solid var(--accent-blue)' : '1.5px solid transparent',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Jelajahi
              </Link>
            </>
          ) : (
            /* =======================================================
               NAVIGASI LANDING PAGE (sebelum login):
               1. Keunggulan (smooth scroll anchor)
               2. Jelajahi (beda halaman /jelajahi, bukan anchor link!)
               ======================================================= */
            <>
              <button
                onClick={() => handleAnchorClick('keunggulan')}
                style={{
                  background: 'transparent',
                  color: 'var(--text-main)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
              >
                Keunggulan
              </button>

              {/* Navigasi Jelajahi Landing Page: Tetap berada di landing page (smooth scroll ke section card mata pelajaran #jelajahi) */}
              <button
                onClick={() => handleAnchorClick('jelajahi')}
                style={{
                  background: 'transparent',
                  color: 'var(--text-main)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
              >
                Jelajahi
              </button>
            </>
          )}
        </nav>

        {/* =========================================================================
            3. POSISI KANAN:
            - Sudah Login & Bukan Landing Page: Nama Profil + DITAMPILKAN KELASNYA + Dropdown
            - Belum Login / Landing Page: Tombol "Masuk" & "Daftar"
            ========================================================= */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {showStudentNav ? (
            /* Profil Siswa: Ditampilkan Nama + KELASNYA */
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`nav-user-btn ${dropdownOpen ? 'active' : ''}`}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
              >
                <AvatarDisplay avatarId={user.avatar} size={32} />
                <div className="nav-user-text" style={{ textAlign: 'left', lineHeight: 1.25 }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user.name}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--primary-blue)'
                  }}>
                    Kelas {user.grade || 3} SD
                  </div>
                </div>
                <ChevronDown
                  size={15}
                  color="var(--text-muted)"
                  className="nav-user-chevron"
                  style={{
                    transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    marginLeft: '2px'
                  }}
                />
              </button>

              {/* Dropdown Menu Profil */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '220px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      padding: '8px',
                      boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
                      border: '1.5px solid #EFF6FF',
                      zIndex: 60
                    }}
                  >
                    {/* Header info akun */}
                    <div style={{
                      padding: '8px 10px 10px 10px',
                      borderBottom: '1px solid #F1F5F9',
                      marginBottom: '6px'
                    }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--primary-blue)', fontWeight: 600, marginTop: '2px' }}>
                        Kelas {user.grade || 3} SD • {user.points || 0} ⭐
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/profil');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: location.pathname === '/profil' ? 'var(--accent-tint)' : 'transparent',
                        color: location.pathname === '/profil' ? 'var(--primary-blue)' : 'var(--text-main)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <User size={16} color="var(--primary-blue)" />
                      <span>Pengaturan Profil</span>
                    </button>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/aktivitas');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: location.pathname === '/aktivitas' ? 'var(--accent-tint)' : 'transparent',
                        color: location.pathname === '/aktivitas' ? 'var(--primary-blue)' : 'var(--text-main)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Clock size={16} color="var(--primary-blue)" />
                      <span>Riwayat Aktivitas</span>
                    </button>

                    <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />

                    {/* Tombol Logout: Ketika diklik, langsung logout dan arahkan ke login page */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'transparent',
                        color: 'var(--danger-red)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={16} color="var(--danger-red)" />
                      <span>Logout (Keluar)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Belum Login / Halaman Publik: Tombol Masuk & Daftar */
            <div className="nav-auth-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to="/login"
                className={location.pathname === '/login' ? 'btn btn-primary' : 'btn btn-outline'}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Masuk
              </Link>

              <Link
                to="/register"
                className={location.pathname === '/register' ? 'btn btn-primary' : (location.pathname === '/login' ? 'btn btn-outline' : 'btn btn-primary')}
                style={{
                  padding: '7px 18px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Daftar
              </Link>
            </div>
          )}

          {/* Tombol Hamburger Menu untuk Mobile */}
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          DRAWER NAVIGASI MOBILE (RESPONSIVE DROPDOWN)
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #EFF6FF',
              boxShadow: '0 12px 24px rgba(59, 130, 246, 0.08)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '16px 20px 24px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {showStudentNav ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-lg)',
                      background: location.pathname === '/dashboard' ? 'var(--accent-tint)' : 'transparent',
                      color: location.pathname === '/dashboard' ? 'var(--primary-blue)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      textDecoration: 'none'
                    }}
                  >
                    <LayoutDashboard size={18} color="var(--primary-blue)" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/jelajahi"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-lg)',
                      background: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? 'var(--accent-tint)' : 'transparent',
                      color: (location.pathname === '/jelajahi' || location.pathname.startsWith('/materi')) ? 'var(--primary-blue)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      textDecoration: 'none'
                    }}
                  >
                    <Compass size={18} color="var(--primary-blue)" />
                    <span>Jelajahi Mata Pelajaran</span>
                  </Link>

                  <Link
                    to="/aktivitas"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-lg)',
                      background: location.pathname === '/aktivitas' ? 'var(--accent-tint)' : 'transparent',
                      color: location.pathname === '/aktivitas' ? 'var(--primary-blue)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      textDecoration: 'none'
                    }}
                  >
                    <Clock size={18} color="var(--primary-blue)" />
                    <span>Riwayat Aktivitas</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAnchorClick('keunggulan');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'transparent',
                      color: 'var(--text-main)',
                      fontWeight: 600,
                      fontSize: '0.96rem',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Sparkles size={18} color="var(--primary-blue)" />
                    <span>Keunggulan</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAnchorClick('jelajahi');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'transparent',
                      color: 'var(--text-main)',
                      fontWeight: 600,
                      fontSize: '0.96rem',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Compass size={18} color="var(--primary-blue)" />
                    <span>Jelajahi Mata Pelajaran</span>
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className={location.pathname === '/login' ? 'btn btn-primary' : 'btn btn-outline'}
                      style={{ textAlign: 'center', padding: '10px 14px', fontSize: '0.92rem' }}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className={location.pathname === '/register' ? 'btn btn-primary' : (location.pathname === '/login' ? 'btn btn-outline' : 'btn btn-primary')}
                      style={{ textAlign: 'center', padding: '10px 14px', fontSize: '0.92rem' }}
                    >
                      Daftar
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
