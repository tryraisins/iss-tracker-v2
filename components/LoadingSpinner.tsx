'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Orbital rings loader */}
      <div className="relative w-20 h-20 mb-6">
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'var(--border-subtle)',
            borderTopColor: 'var(--accent-cosmic)',
            animation: 'spin 1.2s linear infinite'
          }}
        />
        <div
          className="absolute inset-2 rounded-full border-2"
          style={{
            borderColor: 'var(--border-subtle)',
            borderTopColor: 'var(--accent-aurora)',
            animation: 'spin 0.8s linear infinite reverse'
          }}
        />
        <div
          className="absolute inset-4 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--gradient-cosmic)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          <span className="text-lg">🛰️</span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Acquiring Signal
        </p>
        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          Receiving telemetry...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.9); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}