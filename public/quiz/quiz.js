const question = document.querySelector("#quizQuestion");
const submit = document.querySelector("#quizSubmitBtn");
const radio = document.querySelector("#radioInputs");
const checkbox = document.querySelector("#checkboxInputs");
const form = document.querySelector("#quizForm");
const next = document.querySelector("#quizNextBtn");
const radioLabels = document.querySelectorAll("#radioInputs label");
const checkboxLabels = document.querySelectorAll("#checkboxInputs label");
let currentQuestion = 0;
let currentQuiz;
form.addEventListener("submit", showResult());
next.addEventListener("click", () => {
  currentQuestion++;
  showQuiz(currentQuiz);
});

async function loadQuiz(id) {
  try {
    const quizPromise = await fetch(`http://localhost:3000/quiz/${id}`);

    currentQuiz = await quizPromise.json();
    showQuiz(currentQuiz);
    next.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

function showQuiz(quiz) {
  console.log(quiz);
  if (quiz.length == currentQuestion + 1) {
    next.style.display = "none";
    submit.style.display = "block";
  }

  question.textContent = quiz[currentQuestion].question;

  if (quiz[currentQuestion].multiple_choices) {
    checkbox.style.display = "flex";
    radio.style.display = "none";
    for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
      checkboxLabels[i].textContent = quiz[currentQuestion].answers[i].answer;
    }
  } else {
    checkbox.style.display = "none";
    radio.style.display = "flex";
    for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
      radioLabels[i].textContent = quiz[currentQuestion].answers[i].answer;
    }
  }
}

function showNext() {}

function showResult() {}

const quiz = {
  loadQuiz,
  showQuiz,
  showNext,
  showResult,
};

export default quiz;
