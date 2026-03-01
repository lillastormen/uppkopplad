const mobileBtn = document.getElementById('mobile-btn') as HTMLButtonElement;
const computerBtn = document.getElementById('computer-btn') as HTMLButtonElement;
const internetBtn = document.getElementById('internet-btn') as HTMLButtonElement;

mobileBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=mobil';
});