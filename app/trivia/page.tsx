import { TRIVIA_QUESTIONS } from '@/lib/constants';
import TriviaCard from '@/components/TriviaCard';
import Link from 'next/link';

export default function TriviaPage() {
  return (
    <div style={{ width: '100%', maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
      {/* Header */}
      <section className="text-center mb-14">
        <div className="anim-fade-up">
          <span className="text-6xl mb-6 block animate-float">🚀</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Mission</span>
            {' '}
            <span className="gradient-aurora">Quiz</span>
          </h1>
        </div>
        <p className="anim-fade-up delay-1 text-lg max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}>
          Test your knowledge about humanity&apos;s greatest orbital achievement.
          Complete all questions to earn your space badge!
        </p>
      </section>

      {/* Questions */}
      <div className="space-y-8 mb-14">
        {TRIVIA_QUESTIONS.map((question, index) => (
          <TriviaCard key={question.id} question={question} index={index} />
        ))}
      </div>

      {/* Completion Card */}
      <div className="obs-card text-center anim-fade-up" style={{ animationDelay: '0.8s' }}>
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-4xl animate-float" style={{ animationDelay: '0s' }}>🎉</span>
          <span className="text-4xl animate-float" style={{ animationDelay: '0.2s' }}>🌟</span>
          <span className="text-4xl animate-float" style={{ animationDelay: '0.4s' }}>🛰️</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: 'var(--accent-cosmic)' }}>
          Mission Complete!
        </h2>
        <p className="text-lg mb-8 max-w-md mx-auto"
          style={{ color: 'var(--text-secondary)' }}>
          You&apos;ve navigated through the cosmos of ISS knowledge.
          Your next adventure awaits!
        </p>

        <Link href="/" className="cta-btn cta-primary inline-flex">
          <span>📡</span>
          <span>RETURN TO OBSERVATORY</span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-12 mt-14 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          Keep exploring, space cadet! 🌌
        </p>
      </footer>
    </div>
  );
}