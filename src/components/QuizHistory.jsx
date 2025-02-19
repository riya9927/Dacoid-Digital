import React, { useEffect, useState } from 'react';
import { getQuizAttempts } from '../utils/db';

export default function QuizHistory() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const loadAttempts = async () => {
      const quizAttempts = await getQuizAttempts();
      setAttempts(quizAttempts.reverse());
    };
    loadAttempts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Quiz History</h2>
      <div className="grid gap-4">
        {attempts.map((attempt, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Attempt #{attempts.length - index}
              </h3>
              <span className="text-gray-500">
                {new Date(attempt.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-lg mb-4">
              Score: {attempt.score} / {attempt.totalQuestions}
            </p>
            <div className="space-y-2">
              {attempt.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className={`p-4 rounded-lg ${
                    answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <p className="font-medium">{answer.question}</p>
                  <p className="text-sm">
                    Your answer: {answer.selectedAnswer}
                    {answer.isCorrect ? ' ✓' : ' ✗'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}