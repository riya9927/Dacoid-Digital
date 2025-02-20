// Quiz.jsx
import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import QuizTimer from './QuizTimer';
import { saveQuizAttempt } from '../utils/db';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [integerAnswer, setIntegerAnswer] = useState('');
  const [saveError, setSaveError] = useState(null);

  const handleAnswerSubmission = (selectedAnswer) => {
    if (isPaused) return;
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = question.type === 'integer' 
      ? parseInt(selectedAnswer) === question.correctAnswer
      : selectedAnswer === question.correctAnswer;
    
    setAnswers([...answers, {
      question: question.question,
      selectedAnswer,
      isCorrect,
      correctAnswer: question.correctAnswer // Store correct answer for reference
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setIntegerAnswer('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleQuizComplete();
    }
  };

  const handleIntegerSubmit = (e) => {
    e.preventDefault();
    if (integerAnswer.trim() !== '') {
      handleAnswerSubmission(integerAnswer);
    }
  };

  const handleTimeUp = () => {
    if (isPaused) return;
    handleQuizComplete();
  };

  const handleQuizComplete = async () => {
    try {
      setSaveError(null);
      
      // Calculate completion time
      const completionTime = new Date().toISOString();
      
      // Prepare attempt data
      const attemptData = {
        score,
        totalQuestions: quizQuestions.length,
        answers,
        timestamp: completionTime,
        completionTime,
        timeSpent: '30:00', // You can calculate actual time spent if needed
        percentage: ((score / quizQuestions.length) * 100).toFixed(2)
      };

      // Save the attempt
      await saveQuizAttempt(attemptData);
      
      // Update UI
      setShowScore(true);
      setQuizStarted(false);
    } catch (error) {
      console.error('Failed to save quiz attempt:', error);
      setSaveError('Failed to save your quiz results. Please try again.');
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setIsPaused(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowScore(false);
    setIntegerAnswer('');
    setSaveError(null);
  };

  const stopQuiz = async () => {
    await handleQuizComplete();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl p-8 rounded-xl w-full max-w-lg text-center">
        {!quizStarted && !showScore && (
          <>
            <h2 className="text-3xl font-bold mb-4">Welcome to QuizMaster!</h2>
            <p className="text-lg mb-6">Test your knowledge with {quizQuestions.length} exciting questions.</p>
            <button
              onClick={startQuiz}
              className="bg-slate-200 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all shadow-lg"
            >
              Start Quiz
            </button>
          </>
        )}

        {showScore && (
          <>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg mb-4">Your score: {score} out of {quizQuestions.length}</p>
            {saveError && (
              <p className="text-red-400 mb-4">{saveError}</p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={startQuiz}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/history'}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-lg"
              >
                View History
              </button>
            </div>
          </>
        )}

        {quizStarted && !showScore && (
          <>
            <div className="flex justify-between items-center mb-6">
              <QuizTimer
                onTimeUp={handleTimeUp}
                isPaused={isPaused}
              />
              <div className="space-x-2">
                <button
                  onClick={togglePause}
                  className={`px-4 py-2 rounded shadow-lg transition-all ${
                    isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white`}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={stopQuiz}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-all"
                >
                  Stop
                </button>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1}/{quizQuestions.length}
            </h2>
            <p className="text-lg mb-6">{quizQuestions[currentQuestion].question}</p>
            
            {quizQuestions[currentQuestion].type === 'multiple-choice' ? (
              <div className="grid gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmission(option)}
                    className={`bg-white bg-opacity-30 hover:bg-opacity-50 p-4 rounded-lg text-left transition-all shadow-lg ${
                      isPaused ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isPaused}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleIntegerSubmit} className="space-y-4">
                <input
                  type="number"
                  value={integerAnswer}
                  onChange={(e) => setIntegerAnswer(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-white"
                  placeholder="Enter your answer"
                  disabled={isPaused}
                />
                <button
                  type="submit"
                  className={`w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all shadow-lg ${
                    isPaused ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isPaused || integerAnswer.trim() === ''}
                >
                  Submit Answer
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}