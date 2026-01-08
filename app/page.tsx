import ISSTracker from '@/components/ISSTracker';
import ISSInfo from '@/components/ISSInfo';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ width: '100%', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div className="anim-fade-up">
          <p className="font-mono text-sm tracking-widest mb-4"
            style={{ color: 'var(--text-muted)' }}>
            REAL-TIME ORBITAL TRACKING
          </p>
        </div>

        <h1 className="anim-fade-up delay-1 font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6"
          style={{ color: 'var(--text-primary)' }}>
          <span className="block">International</span>
          <span className="gradient-text">Space Station</span>
        </h1>

        <p className="anim-fade-up delay-2"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.125rem',
            maxWidth: '672px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '2.5rem',
            textAlign: 'center'
          }}>
          Watch humanity&apos;s orbital outpost circle the Earth at 28,000 km/h.
          Live telemetry, crew roster, and more.
        </p>

        <div className="anim-fade-up delay-3 flex flex-wrap justify-center gap-4">
          <Link href="/trivia" className="cta-btn cta-primary">
            <span>🚀</span>
            <span>MISSION QUIZ</span>
          </Link>
          <a href="#tracking" className="cta-btn cta-secondary">
            <span>📡</span>
            <span>VIEW TELEMETRY</span>
          </a>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="anim-fade-up delay-4 mb-20">
        <div className="obs-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="data-metric">
              <div className="metric-value">408</div>
              <div className="metric-label">Altitude (km)</div>
            </div>
            <div className="data-metric">
              <div className="metric-value">28,000</div>
              <div className="metric-label">Speed (km/h)</div>
            </div>
            <div className="data-metric">
              <div className="metric-value">92</div>
              <div className="metric-label">Orbit (min)</div>
            </div>
            <div className="data-metric">
              <div className="metric-value">15.5</div>
              <div className="metric-label">Orbits/Day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Tracking Section */}
      <section id="tracking" className="mb-20 scroll-mt-32">
        <div className="flex items-end justify-between mb-8">
          <div className="anim-fade-up delay-5">
            <p className="font-mono text-sm tracking-widest mb-2"
              style={{ color: 'var(--accent-cosmic)' }}>
              LIVE DATA
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)' }}>
              Orbital Telemetry
            </h2>
          </div>
          <div className="anim-fade-up delay-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0, 180, 160, 0.1)',
              border: '1px solid rgba(0, 180, 160, 0.3)'
            }}>
            <span className="status-dot" />
            <span className="text-sm font-medium" style={{ color: 'var(--accent-cosmic)' }}>
              Streaming
            </span>
          </div>
        </div>

        <ISSTracker />
      </section>

      {/* About ISS */}
      <section className="mb-20">
        <div className="anim-fade-up delay-7">
          <ISSInfo />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          DATA: WHERETHEISS.AT • OPEN NOTIFY API
        </p>
       
      </footer>
    </div>
  );
}