'use client';

import Image from 'next/image';

export default function WorldMapBackground() {

  return (
    <div className="fixed inset-0 z-0 opacity-20">
      <div className="relative w-full h-full">
        <Image
          src="/assets/world-map.png"
          alt="World Map"
          fill
          className="object-cover"
          priority
          quality={80}
          style={{ 
            maskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)'
          }}
        />
        
        {/* Animated grid overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(0deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'pan 20s linear infinite'
          }}
        />
        
        {/* Pulsing orbit rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-path w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          <div className="orbit-path w-64 h-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
          <div className="orbit-path w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pan {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </div>
  );
}