const url = 'http://localhost:3000/users/login';
const form = document.getElementById('login-form');
const message = document.getElementById('login-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value;


   const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        message.textContent = data.error || 'Fel lösenord. Kontrollera dina uppgifter och försök igen.';
        return;
    } else {
        window.location.href="/account"
    }
    // message.textContent = `Inloggad som ${username}`;
    form.reset();
});

//toggle password visibility button
const input = document.getElementById('password') || null;
const toggleButton = document.getElementById('toggle-visibility');

if (input && toggleButton) {
    toggleButton.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            toggleButton.textContent = '🙈';
        } else {
            input.type = 'password';
            toggleButton.textContent = '👀'
        }
    });
}

function login() {
    
}
