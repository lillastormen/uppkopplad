const url = "http://localhost:3000/users/user";
const form = document.getElementById("credentials-update-form");
const errorBoxPassword = document.getElementById("error-msg-password");
const errorBoxUsername= document.getElementById("error-msg-username")
const successBoxPassword = document.getElementById("success-msg-password");
const successBoxUsername = document.getElementById("success-msg-username");

const deleteBtn = document.getElementById("delete-acc-btn");
const deleteBox = document.getElementById("delete-acc-container");
const confirmBtn = document.getElementById("confirm-delete");
const cancelBtn = document.getElementById("cancel-delete");
const passwordInput = document.getElementById("delete-password");
const errorBox = document.getElementById("delete-error");
const hellBox = document.getElementById("hell-box");


//update
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
    headers: { 
      "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(body)
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

//delete
deleteBtn.addEventListener("click", () => {
  deleteBox.style.display = "grid";
  deleteBox.style.justifyItems = "center";
  deleteBox.style.marginTop = "1rem";
  deleteBox.style.justifyContent = "space-evenly"
});

cancelBtn.addEventListener("click", () => {
  deleteBox.style.display = "none";
  errorBox.textContent = "";
  passwordInput.value = "";
});

confirmBtn.addEventListener("click", async () => {
  const password = passwordInput.value;
  errorBox.textContent = "";

  if (!password) {
    errorBox.textContent = "Ange lösenord";
    return;
  }

  try {
    const response = await fetch(url, {
      method: "DELETE", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent = data.error || 'Fel lösenord';
      return;
    }

    //if success
    window.location.href = "/";
  } catch {
    errorBox.textContent = "Unknown error occured";
  }
})


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
