'use client';

import { useState } from 'react';
import { TriviaQuestion } from '@/types/iss';

interface TriviaCardProps {
  question: TriviaQuestion;
}

export default function TriviaCard({ question }: TriviaCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h3>
      
      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showExplanation}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              showExplanation
                ? option === question.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : option === selectedAnswer
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
            } disabled:opacity-100`}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`font-semibold mb-2 ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </div>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}