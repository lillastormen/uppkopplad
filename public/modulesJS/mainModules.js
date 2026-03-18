"use strict";
let allLessons = [];
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/lessons', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Fetched lessons for search index: ', data);
        allLessons = data;
    }
    catch (err) {
        const error = err;
        console.error('Could not fetch lessons for search index', error.message);
    }
});
const searchField = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-button');
function getSearchQuery() {
    return searchField.value.trim();
}
searchBtn.addEventListener('click', () => {
    const userQuery = getSearchQuery();
    const filteredLesson = allLessons.filter((lesson) => {
        return lesson.module.toLowerCase().includes(userQuery.toLowerCase());
    });
    console.log(filteredLesson);
});
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