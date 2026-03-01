import type { lessonsDocument } from './types/mongo';

const API_BASE = 'http://localhost:3000';

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
