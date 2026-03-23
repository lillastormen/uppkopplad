const API_BASE = 'http://localhost:3000';

const moduleImages = {
    mobil: {
        image: "../images/mobilelady.svg",
        alt: "mobile-module-img"
    },
    dator: {
        image: "../images/pclady.svg",
        alt: "dator-module-img"
    },
    internet: {
        image: "../images/internetdude.svg",
        alt: "internet-module-img"
    }
}

function getMainModuleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('module');
}
async function fetchSubModules(mainModule) {
    try {
        const response = await fetch(`${API_BASE}/api/mainModules/${mainModule}/subModules`, {
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
        console.error('Failure fetching lesson submodules', error.message);
        throw error;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const moduleName = getMainModuleFromUrl();
    const imageElement = document.getElementById('module-img');
    const assets = moduleImages[moduleName];
    
    if (moduleName) {
        fetchSubModules(moduleName)
            .then((subModules) => {
            console.log('Fetched submodules:', subModules);
            const lessonButtons = document.querySelector('#lesson-buttons');
            imageElement.src = assets.image;
            imageElement.alt = assets.alt;
            lessonButtons.innerHTML = '';
            subModules.forEach((subModule) => {
                const button = document.createElement('button');
                button.className = "primary-btn"; 
                button.textContent = subModule.module;
                const chosenLesson = subModule.module;
                button.addEventListener('click', () => {
                    window.location.href = `choosen-lesson.html?lesson=${chosenLesson}`;
                });
                lessonButtons.appendChild(button);
            });
        })
            .catch((err) => {
            const error = err;
            console.log('Could not fetch submodules (lessons)', error.message);
        });
    }
    else {
        console.log('No module in URL query');
    }
});
export {};
//# sourceMappingURL=lesson-modules.js.map