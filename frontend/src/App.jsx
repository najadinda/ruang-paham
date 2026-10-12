import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

// Eager load LandingPage for instant initial paint
import { LandingPage } from './pages/LandingPage';

// Lazy load secondary pages to optimize bundle size & page speed
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then(m => ({ default: m.ExplorePage })));
const LessonDetailPage = lazy(() => import('./pages/LessonDetailPage').then(m => ({ default: m.LessonDetailPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Helper component untuk auto-scroll ke anchor link (misal: /#keunggulan)
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const { user } = useAuth();

  // Halaman Login dan Register tidak menggunakan Navbar dan Footer
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToAnchor />

      {/* Navbar tidak ditampilkan di halaman login dan register */}
      {!isAuthPage && <Navbar />}

      <main style={{ flex: 1, display: isAuthPage ? 'flex' : 'block', flexDirection: 'column' }}>
        <Suspense fallback={<LoadingScreen inline={false} text="Memuat halaman..." size={48} padding="120px 20px" />}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Autentikasi: Selalu tampilkan halaman Login/Register */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Halaman Siswa & Belajar (Hanya untuk yang sudah login / baru selesai daftar) */}
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/jelajahi"
              element={user ? <ExplorePage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/materi/:lessonId"
              element={user ? <LessonDetailPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profil"
              element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer tidak ditampilkan di halaman login dan register */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
