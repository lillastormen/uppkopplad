const url = 'http://localhost:3000/users/login';
const form = document.getElementById('login-form');
const errorBox = document.getElementById("error-msg");

const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('big-login-btn');


function validateInputs() {
    if (username.value.trim() && password.value.trim()) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', true);
    }
}

username.addEventListener('input', validateInputs);
password.addEventListener('input', validateInputs);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

   const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({ 
            username: username.value, 
            password: password.value })
    });

    const data = await response.json();

    if (!response.ok) {
        errorBox.textContent = data.error;
        return;
    } else 
         window.location.href = "/modules/mainModules.html";
    
    // message.textContent = `Inloggad som ${username}`;
    form.reset();
});

//toggle password visibility button
const input = document.getElementById('password') || null;
const toggleButton = document.getElementById('toggle-visibility');
const icon = toggleButton?.querySelector('i');

if (input && toggleButton && icon) {
    toggleButton.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        icon.classList.toggle('bi-eye', !isPassword);
        icon.classList.toggle('bi-eye-slash', isPassword);
    });
}

// function login() {
    
// }
