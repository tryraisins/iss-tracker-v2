'use client';

import { useState } from 'react';
import { TriviaQuestion } from '@/types/iss';

interface TriviaCardProps {
  question: TriviaQuestion;
  index: number;
}

export default function TriviaCard({ question, index }: TriviaCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
    setTimeout(() => setShowExplanation(true), 200);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div
      className="obs-card anim-fade-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Question Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg flex-shrink-0"
          style={{
            background: 'var(--gradient-aurora)',
            color: '#050508'
          }}>
          {question.id}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-semibold pt-2"
          style={{ color: 'var(--text-primary)' }}>
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, optIndex) => {
          let optionStyle: React.CSSProperties = {};

          if (showExplanation) {
            if (option === question.correctAnswer) {
              optionStyle = {
                borderColor: 'var(--accent-cosmic)',
                background: 'rgba(0, 180, 160, 0.1)',
              };
            } else if (option === selectedAnswer) {
              optionStyle = {
                borderColor: 'var(--accent-aurora)',
                background: 'rgba(255, 107, 53, 0.1)',
              };
            }
          }

          return (
            <button
              key={optIndex}
              onClick={() => handleAnswerSelect(option)}
              disabled={showExplanation}
              className="trivia-option"
              style={optionStyle}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: showExplanation && option === question.correctAnswer
                      ? 'var(--accent-cosmic)'
                      : showExplanation && option === selectedAnswer
                        ? 'var(--accent-aurora)'
                        : 'var(--bg-stardust)',
                    color: showExplanation && (option === question.correctAnswer || option === selectedAnswer)
                      ? '#050508'
                      : 'var(--text-muted)'
                  }}>
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div
          className="p-5 rounded-2xl anim-scale-in"
          style={{
            background: isCorrect ? 'rgba(0, 180, 160, 0.1)' : 'rgba(255, 107, 53, 0.1)',
            border: `1px solid ${isCorrect ? 'var(--accent-cosmic)' : 'var(--accent-aurora)'}`
          }}
        >
          <div className="flex items-center gap-3 mb-3 font-display font-semibold"
            style={{ color: isCorrect ? 'var(--accent-cosmic)' : 'var(--accent-aurora)' }}>
            <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
            <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}