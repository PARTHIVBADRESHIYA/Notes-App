const Note = require("../models/noteModel.js");

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Server error" });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { title, description} = req.body;
        if (!title || !description) return res.status(400).json({ message: "Title and description required" });

        const newNote = new Note({ title, description});
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Note deleted", note });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description},
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};