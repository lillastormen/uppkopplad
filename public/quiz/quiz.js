const quizSection = document.querySelector("#quiz");
const quizResult = document.querySelector("#quizResult");
const resultHeading = document.querySelector("#resultHeading");
const resultText = document.querySelector("#resultText");
const question = document.querySelector("#quizQuestion");
const submit = document.querySelector("#quizSubmitBtn");
const goToQuiz = document.querySelector("#goToQuizBtn");
const form = document.querySelector("#quizForm");
const next = document.querySelector("#quizNextBtn");
const createAcc = document.querySelector("#createAccountBtn");
const radio = document.querySelector("#radios");
const checkbox = document.querySelector("#checkboxes");
const noSelected = document.querySelector("#noSelected");
const numQuestion = document.querySelector("#numQuestion");
const param = new URLSearchParams(window.location.search);
const quizId = param.get("id") || 1;

const quizTitle = document.querySelector("#quizTitle");
const quizDescription = document.querySelector("#quizDescription");
const quizIntro = document.querySelector("#quizIntro");

let currentQuestion = 0;
let currentQuiz;
let currentQuizResult;
let userAnswers = [];
let stashedUserAnswers = [];
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
  if (!validateInput()) {
    return;
  }
  form.style.display = "none";
  quizResult.style.display = "block";
  quizIntro.style.display = "none";

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
  if (userId === undefined) {
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
    saveUserAnswer(stashedUserAnswers);
  }
});

next.addEventListener("click", validateInput);

async function loadQuiz(quizId) {
  try {
    if (userId !== undefined && quizId === 1) {
      quizSection.style.display = "none";
      goToQuiz.href = "./modules/mainModules.html";
      goToQuiz.textContent = "Moduler";
      return;
    }
    const response = await fetch(`http://localhost:3000/quiz/${quizId}`);
    currentQuiz = await response.json();
    console.log(`Laddar quizId ${quizId} och inloggad som userId ${userId}`);
    next.style.display = "block";

    if (userId !== undefined) {
      currentQuizResult = await fetchQuizResultId(quizId, userId);
      await saveQuizResult(quizId, userId);

      if (Number(quizId) === 1) {
          quizTitle.textContent = "Inledande kunskapstest";
          quizDescription.textContent =
            "Det här testet gjordes i början för att ge en första bild av dina kunskaper. Du kan göra det igen och jämföra ditt resultat.";
        } else {
          quizTitle.textContent = "Quiz";
          quizDescription.textContent = "";
        }
    }
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
      return false;
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
      return false;
    }
    userAnswers[currentQuestion] = userSelected;
  }

  for (let i = 0; i < userAnswers[currentQuestion].length; i++) {
    const ans = currentQuiz[currentQuestion].answers.find(
      a => a.answer === userAnswers[currentQuestion][i],
    );

    stashedUserAnswers.push([
      currentQuizResult,
      currentQuiz[currentQuestion].id,
      ans.qa_id,
    ]);
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
  return true;
}

async function fetchQuizResultId(quizId, userId) {
  const response = await fetch(
    `http://localhost:3000/quiz/${quizId}/${userId}`,
  );

  const result = await response.json();

  //handle all "no result" cases
  if (!result || !Array.isArray(result) || result.length === 0) {
    return null;
  }

  return result[0].id;
}

async function saveQuizResult(quizId, userId) {
  const response = await fetch(
    `http://localhost:3000/quiz/${quizId}/${userId}`,
    {
      method: "POST",
    },
  );
  const result = await response.json();
  console.log(result);

  return result.id;
}

async function saveUserAnswer(ua) {
  try {
    const response = await fetch(`http://localhost:3000/quiz/${ua[0][0]}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < ua.length; i++) {
      const response = await fetch(
        `http://localhost:3000/quiz/${ua[i][0]}/${ua[i][1]}/${ua[i][2]}`,
        {
          method: "POST",
        },
      );
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

//RUN
loadQuiz(quizId);
