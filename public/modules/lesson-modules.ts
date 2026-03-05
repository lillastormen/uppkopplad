import type { lessonsDocument } from './types/mongo';

const API_BASE = 'http://localhost:3000';

export function getMainModuleFromUrl (): string | null {
    const params = new URLSearchParams(window.location.search);

    return params.get('module');
}

async function fetchSubModules (mainModule: string): Promise<lessonsDocument[]> {
    try {
        const response = await fetch(
            `${API_BASE}/api/mainModules/${mainModule}/subModules`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
        console.error('Failure fetching lesson submodules', error.message);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const moduleName = getMainModuleFromUrl();

    if (moduleName) {
        fetchSubModules(moduleName)
            .then((subModules) => {
                console.log('Fetched submodules:', subModules);

                const lessonButtons = document.querySelector('#lesson-buttons')!;

                lessonButtons.innerHTML = '';

                subModules.forEach((subModule) => {
                    const button = document.createElement('button');

                    button.textContent = subModule.module;

                    const chosenLesson = subModule.module;

                    button.addEventListener('click', () => {
                        window.location.href = `choosen-lesson.html?lesson=${chosenLesson}`;
                    });

                    lessonButtons.appendChild(button);
                });
            })
            .catch((err) => {
                const error = err as Error;
                console.log('Could not fetch submodules (lessons)', error.message);
            });
    } else {
        console.log('No module in URL query');
    }
});
