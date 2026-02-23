const url = 'http://localhost:3000/users/registration';
const form = document.getElementById('registration-form');
const message = document.getElementById('registration-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value;
    const repeatedPassword = form.passwordRepeat.value;

    if (repeatedPassword !== password) {
        message.textContent = 'Lösenorden matchar inte.';
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
    });

    console.log('sddsd')

    const data = await response.json();

    if (!response.ok) {
        message.textContent = data.error || 'Registering misslyckades. Kontrollera dina uppgifter och försök igen.';
        return;
    }
    message.textContent = 'Ditt konto har skapats';
    form.reset();
});
