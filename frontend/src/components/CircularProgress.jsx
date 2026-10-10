import React from 'react';

export function CircularProgress({ progress = 0, size = 60, strokeWidth = 6, color = 'var(--primary-blue)' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track circle */}
        <circle
          stroke="var(--accent-soft)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress bar circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div style={{
        position: 'absolute',
        fontSize: `${size * 0.24}px`,
        fontWeight: 800,
        color: 'var(--text-main)'
      }}>
        {Math.round(clampedProgress)}%
      </div>
    </div>
  );
}
