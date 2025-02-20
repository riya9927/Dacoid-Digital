import React, { useEffect, useState } from 'react';
import { getQuizAttempts } from '../utils/db';
import { getFeedback } from '../data/feedbackHelper';

export default function QuizHistory() {
  const [attempts, setAttempts] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'score'

  useEffect(() => {
    const loadAttempts = async () => {
      const quizAttempts = await getQuizAttempts();
      setAttempts(quizAttempts.reverse());
    };
    loadAttempts();
  }, []);

  const sortAttempts = (attempts) => {
    if (sortBy === 'score') {
      return [...attempts].sort((a, b) => 
        (b.score / b.totalQuestions) - (a.score / a.totalQuestions)
      );
    }
    return [...attempts].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  };

  const getSummaryStats = (attempts) => {
    if (attempts.length === 0) return null;
    
    const totalAttempts = attempts.length;
    const averageScore = attempts.reduce((acc, curr) => 
      acc + (curr.score / curr.totalQuestions) * 100, 0
    ) / totalAttempts;
    
    const bestScore = Math.max(...attempts.map(a => 
      (a.score / a.totalQuestions) * 100
    ));

    return { totalAttempts, averageScore, bestScore };
  };

  const stats = getSummaryStats(attempts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white p-8 flex flex-col items-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl p-8 rounded-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Quiz History</h2>
        
        {stats && (
          <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm">Total Attempts</p>
                <p className="text-2xl font-bold">{stats.totalAttempts}</p>
              </div>
              <div className="text-center">
                <p className="text-sm">Average Score</p>
                <p className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm">Best Score</p>
                <p className="text-2xl font-bold">{stats.bestScore.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white bg-opacity-20 text-white border-none rounded-lg px-4 py-2"
          >
            <option value="date" className='text-black'>Sort by Date</option>
            <option value="score" className='text-black'>Sort by Score</option>
          </select>
        </div>

        <div className="grid gap-6">
          {attempts.length === 0 ? (
            <p className="text-center text-lg">No quiz attempts yet.</p>
          ) : (
            sortAttempts(attempts).map((attempt, index) => {
              const feedback = getFeedback(attempt.score, attempt.totalQuestions);
              return (
                <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Attempt #{attempts.length - index}</h3>
                    <span className="text-gray-200 text-sm">
                      {new Date(attempt.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-lg font-medium">
                      Score: {attempt.score} / {attempt.totalQuestions}
                      <span className="ml-2">({((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%)</span>
                    </p>
                    <span className={`text-2xl font-bold ${feedback.color}`}>
                      {feedback.grade}
                    </span>
                  </div>

                  <div className="mb-4 bg-white bg-opacity-20 p-4 rounded-lg">
                    <p className="font-medium">{feedback.message}</p>
                    <p className="text-sm mt-2">{feedback.tips}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold mb-2">Question Details:</h4>
                    {attempt.answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className={`p-4 rounded-lg shadow-md transition-all ${
                          answer.isCorrect 
                            ? 'bg-green-500 bg-opacity-50' 
                            : 'bg-red-500 bg-opacity-50'
                        }`}
                      >
                        <p className="font-medium">{answer.question}</p>
                        <p className="text-sm mt-1">
                          Your answer: {answer.selectedAnswer} 
                          <span className="ml-2">
                            {answer.isCorrect ? '✅' : '❌'}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}