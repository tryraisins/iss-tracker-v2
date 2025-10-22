import ISSTracker from '@/components/ISSTracker';
import ISSInfo from '@/components/ISSInfo';
import StarryBackground from '@/components/StarryBackground';
import WorldMapBackground from '@/components/WorldMapBackground';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <StarryBackground />
      <WorldMapBackground />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 floating"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-40 floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-50 floating" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="floating">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              ISS ORBITAL TRACKER
            </h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Track the International Space Station in real-time as it orbits our planet at 28,000 km/h
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link 
              href="/trivia"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 glow-effect"
            >
              <span className="relative z-10">🚀 Test Your Space Knowledge</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>

      
        {/* Real-time Tracker */}
        <div className="space-card p-8 mb-12 transform hover:scale-[1.01] transition-transform duration-300 border border-blue-500/20 glow-effect">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            LIVE ORBITAL TRACKING
          </h2>
          <ISSTracker />
        </div>

          {/* ISS Information */}
        <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
          <ISSInfo />
        </div>


        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto space-y-4 md:space-y-0">
            <p className="text-blue-300">Data provided by WhereTheISS.at & Open Notify API</p>
            <p className="text-purple-300">Built with Next.js • Exploring the Final Frontier</p>
          </div>
        </footer>
      </div>
    </main>
  );
}