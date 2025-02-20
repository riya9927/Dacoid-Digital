import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">

      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white bg-opacity-20 shadow-lg rounded-xl backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold mb-6">Welcome to QuizMaster!</h2>
        <p className="text-center text-lg">
          Test your knowledge and track your progress with our interactive quizzes.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;