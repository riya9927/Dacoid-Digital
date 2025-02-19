import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import QuizHistory from './components/QuizHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 text-sm font-medium"
                >
                  Take Quiz
                </Link>
                <Link
                  to="/history"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 text-sm font-medium"
                >
                  History
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/history" element={<QuizHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;