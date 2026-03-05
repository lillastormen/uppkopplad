import type { lessonsDocument } from "./types/mongo";
import { getMainModuleFromUrl } from "./lesson-modules";

const API_BASE = 'http://localhost:3000';

async function fetchLesson (lesson: string): Promise<lessonsDocument[]> {
    try {
        const response = await fetch(
            `${API_BASE}/api/mainModules/${lesson}/subModules`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (err) {
        const error = err as Error;
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

                const header = document.querySelector('#top')!;
                header.innerHTML = '';

                lesson.forEach((lesson) => {
                    const nameOflesson = document.createElement('h2');

                    nameOflesson.textContent = lesson.module;

                    header.appendChild(nameOflesson);
                });
            })
            .catch((err) => {
                const error = err as Error;
                console.log('Could not fetch lesson', error.message);
            });
    } else {
        console.log('No lesson in URL query');
    }
});
