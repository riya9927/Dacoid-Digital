import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import QuizHistory from './components/QuizHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <nav className="bg-white bg-opacity-20 shadow-lg backdrop-blur-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">QuizMaster</h1>
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/quiz"
                className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Take Quiz
              </Link>
              <Link
                to="/history"
                className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition"
              >
                History
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<QuizHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
