import { TRIVIA_QUESTIONS } from '@/lib/constants';
import TriviaCard from '@/components/TriviaCard';
import StarryBackground from '@/components/StarryBackground';
import WorldMapBackground from '@/components/WorldMapBackground';
import Link from 'next/link';

export default function TriviaPage() {
  return (
    <main className="min-h-screen relative">
      <StarryBackground />
      <WorldMapBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Orbital Tracker</span>
          </Link>
          
          <div className="floating">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SPACE STATION TRIVIA
            </h1>
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Test your knowledge about humanity&apos;s home in orbit
          </p>
        </div>

        {/* Trivia Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {TRIVIA_QUESTIONS.map((question) => (
            <TriviaCard key={question.id} question={question} />
          ))}
        </div>

        {/* Completion Message */}
        <div className="text-center mt-12 space-card p-8 border border-green-500/20 bg-gradient-to-r from-green-500/10 to-cyan-500/10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-green-300 mb-4">
            🎉 Mission Complete!
          </h2>
          <p className="text-cyan-200 mb-6 text-lg">
            You&apos;ve navigated through the cosmos of ISS knowledge. The final frontier awaits!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 glow-effect"
          >
            <span>🚀 Return to Tracker</span>
          </Link>
        </div>
      </div>
    </main>
  );
}