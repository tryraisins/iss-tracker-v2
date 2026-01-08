'use client';

export default function WorldMapBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Decorative orbit rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="orbit-ring"
          style={{
            width: '600px',
            height: '600px',
            left: '-300px',
            top: '-300px',
            opacity: 0.1,
            animationDuration: '120s'
          }}
        />
        <div
          className="orbit-ring"
          style={{
            width: '800px',
            height: '800px',
            left: '-400px',
            top: '-400px',
            opacity: 0.05,
            animationDuration: '180s',
            animationDirection: 'reverse'
          }}
        />
      </div>
    </div>
  );
}