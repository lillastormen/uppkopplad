// For search function
let allLessons: any [] = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(
            'http://localhost:3000/api/lessons',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        console.log('Fetched lessons for search index: ', data);

        allLessons = data;
    } catch (err) {
        const error = err as Error;
        console.error('Could not fetch lessons for search index', error.message);
    }
});

const searchField = document.querySelector('#search-field') as HTMLInputElement;
const searchBtn = document.querySelector('#search-button') as HTMLButtonElement;

function getSearchQuery () {
    return searchField.value.trim();
}

// For everything outside of search function
const mobileBtn = document.getElementById('mobile-btn') as HTMLButtonElement;
const computerBtn = document.getElementById('computer-btn') as HTMLButtonElement;
const internetBtn = document.getElementById('internet-btn') as HTMLButtonElement;

mobileBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=mobil';
});

computerBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=dator';
});

internetBtn.addEventListener('click', () => {
    window.location.href = 'lesson-modules.html?module=internet';
});
