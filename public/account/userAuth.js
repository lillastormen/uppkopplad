
const url = 'http://localhost:3000/users/auth';

document.addEventListener("DOMContentLoaded", () => {
  loadAuthenticateUser();
});

export async function loadAuthenticateUser() {

    const res = await fetch (url, {
        credentials: "include"
    });

    const greetingEl = document.getElementById('greeting');
    const authButton = document.getElementById('auth-btn');


    if (!res.ok) {
        authButton.textContent ='Logga in';
        authButton.classList.remove('secondary-btn');
        authButton.classList.add('primary-btn');
        authButton.onclick = () => {
            window.location.href = '/login';
        };
    
        if (greetingEl) {
            greetingEl.textContent = "";
        }
         return;
    }

    let json = await res.json();
    const username = json.data.username;    

    if (greetingEl) {
        greetingEl.textContent = `Välkommem ${username}`;
    }
  
    if(authButton){
        console.log('got it');
        authButton.textContent = 'Logga ut';
        authButton.classList.replace('primary-btn', 'secondary-btn');
    }

    // authButton.classList.add('secondary-btn');

    authButton.onclick = logout;



   async function logout() {
        await fetch("/logout", {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "/";
    }
}
