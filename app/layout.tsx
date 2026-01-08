import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import AbstractBackground from '@/components/AbstractBackground';
import StarryBackground from '@/components/StarryBackground';

export const metadata: Metadata = {
  title: 'ISS Observatory | Real-Time Space Station Tracking',
  description: 'Experience the International Space Station like never before. Real-time tracking, crew information, and interactive 3D visualization.',
  keywords: ['ISS', 'space station', 'tracking', 'orbital', 'astronauts', 'real-time'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AbstractBackground />
        <StarryBackground />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: '3rem', minHeight: '100vh' }}>
          <div style={{ width: '100%' }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}