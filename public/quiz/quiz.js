const quizSection = document.querySelector("#quiz");
const quizResult = document.querySelector("#quizResult");
const resultHeading = document.querySelector("#resultHeading");
const resultText = document.querySelector("#resultText");
const question = document.querySelector("#quizQuestion");
const submit = document.querySelector("#quizSubmitBtn");
const form = document.querySelector("#quizForm");
const next = document.querySelector("#quizNextBtn");
const createAcc = document.querySelector("#createAccountBtn");
const radio = document.querySelector("#radios");
const checkbox = document.querySelector("#checkboxes");
const noSelected = document.querySelector("#noSelected");
const numQuestion = document.querySelector("#numQuestion");
let currentQuestion = 0;
let currentQuiz;
let currentQuizId;
let userAnswers = [];
let correctAnswers = [];
let result = [];
let type = "";
let label;
let userId;

const response = await fetch(`http://localhost:3000/users/current`, {
  credentials: "include",
});

if (response.ok) {
  const data = await response.json();
  userId = data.userId;
} else {
  console.log("Not logged in or error:", response.status);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  validateInput();
  form.style.display = "none";
  quizResult.style.display = "block";

  correctAnswers = currentQuiz.map(q =>
    q.answers.filter(a => a.is_correct).map(a => a.answer),
  );

  for (let i = 0; i < correctAnswers.length; i++) {
    if (String(correctAnswers[i]) == String(userAnswers[i])) {
      result.push(true);
    } else {
      result.push(false);
    }
  }

  // Initial Quiz, Not logged in
  if (currentQuizId === 1 /* && !userId*/) {
    resultHeading.textContent = "Här är ditt resultat!";
    resultText.textContent = `Du svarade rätt på ${result.filter(t => t === true).length} av ${result.length} frågor.

  Vill du fortsätta utveckla dina kunskaper? 
  
  Skapa ett konto för att:

  ● Spara dina resultat
  ● Följa din utveckling över tid
  ● Få full tillgång`;

    //Logged in
  } else {
    resultHeading.textContent = "Här är ditt resultat!";
    resultText.textContent = `Du svarade rätt på ${result.filter(t => t === true).length} av ${result.length} frågor.`;
    saveQuizResult(currentQuizId, 3);
  }
});

next.addEventListener("click", validateInput);

async function loadQuiz(id) {
  try {
    currentQuizId = id;
    const quizPromise = await fetch(`http://localhost:3000/quiz/${id}`);
    currentQuiz = await quizPromise.json();
    console.log(
      `Inloggad som userId ${userId} och laddar quizId ${currentQuizId}`,
    );
    next.style.display = "block";
    showQuestion(currentQuiz);
  } catch (error) {
    console.error(error);
  }
}

function showQuestion(quiz) {
  question.textContent = quiz[currentQuestion].question;
  question.style.setProperty("background-color", "var(--primary");
  numQuestion.textContent = `Fråga ${currentQuestion + 1} av ${quiz.length}`;

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
      <input type="${type}" name="question" value="${a.answer}"><span id="answer">${a.answer}</span>
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

function validateInput() {
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

  //hides the hero if user answered the first question
  if (currentQuestion === 0) {
    document.body.classList.add("quiz-started");
  }

  //PROCEED
  if (userSelected) {
    currentQuestion++;
    if (currentQuiz[currentQuestion]) {
      showQuestion(currentQuiz);
    }
    if (!currentQuiz[currentQuestion + 1]) {
      next.style.display = "none";
      submit.style.display = "block";
    }
  }
}

async function saveQuizResult(quizId, userId) {
  fetch("http://localhost:3000/quiz/2/1", {
    method: "POST",
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

const quiz = {
  loadQuiz,
  showQuestion,
  validateInput,
  saveQuizResult,
};

export default quiz;
