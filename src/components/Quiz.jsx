import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import QuizTimer from './QuizTimer';
import { saveQuizAttempt } from '../utils/db';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    setAnswers([...answers, {
      question: quizQuestions[currentQuestion].question,
      selectedAnswer,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleQuizComplete();
    }
  };

  const handleTimeUp = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    setShowScore(true);
    await saveQuizAttempt({
      score,
      totalQuestions: quizQuestions.length,
      answers
    });
  };

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">
            Your score: {score} out of {quizQuestions.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="mb-4">
          <QuizTimer
            duration={quizQuestions[currentQuestion].timeLimit}
            onTimeUp={handleTimeUp}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestion + 1}/{quizQuestions.length}
          </h2>
          <p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
        </div>
        <div className="grid gap-4">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}