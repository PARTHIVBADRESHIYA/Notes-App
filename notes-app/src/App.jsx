import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./api/notes";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const handleAdd = async (note) => {
    try {
      const newNote = await createNote(note);
      if (newNote) {
        setNotes([...notes, newNote]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
  };

  const handleUpdate = async (updatedNoteData) => {
    try {
      const updatedNote = await updateNote(currentNote._id, updatedNoteData);
      if (updatedNote) {
        setNotes(
          notes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );
        setIsEditing(false);
        setCurrentNote(null);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  return (
    <div className="container">
      <h1>📝 Notes App </h1>
      <div className="container">
        <NoteForm
          addNote={handleAdd}
          updateNote={handleUpdate}
          noteToEdit={currentNote}
          isEditing={isEditing}
        />
        <NoteList
          notes={notes}
          deleteNote={handleDelete}
          editNote={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;