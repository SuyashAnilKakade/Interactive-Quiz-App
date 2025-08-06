const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hot Mail",
      "How to Make Landingpage"
    ],
    answer: 0
  },
  {
    question: "Which tag is used for line break in HTML?",
    options: [
      "<break>",
      "<lb>",
      "<br>"
    ],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheet",
      "Cascading Style Sheet",
      "Colorful Style Sheet"
    ],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: [
      "font-color",
      "text-color",
      "color"
    ],
    answer: 2
  },
  {
    question: "Which symbol is used for ID selector in CSS?",
    options: [
      ".",
      "#",
      "*"
    ],
    answer: 1
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<a>",
      "<link>",
      "<href>"
    ],
    answer: 0
  },
  {
    question: "Which property controls the size of text?",
    options: [
      "font-size",
      "text-weight",
      "font-color"
    ],
    answer: 0
  },
  {
    question: "Which HTML element is used to define a paragraph?",
    options: [
      "<div>",
      "<p>",
      "<span>"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let countdownTimer;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const countdownEl = document.getElementById("countdown");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const congratsEl = document.getElementById("congrats");

const correctSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
const wrongSound = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");

function loadQuestion() {
  clearTimeout(timer);
  clearInterval(countdownTimer);

  const q = questions[currentQuestion];
  if (!q) {
    showResult();
    return;
  }

  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";
  countdownEl.innerText = "10";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });

  resetTimerAnimation();
  startCountdown();

  timer = setTimeout(() => {
    disableOptions();
    setTimeout(nextQuestion, 1500);
  }, 10000);
}

function selectAnswer(selectedIndex) {
  clearTimeout(timer);
  clearInterval(countdownTimer);
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === selectedIndex && i !== q.answer) btn.classList.add("wrong");
  });

  if (selectedIndex === q.answer) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }

  setTimeout(nextQuestion, 1500);
}

function disableOptions() {
  clearInterval(countdownTimer);
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === questions[currentQuestion].answer) btn.classList.add("correct");
  });
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function showResult() {
  document.getElementById("question-box").classList.add("hidden");
  resultBox.classList.remove("hidden");

  congratsEl.innerText = " Congratulations! ";
  scoreEl.innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add("hidden");
  document.getElementById("question-box").classList.remove("hidden");
  loadQuestion();
}

function resetTimerAnimation() {
  timerEl.style.animation = "none";
  void timerEl.offsetWidth; // reset animation
  timerEl.style.animation = "countdown 10s linear forwards";
}

function startCountdown() {
  let timeLeft = 10;
  countdownEl.innerText = timeLeft;
  countdownTimer = setInterval(() => {
    timeLeft--;
    countdownEl.innerText = timeLeft;
    if (timeLeft <= 0) clearInterval(countdownTimer);
  }, 1000);
}

window.onload = loadQuestion;

