import React from 'react';

export const AVATAR_OPTIONS = [
  { id: 'robot-blue', name: 'Robo Pintar', emoji: '🤖', bg: '#DBEAFE', color: '#1E40AF', desc: 'Suka sains & teknologi' },
  { id: 'panda-bamboo', name: 'Panda Ceria', emoji: '🐼', bg: '#DCFCE7', color: '#166534', desc: 'Penyayang & tenang' },
  { id: 'fox-orange', name: 'Rubah Gesit', emoji: '🦊', bg: '#FFEDD5', color: '#9A3412', desc: 'Penuh rasa ingin tahu' },
  { id: 'cat-yellow', name: 'Kucing Sahabat', emoji: '🐱', bg: '#FEF3C7', color: '#92400E', desc: 'Ceria & suka berteman' },
  { id: 'dino-green', name: 'Dino Pemberani', emoji: '🦖', bg: '#E0E7FF', color: '#3730A3', desc: 'Kuat & bersemangat' },
  { id: 'astronaut-star', name: 'Astronot Cilik', emoji: '🚀', bg: '#F3E8FF', color: '#6B21A8', desc: 'Suka petualangan bintang' },
  { id: 'owl-smart', name: 'Burung Hantu Bijak', emoji: '🦉', bg: '#EDE9FE', color: '#5B21B6', desc: 'Rajin membaca buku' },
  { id: 'koala-cute', name: 'Koala Manis', emoji: '🐨', bg: '#E2E8F0', color: '#334155', desc: 'Ramah dan teliti' },
];

export function AvatarDisplay({ avatarId, size = 64, className = '' }) {
  const avatar = AVATAR_OPTIONS.find(a => a.id === avatarId) || AVATAR_OPTIONS[0];

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: avatar.bg,
        border: `3px solid #FFFFFF`,
        boxShadow: '0 6px 16px rgba(59, 130, 246, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size * 0.52}px`,
        userSelect: 'none',
        flexShrink: 0
      }}
      title={avatar.name}
    >
      <span>{avatar.emoji}</span>
    </div>
  );
}
