const API_BASE = 'http://localhost:3000';
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
function getMainModuleFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('module');
}
document.addEventListener('DOMContentLoaded', () => {
    const moduleName = getMainModuleFromUrl();
    if (moduleName) {
        fetchSubModules(moduleName)
            .then((subModules) => {
            console.log('Fetched submodules:', subModules);
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
//# sourceMappingURL=lesson-modules.js.map