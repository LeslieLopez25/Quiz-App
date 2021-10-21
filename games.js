const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which country operationalized world’s largest radio telescope?",
    choice1: "USA",
    choice2: "China",
    choice3: "Russia",
    choice4: "India",
    answer: 2
  },
  {
    question: "The World Largest desert is?",
    choice1: "Thar",
    choice2: "Kalahari",
    choice3: "Sahara",
    choice4: "Sonoran",
    answer: 3
  },
  {
    question: "What’s the shortcut for the “copy” function on most computers?",
    choice1: "ctrl c",
    choice2: "ctrl p",
    choice3: "ctrl s",
    choice4: "ctrl v",
    answer: 1
  },
  {
    question:
      "What Los Angeles community is noted for celebrities and mansions?",
    choice1: "Nob Hill",
    choice2: "Beverly Hills",
    choice3: "Chestnut Hill",
    choice4: "Bunker Hill",
    answer: 2
  },
  {
    question: "Which country has the largest capacity reservoir in the world?",
    choice1: "Egypt",
    choice2: "United States",
    choice3: "Uganda",
    choice4: "Brazil",
    answer: 3
  },
  {
    question: "Which state is known as the “Beehive State”?",
    choice1: "North Dakota",
    choice2: "Oregon",
    choice3: "Georgia",
    choice4: "Utah",
    answer: 4
  },
  {
    question:
      "A collection of hundreds of stars around a common centre is called a:",
    choice1: "Solar system",
    choice2: "Galaxy",
    choice3: "Light year",
    choice4: "Black hole",
    answer: 2
  },
  {
    question: "One of these words does not belong. Find the odd word out.",
    choice1: "Baseball",
    choice2: "Volleyball",
    choice3: "Soccer",
    choice4: "Swimming",
    answer: 4
  },
  {
    question:
      "Which country follows the United States and China in total number of Internet users?",
    choice1: "Germany",
    choice2: "United Kingdom",
    choice3: "France",
    choice4: "Japan",
    answer: 4
  },
  {
    question: "Which country is not considered a kingdom?",
    choice1: "Belgium",
    choice2: "Denmark",
    choice3: "Monaco",
    choice4: "Sweden",
    answer: 3
  }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
