"use strict";
const mobileBtn = document.getElementById('mobile-btn');
const computerBtn = document.getElementById('computer-btn');
const internetBtn = document.getElementById('internet-btn');
mobileBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=mobil';
});
computerBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=dator';
});
internetBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=internet';
});
//# sourceMappingURL=mainModules.js.map