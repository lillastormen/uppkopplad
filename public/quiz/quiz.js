const question = document.querySelector("#quizQuestion");
const submit = document.querySelector("#quizSubmitBtn");
const form = document.querySelector("#quizForm");
const next = document.querySelector("#quizNextBtn");
const radio = document.querySelector("#radios");
const checkbox = document.querySelector("#checkboxes");
let currentQuestion = 0;
let currentQuiz;

form.addEventListener("submit", e => {
  e.preventDefault();
});
next.addEventListener("click", () => {
  currentQuestion++;
  showQuestion(currentQuiz);
});

async function loadQuiz(id) {
  try {
    const quizPromise = await fetch(`http://localhost:3000/quiz/${id}`);

    currentQuiz = await quizPromise.json();
    showQuestion(currentQuiz);
    next.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

function showQuestion(quiz) {
  console.log(quiz);
  if (quiz.length == currentQuestion) {
    next.style.display = "none";
    submit.style.display = "block";
  }

  question.textContent = quiz[currentQuestion].question;

  if (quiz[currentQuestion].multiple_choices) {
    checkbox.style.display = "flex";
    radio.style.display = "none";

    checkbox.replaceChildren();

    quiz[currentQuestion].answers.forEach(answer => {
      const label = document.createElement("label");
      label.innerHTML = `
      <input type="checkbox" name=question value="${answer.answer}">${answer.answer}
      `;
      checkbox.appendChild(label);
    });
  } else {
    checkbox.style.display = "none";
    radio.style.display = "flex";
    radio.replaceChildren();

    quiz[currentQuestion].answers.forEach(answer => {
      const label = document.createElement("label");
      label.innerHTML = `
      <input type="radio" name=question value="${answer.answer}">${answer.answer}
      `;

      radio.appendChild(label);
    });
  }
}

const quiz = {
  loadQuiz,
  showQuestion,
};

export default quiz;
