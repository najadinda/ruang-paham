import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';

export function StreakFlame({ streakCount = 1, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.01 }}
      style={{
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '2px solid #FCD34D',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
              width: '68px',
              height: '68px',
              borderRadius: '24px',
              backgroundColor: '#F59E0B',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
              color: '#FFFFFF'
            }}
          >
            <Flame size={38} fill="#FEF3C7" color="#FFFFFF" />
          </motion.div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '0.8rem',
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
            <Sparkles size={16} color="#D97706" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#92400E', margin: 0 }}>
            {streakCount} Hari Berturut-turut!
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#B45309', margin: '4px 0 0 0', fontWeight: 400 }}>
            {message || 'Luar biasa! Jangan biarkan apimu padam, teruslah belajar setiap hari!'}
          </p>
        </div>
      </div>

      {/* Streak Day Circles indicator (up to 7 days) */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => {
          const isActive = idx < Math.min(streakCount, 7);
          return (
            <div
              key={idx}
              title={`Hari ${idx + 1}`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: isActive ? '#F59E0B' : '#FDE68A',
                color: isActive ? '#FFFFFF' : '#92400E',
                boxShadow: isActive ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
