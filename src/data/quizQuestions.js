export const multipleChoiceQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correctAnswer: "Au"
  }
];

export const integerQuestions = [
  {
    id: 6,
    type: "integer",
    question: "What is the value of 12 + 28?",
    correctAnswer: 40
  },
  {
    id: 7,
    type: "integer",
    question: "How many states are there in the United States?",
    correctAnswer: 50
  },
  {
    id: 8,
    type: "integer",
    question: "In which year was the Declaration of Independence signed?",
    correctAnswer: 1776
  },
  {
    id: 9,
    type: "integer",
    question: "What is the value of pi rounded to the nearest integer?",
    correctAnswer: 3
  },
  {
    id: 10,
    type: "integer",
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    correctAnswer: 120
  }
];

export const quizQuestions = [...multipleChoiceQuestions, ...integerQuestions];