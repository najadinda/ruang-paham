import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';

export function StreakFlame({
  streakCount = 1,
  message,
  weeklyDays,
  todayIndex
}) {
  // Timer realtime untuk memastikan sinkronisasi hari saat jam berjalan
  const [currentJsDay, setCurrentJsDay] = React.useState(() => new Date().getDay());

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nowDay = new Date().getDay();
      if (nowDay !== currentJsDay) {
        setCurrentJsDay(nowDay);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [currentJsDay]);

  // Default fallback jika weeklyDays belum ada dari backend
  // new Date().getDay(): 0 (Minggu), 1 (Senin), ..., 6 (Sabtu)
  const fallbackTodayIndex = (currentJsDay + 6) % 7; // 0 = Senin ... 5 = Sabtu ... 6 = Minggu
  const effectiveTodayIndex = typeof todayIndex === 'number' ? todayIndex : fallbackTodayIndex;

  const defaultDayNames = [
    { short: 'Sen', letter: 'S', name: 'Senin' },
    { short: 'Sel', letter: 'S', name: 'Selasa' },
    { short: 'Rab', letter: 'R', name: 'Rabu' },
    { short: 'Kam', letter: 'K', name: 'Kamis' },
    { short: 'Jum', letter: 'J', name: 'Jumat' },
    { short: 'Sab', letter: 'S', name: 'Sabtu' },
    { short: 'Min', letter: 'M', name: 'Minggu' },
  ];

  const parsedStreak = Math.max(1, Number(streakCount) || 1);

  const daysToRender = weeklyDays && weeklyDays.length === 7
    ? weeklyDays
    : defaultDayNames.map((d, idx) => {
        // Logika realtime: hari ini aktif, dan hari-hari sebelumnya sesuai streak dengan wrap-around modulo 7
        const isToday = idx === effectiveTodayIndex;
        const daysAgo = (effectiveTodayIndex - idx + 7) % 7;
        const isActive = daysAgo < parsedStreak;
        return {
          index: idx,
          short: d.short,
          letter: d.letter,
          name: d.name,
          is_today: isToday,
          is_active: isActive
        };
      });

  // Hitung jumlah api yang aktif di lingkaran di sebelahnya secara realtime
  const activeFlamesCount = daysToRender.filter(d => d.is_active).length;
  // Pastikan kalimat streakCount selalu realtime bersamaan dengan jumlah api aktif di sebelahnya
  const effectiveStreakCount = Math.max(activeFlamesCount, parsedStreak, 1);
  const todayName = daysToRender[effectiveTodayIndex]?.name || 'Hari ini';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.008 }}
      className="streak-flame-wrapper"
    >
      {/* Background Watermark Icon (Desktop) */}
      <div className="streak-flame-bg-icon">
        <Flame size={135} color="#F59E0B" opacity={0.07} />
      </div>

      {/* Konten Kiri: Icon Api & Keterangan Streak */}
      <div className="streak-flame-content">
        {/* Animated Flame Icon */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-2, 3, -2],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="streak-flame-main-icon"
            style={{
              borderRadius: 'clamp(16px, 3.5vw, 20px)',
              backgroundColor: '#F59E0B',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
              color: '#FFFFFF'
            }}
          >
            <Flame size={32} fill="#FEF3C7" color="#FFFFFF" />
          </motion.div>
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#B45309',
              backgroundColor: '#FDE68A',
              padding: '3px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #FCD34D'
            }}>
              Api Semangat
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#D97706',
              backgroundColor: 'rgba(253, 230, 138, 0.6)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              <Sparkles size={13} color="#D97706" />
              <span>Target Harian</span>
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.18rem, 2.3vw, 1.45rem)',
            fontWeight: 800,
            color: '#92400E',
            margin: '0 0 4px 0',
            letterSpacing: '-0.3px',
            lineHeight: 1.25
          }}>
            {effectiveStreakCount} Hari Berturut-turut!
          </h3>

          <p style={{
            fontSize: '0.88rem',
            color: '#B45309',
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.5,
            maxWidth: '680px'
          }}>
            {effectiveStreakCount > 1
              ? `Luar biasa! Kamu sudah ${effectiveStreakCount} hari berturut-turut belajar di Ruang Paham! Apimu menyala aktif hari ini (${todayName}). Terus pertahankan semangat belajarmu!`
              : `Luar biasa! Apimu menyala aktif hari ini (${todayName}). Belajar setiap hari di Ruang Paham agar apimu terus membara!`}
          </p>
        </div>
      </div>

      {/* Streak Day Circles indicator (7 Hari Seminggu Secara Realtime) */}
      <div className="streak-flame-days">
        {daysToRender.map((dayItem, idx) => {
          const isActive = dayItem.is_active;
          const isToday = dayItem.is_today;

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              title={`${dayItem.name} ${isToday ? '(Hari Ini)' : ''}: ${isActive ? 'Api Semangat Aktif 🔥' : 'Belum aktif'}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                flex: '0 0 auto'
              }}
            >
              {/* Lingkaran Hari */}
              <div
                className="streak-day-circle"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  backgroundColor: isActive ? '#F59E0B' : '#FEF3C7',
                  backgroundImage: isActive
                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                    : 'none',
                  color: isActive ? '#FFFFFF' : '#92400E',
                  boxShadow: isActive
                    ? '0 4px 12px rgba(245, 158, 11, 0.4)'
                    : 'none',
                  border: isToday
                    ? '2.5px solid #B45309'
                    : '1.5px solid rgba(245, 158, 11, 0.3)',
                  position: 'relative',
                  transition: 'all 0.25s ease'
                }}
              >
                {isActive ? (
                  <Flame size={19} fill="#FEF3C7" color="#FFFFFF" />
                ) : (
                  <span>{dayItem.short || dayItem.letter}</span>
                )}

                {/* Indikator Titik Aktif Hari Ini */}
                {isToday && (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#EF4444',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)'
                    }}
                  />
                )}
              </div>

              {/* Label Singkat Hari di Bawah Lingkaran */}
              <span style={{
                fontSize: '0.7rem',
                fontWeight: isToday ? 800 : 600,
                color: isToday ? '#92400E' : '#B45309',
                opacity: isToday ? 1 : 0.85
              }}>
                {dayItem.short}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default StreakFlame;
