
const url = 'http://localhost:3000/users/auth';

document.addEventListener("DOMContentLoaded", () => {
  loadAuthenticateUser();
});

async function loadAuthenticateUser() {

    const res = await fetch (url, {
        credentials: "include"
    });

    const greetingEl = document.getElementById('greeting');
    const authButton = document.getElementById('auth-btn');

    if (!res.ok) {
        if (authButton) {
            authButton.textContent ='Logga in';
            authButton.onclick = () => {
                window.location.href = '/login';
            };
        }
        return;
    }

    let json = await res.json();
    const username = json.data.username;    

   if (greetingEl) {
        greetingEl.textContent = `Välkommem ${username}`;
   }

   if (res.ok) {
        if(authButton) {
             authButton.textContent = 'Logga ut';
        authButton.classList.remove('primary-btn');
        authButton.classList.add('secondary-btn');
        authButton.onclick = logout;
        }
       
   }

   async function logout() {
    await fetch("/logout", {
        method: "POST",
        credentials: "include"
    });

    window.location.href = "/";
}
}
