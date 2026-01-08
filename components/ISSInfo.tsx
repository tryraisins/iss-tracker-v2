'use client';

import { ISS_INFO } from '@/lib/constants';

// SVG Icon components
const Icons = {
  building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
  ),
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  dollar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export default function ISSInfo() {
  const facts = [
    { icon: Icons.building, text: 'Largest human-made object in space', color: '#00e5c7' },
    { icon: Icons.eye, text: 'Visible from Earth with the naked eye', color: '#ff8c5a' },
    { icon: Icons.calendar, text: 'Continuously occupied since November 2000', color: '#bf6eff' },
    { icon: Icons.dollar, text: 'Cost approximately $150 billion', color: '#00e5c7' },
    { icon: Icons.globe, text: 'Hosted astronauts from 19 countries', color: '#ff8c5a' },
  ];

  return (
    <div className="obs-card">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: 'var(--accent-aurora)',
            marginBottom: '0.5rem'
          }}
        >
          STATION PROFILE
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}
        >
          About the ISS
        </h2>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        {Object.entries(ISS_INFO).slice(0, 8).map(([key, value], idx) => (
          <div
            key={key}
            className="data-metric anim-scale-in"
            style={{ 
              animationDelay: `${idx * 0.05}s`,
              padding: '1.75rem 1.5rem'
            }}
          >
            <div
              className="font-mono"
              style={{
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                marginBottom: '0.75rem'
              }}
            >
              {Array.isArray(value) ? `${value.length} nations` : value}
            </div>
            <div className="metric-label" style={{ fontSize: '0.8rem' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      {/* Facts Section */}
      <div
        style={{
          background: 'var(--bg-nebula)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--accent-cosmic)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Fascinating Facts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {facts.map((fact, index) => (
            <div
              key={index}
              className="anim-fade-left"
              style={{
                animationDelay: `${0.3 + index * 0.1}s`,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'rgba(245, 240, 235, 0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(12px)';
                e.currentTarget.style.borderColor = fact.color;
                e.currentTarget.style.background = 'rgba(245, 240, 235, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'rgba(245, 240, 235, 0.03)';
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  background: `${fact.color}20`,
                  color: fact.color,
                  flexShrink: 0
                }}
              >
                {fact.icon}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {fact.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}