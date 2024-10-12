export type Question = {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
  };
  correctAnswer: keyof Question["options"]; 
};


export const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: {
      a: "Berlin",
      b: "Paris",
      c: "Rome",
    },
    correctAnswer: "b",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: {
      a: "<a>",
      b: "<link>",
      c: "<href>",
    },
    correctAnswer: "a",
  },
  {
    question: "What does HTML stand for?",
    options: {
      a: "Hyperlinks and Text Markup Language",
      b: "Hyper Text Markup Language",
      c: "Home Tool Markup Language",
    },
    correctAnswer: "b",
  },
  {
    question: "Who wrote the novel '1984'?",
    options: {
      a: "George Orwell",
      b: "Ernest Hemingway",
      c: "J.K. Rowling",
    },
    correctAnswer: "a",
  },
  {
    question: "Which attribute is used to specify the source of an image in HTML?",
    options: {
      a: "src",
      b: "alt",
      c: "img",
    },
    correctAnswer: "a",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: {
      a: "Earth",
      b: "Mars",
      c: "Jupiter",
    },
    correctAnswer: "c",
  },
  {
    question: "Which element is used to define a paragraph in HTML?",
    options: {
      a: "<div>",
      b: "<p>",
      c: "<span>",
    },
    correctAnswer: "b",
  },
  {
    question: "In which year did the Titanic sink?",
    options: {
      a: "1912",
      b: "1920",
      c: "1905",
    },
    correctAnswer: "a",
  },
  {
    question: "Which attribute in HTML is used to add alternative text for an image?",
    options: {
      a: "title",
      b: "alt",
      c: "text",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the smallest prime number?",
    options: {
      a: "0",
      b: "1",
      c: "2",
    },
    correctAnswer: "c",
  },
];