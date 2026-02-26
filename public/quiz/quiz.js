const question = document.querySelector("#quizQuestion");
const submit = document.querySelector("#quizSubmitBtn");
const form = document.querySelector("#quizForm");
const next = document.querySelector("#quizNextBtn");
const radio = document.querySelector("#radios");
const checkbox = document.querySelector("#checkboxes");
const noSelected = document.querySelector("#noSelected");
const quizSection = document.querySelector("#quiz");
let currentQuestion = 0;
let currentQuiz;
let userAnswers = [];
let correctAnswers = [];
let result = [];
let type = "";
let label;

form.addEventListener("submit", e => {
  e.preventDefault();
  form.style.display = "none";
  console.log(userAnswers);
  console.log(correctAnswers);

  for (let i = 0; i < correctAnswers.length; i++) {
    if (String(correctAnswers[i]) == String(userAnswers[i])) {
      result.push(true);
    } else {
      result.push(false);
    }
  }
  const trueAmount = result.filter(t => t === true).length;
  const resultText = document.createElement("p");
  resultText.textContent = `Ditt fick ${trueAmount} rätt av totalt ${result.length}`;
  quizSection.appendChild(resultText);
});

next.addEventListener("click", () => {
  correctAnswers = currentQuiz.map(q =>
    q.answers.filter(a => a.is_correct).map(a => a.answer),
  );
  let userSelected;

  //RADIO
  if (type === "radio") {
    userSelected = document.querySelector('input[name="question"]:checked');
    if (!userSelected) {
      noSelected.style.opacity = "1";
      return;
    }

    userAnswers[currentQuestion] = [userSelected.value];
  }
  //CHECKBOX
  else if (type === "checkbox") {
    userSelected = [
      ...document.querySelectorAll('input[name="question"]:checked'),
    ].map(i => i.value);
    if (userSelected.length === 0) {
      noSelected.style.opacity = "1";
      return;
    }
    userAnswers[currentQuestion] = userSelected;
  }

  noSelected.style.opacity = "0";

  //PROCEED
  if (userSelected) {
    currentQuestion++;
    if (currentQuiz[currentQuestion]) {
      showQuestion(currentQuiz);
    } else {
      next.style.display = "none";
      submit.style.display = "block";
    }
  }
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
  question.textContent = quiz[currentQuestion].question;
  question.style.setProperty("background-color", "var(--primary");

  if (quiz[currentQuestion].multiple_choices) {
    type = "checkbox";
    checkbox.style.display = "flex";
    radio.style.display = "none";
    checkbox.replaceChildren();
  } else {
    type = "radio";
    checkbox.style.display = "none";
    radio.style.display = "flex";
    radio.replaceChildren();
  }
  quiz[currentQuestion].answers.forEach(a => {
    label = document.createElement("label");
    label.innerHTML = `
      <input type=${type} name=question value="${a.answer}">${a.answer}
      `;
    if (type === "radio") {
      radio.appendChild(label);
    } else if (type === "checkbox") {
      checkbox.appendChild(label);
    }
  });
  const inputs = document.querySelectorAll('input[name="question"]');
  inputs.forEach(i => (i.checked = false));
}

const quiz = {
  loadQuiz,
  showQuestion,
};

export default quiz;
