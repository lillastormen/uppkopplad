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

function getSearchQuery (): string {
    return searchField.value.trim();
}

searchBtn.addEventListener('click', () => {
    const userQuery = getSearchQuery();

    const filteredLesson = allLessons.filter((lesson) => {
        return lesson.module.toLowerCase().includes(userQuery.toLowerCase());
    });
    console.log(filteredLesson);

    const searchResultsContainer = document.querySelector('#search-results') as HTMLDivElement;
    searchResultsContainer.innerHTML = '';

    filteredLesson.forEach((lesson) => {
        const resultItem = document.createElement('button');
        resultItem.className = 'primary-btn';
        resultItem.textContent = `${lesson.module}: ${lesson.title}`;

        searchResultsContainer.appendChild(resultItem);

        resultItem.addEventListener('click', () => {
            window.location.href = `choosen-lesson.html?lesson=${encodeURIComponent(lesson.module)}`;
        });
    });
});

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
