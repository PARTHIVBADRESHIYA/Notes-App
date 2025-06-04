import { useState, useEffect } from "react";
import "./NoteForm.css";

function NoteForm({ addNote, updateNote, noteToEdit, isEditing }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isEditing && noteToEdit) {
            setTitle(noteToEdit.title);
            setDescription(noteToEdit.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [noteToEdit, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Both fields required.");
            return;
        }

        try {
            if (isEditing) {
                await updateNote({ title, description });
            } else {
                await addNote({ title, description });
            }
            
            if (!isEditing) {
                setTitle("");
                setDescription("");
            }
        } catch (error) {
            console.error("Error submitting note:", error);
            alert("Failed to save note. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">
                {isEditing ? "Update Note" : "Add Note"}
            </button>
        </form>
    );
}

export default NoteForm;