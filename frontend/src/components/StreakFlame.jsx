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
        // Logika realtime: hari ini aktif, dan hari-hari sebelumnya sesuai streak
        const isToday = idx === effectiveTodayIndex;
        const isActive = idx <= effectiveTodayIndex && idx >= Math.max(0, effectiveTodayIndex - (parsedStreak - 1));
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
      whileHover={{ y: -3, scale: 1.01 }}
      className="streak-flame-wrapper"
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '2px solid #FCD34D',
        borderRadius: 'clamp(16px, 3.5vw, 24px)',
        padding: 'clamp(16px, 3.5vw, 22px)',
        boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)', width: '100%', minWidth: 0 }}>
        {/* Animated Flame Icon */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            animate={{
              scale: [1, 1.14, 1],
              rotate: [-2, 3, -2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: 'clamp(48px, 12vw, 58px)',
              height: 'clamp(48px, 12vw, 58px)',
              borderRadius: 'clamp(14px, 3.5vw, 20px)',
              backgroundColor: '#F59E0B',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
              color: '#FFFFFF'
            }}
          >
            <Flame size={28} fill="#FEF3C7" color="#FFFFFF" />
          </motion.div>
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#B45309',
              backgroundColor: '#FDE68A',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              Api Semangat
            </span>
            <Sparkles size={15} color="#D97706" />
          </div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', fontWeight: 700, color: '#92400E', margin: 0 }}>
            {effectiveStreakCount} Hari Berturut-turut!
          </h3>
          <p style={{ fontSize: '0.86rem', color: '#B45309', margin: '4px 0 0 0', fontWeight: 500, lineHeight: 1.45 }}>
            {message && message.includes('hari berturut-turut')
              ? `Luar biasa! Kamu sudah ${effectiveStreakCount} hari berturut-turut belajar di Ruang Paham!`
              : message || (effectiveStreakCount > 1
                ? `Luar biasa! Apimu menyala ${effectiveStreakCount} hari berturut-turut (${todayName}). Jangan biarkan padam, teruslah belajar setiap hari!`
                : `Luar biasa! Apimu menyala hari ini (${todayName}). Jangan biarkan padam, teruslah belajar setiap hari!`)}
          </p>
        </div>
      </div>

      {/* Streak Day Circles indicator (7 Hari Seminggu Secara Realtime) */}
      <div className="streak-flame-days" style={{ width: '100%', boxSizing: 'border-box' }}>
        {daysToRender.map((dayItem, idx) => {
          const isActive = dayItem.is_active;
          const isToday = dayItem.is_today;

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.12 }}
              title={`${dayItem.name} ${isToday ? '(Hari Ini)' : ''}: ${isActive ? 'Api Semangat Aktif 🔥' : 'Belum aktif'}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Lingkaran Hari */}
              <div
                className="streak-day-circle"
                style={{
                  width: '36px',
                  height: '36px',
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
                    : '1.5px solid rgba(245, 158, 11, 0.25)',
                  position: 'relative',
                  transition: 'all 0.25s ease'
                }}
              >
                {isActive ? (
                  <Flame size={18} fill="#FEF3C7" color="#FFFFFF" />
                ) : (
                  <span>{dayItem.short || dayItem.letter}</span>
                )}

                {/* Indikator Titik Aktif Hari Ini */}
                {isToday && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#EF4444',
                      border: '2px solid #FFFFFF'
                    }}
                  />
                )}
              </div>

              {/* Label Singkat Hari di Bawah Lingkaran */}
              <span style={{
                fontSize: '0.68rem',
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
