
import React from 'react';
import './NoteList.css';

function NoteList({ notes, deleteNote, editNote }) {
    console.log("NOTES:", notes);

    return (
        <div className="note-list">
            {notes.map((note) => (
                <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                    <div className="note-actions">
                        <button className="delete-btn" onClick={() => deleteNote(note._id)}>
                            Delete
                        </button>
                        <button className="edit-btn" onClick={() => editNote(note)}>
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NoteList;
