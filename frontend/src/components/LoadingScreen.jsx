import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen({
  text = 'Menyiapkan petualangan belajarmu...',
  size = 54,
  padding = '80px 20px',
  inline = false
}) {
  const content = (
    <div style={{ textAlign: 'center', padding: inline ? padding : undefined }}>
      <motion.img
        src="/favicon.svg"
        alt="Logo Ruang Paham"
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -6, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: 'easeInOut'
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${Math.round(size * 0.3)}px`,
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
          display: 'inline-block'
        }}
      />
      {text && (
        <p style={{
          marginTop: '16px',
          color: 'var(--text-muted)',
          fontWeight: 600,
          fontSize: '0.98rem'
        }}>
          {text}
        </p>
      )}
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div className="container" style={{ padding, textAlign: 'center' }}>
      {content}
    </div>
  );
}

export default LoadingScreen;
