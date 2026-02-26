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
const mobileBtn = document.getElementById('mobile-btn');
const computerBtn = document.getElementById('computer-btn');
const internetBtn = document.getElementById('internet-btn');
mobileBtn.addEventListener('click', () => {
    fetchSubModules('mobil');
});
export {};
//# sourceMappingURL=mainModules.js.map