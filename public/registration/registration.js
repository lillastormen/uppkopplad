// import { includeHTML } from "../includeHTML.js";

// includeHTML();

const url = "http://localhost:3000/users/registration";
const form = document.getElementById("registration-form");
const message = document.getElementById("registration-message");
const errorBox = document.getElementById("error-msg");

form.addEventListener("submit", async event => {
  event.preventDefault();

  const username = form.username.value.trim();
  const password = form.password.value;
  const repeatedPassword = form.passwordRepeat.value;

  if (repeatedPassword !== password) {
    errorBox.textContent = "Lösenorden matchar inte.";
    return;
  }

  if (password.length < 8) {
    errorBox.textContent = "Minst 8 tecken";
    return; 
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    errorBox.textContent = data.error;
    return;
  } else {
    window.location.href = "../modules/mainModules.html";
  }
  // message.textContent = 'Ditt konto har skapats';
  form.reset();
});

//toggle password visibility button
const input = document.getElementById("password") || null;
const toggleButton = document.getElementById("toggle-visibility");
const icon = toggleButton?.querySelector("i");

if (input && toggleButton && icon) {
  toggleButton.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    icon.classList.toggle("bi-eye", !isPassword);
    icon.classList.toggle("bi-eye-slash", isPassword);
  });
}
