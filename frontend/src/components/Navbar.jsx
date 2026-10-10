import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { AvatarDisplay } from '../utils/avatars';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            to={user ? '/dashboard' : '/'}
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
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                display: 'block'
              }}
            />
            <div>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--primary-blue)',
                letterSpacing: '-0.3px',
                lineHeight: 1.15
              }}>
                Ruang <span style={{ color: 'var(--text-main)' }}>Paham</span>
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.3px'
              }}>
                Belajar Makin Seru!
              </div>
            </div>
          </Link>
        </div>

        {/* =========================================================================
            2. POSISI TENGAH: Navigasi
            - Belum Login (Landing Page): Keunggulan, Jelajahi (beda halaman)
            - Sudah Login (Halaman Siswa): Dashboard, Jelajahi, Profil
            ========================================================= */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flex: '1 1 auto',
          margin: '0 16px'
        }}>
          {user ? (
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

              {/* Navigasi Jelajahi dibuat BEDA HALAMAN (/jelajahi), bukan anchor link */}
              <Link
                to="/jelajahi"
                style={{
                  background: location.pathname === '/jelajahi' ? 'var(--accent-tint)' : 'transparent',
                  color: location.pathname === '/jelajahi' ? 'var(--primary-blue)' : 'var(--text-main)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.96rem',
                  fontWeight: location.pathname === '/jelajahi' ? 700 : 600,
                  textDecoration: 'none',
                  border: location.pathname === '/jelajahi' ? '1.5px solid var(--accent-blue)' : '1.5px solid transparent',
                  transition: 'all 0.15s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/jelajahi') e.currentTarget.style.color = 'var(--primary-blue)';
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/jelajahi') e.currentTarget.style.color = 'var(--text-main)';
                }}
              >
                Jelajahi
              </Link>
            </>
          )}
        </nav>

        {/* =========================================================================
            3. POSISI KANAN:
            - Sudah Login: Nama Profil + DITAMPILKAN KELASNYA + Dropdown / Logout
            - Belum Login: Tombol "Masuk" & "Daftar"
            ========================================================= */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            /* Profil Siswa: Ditampilkan Nama + KELASNYA */
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: dropdownOpen ? 'var(--accent-tint)' : '#FFFFFF',
                  padding: '6px 14px 6px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <AvatarDisplay avatarId={user.avatar} size={38} />
                <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
                  <div style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user.name}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--primary-blue)'
                  }}>
                    Kelas {user.grade || 3} SD
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  color="var(--text-muted)"
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
            /* Belum Login: Tombol Masuk & Daftar */
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/login"
                className="btn btn-outline"
                style={{
                  padding: '8px 20px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Masuk
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
                style={{
                  padding: '8px 22px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
