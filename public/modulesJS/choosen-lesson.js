const API_BASE = 'http://localhost:3000';
function getMainModuleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lesson');
}
async function fetchLesson(lesson) {
    try {
        const response = await fetch(`${API_BASE}/api/lessons/${lesson}/lesson`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        const error = err;
        console.error('Failure fetching lesson', error.message);
        throw error;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const lessonName = getMainModuleFromUrl();
    if (lessonName) {
        fetchLesson(lessonName)
            .then((lesson) => {
            console.log('Fetched lesson:', lesson);
            const header = document.querySelector('#top');
            header.innerHTML = '';
            lesson.forEach((lesson) => {
                const nameOflesson = document.createElement('h2');
                nameOflesson.textContent = lesson.module;
                header.appendChild(nameOflesson);
            });
        })
            .catch((err) => {
            const error = err;
            console.log('Could not fetch lesson', error.message);
        });
    }
    else {
        console.log('No lesson in URL query');
    }
});
export {};
//# sourceMappingURL=choosen-lesson.js.map