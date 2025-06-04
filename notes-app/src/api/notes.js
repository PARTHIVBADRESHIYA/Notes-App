const BASE_URL = "http://localhost:5000/api";

export const fetchNotes = async () => {
    try {
        const res = await fetch(`${BASE_URL}/notes`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

export const createNote = async (note) => {
    try {
        const res = await fetch(`${BASE_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: note.title,
                description: note.description
            }),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/notes/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
};

export const updateNote = async (id, updatedNote) => {
    try {
        const res = await fetch(`${BASE_URL}/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updatedNote.title,
                description: updatedNote.description
            }),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
};