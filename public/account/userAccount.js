const url = 'http://localhost:3000/users/auth';

document.addEventListener("DOMContentLoaded", () => {
  loadAuthenticateUser();
});

async function loadAuthenticateUser() {

    const res = await fetch (url, {
        credentials: "include"
    });

    if (res.status === 401) {
        //not logged in, send to login page
        window.location.href="/login";
        return;
    }

    let json = await res.json();
    const username = json.data.username;    

    document.getElementById('greeting').textContent = `Välkommem ${username}`;
    
}
