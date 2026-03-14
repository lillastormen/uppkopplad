const url = "http://localhost:3000/users/user";
const form = document.getElementById("credentials-update-form");
const errorBoxPassword = document.getElementById("error-msg-password");
const errorBoxUsername= document.getElementById("error-msg-username")
const successBoxPassword = document.getElementById("success-msg-password");
const successBoxUsername = document.getElementById("success-msg-username");

form.addEventListener("submit", async event => {
  event.preventDefault();

  errorBoxPassword.textContent = "";
  errorBoxUsername.textContent = "";
  successBoxPassword.textContent = "";
  successBoxUsername.textContent = "";

  const username = form["username-update"].value.trim();
  const password = form["password-update"].value;
  const repeatedPassword = form["password-update-repeat"].value;

  const body = {};

  if (username) {
    body.username = username;
  }

  if (password) {
    if (password.length < 8) {
        errorBoxPassword.textContent = "Minst 8 tecken.";
        return; 
    }

    if (repeatedPassword !== password) {
        errorBoxPassword.textContent = "Lösenorden matchar inte.";
        return;
    }

    body.password = password;
  }

  if (Object.keys(body).length === 0) {
    errorBoxPassword.textContent = "Inget att updatera.";
    return;
  }


  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    if (body.username) errorBoxUsername.textContent = data.error;
    if (body.password) errorBoxPassword.textContent = data.error;
    return;
  } 

  if (body.username) successBoxUsername.textContent = "Nytt användarnamn har sparats.";
  if (body.password) successBoxPassword.textContent = "Nytt lösenord har sparats.";

  form.reset();
});


//nav
const menu = document.querySelector('details');

document.addEventListener('click', (event) => {
  
    if (!menu) return;

    if (!menu.contains(event.target)) {
        menu.removeAttribute('open');
    }
});

//toggle password visibility button
const input = document.getElementById("password-update") || null;
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
