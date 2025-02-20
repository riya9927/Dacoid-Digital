export const getFeedback = (score, totalQuestions) => {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage >= 90) {
    return {
      grade: 'A',
      message: "Outstanding! You've demonstrated exceptional knowledge!",
      color: 'text-emerald-400',
      tips: "Challenge yourself with more advanced quizzes!"
    };
  } else if (percentage >= 80) {
    return {
      grade: 'B',
      message: "Great job! You have a solid understanding of the material.",
      color: 'text-green-400',
      tips: "Review the questions you missed to achieve mastery."
    };
  } else if (percentage >= 70) {
    return {
      grade: 'C',
      message: "Good effort! There's room for improvement.",
      color: 'text-yellow-400',
      tips: "Focus on the topics where you made mistakes."
    };
  } else if (percentage >= 60) {
    return {
      grade: 'D',
      message: "You've passed, but consider reviewing the material.",
      color: 'text-orange-400',
      tips: "Try creating flashcards for the concepts you struggled with."
    };
  } else {
    return {
      grade: 'F',
      message: "Keep practicing! Don't give up!",
      color: 'text-red-400',
      tips: "Consider reviewing the basic concepts before retaking the quiz."
    };
  }
};
