import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ISS Tracker - International Space Station',
  description: 'Track the International Space Station in real-time and learn fascinating facts about space exploration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900">
          {children}
        </div>
      </body>
    </html>
  );
}