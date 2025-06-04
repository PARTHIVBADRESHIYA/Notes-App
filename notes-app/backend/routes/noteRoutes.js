const express = require("express");
const router = express.Router();
const {
    getAllNotes,
    createNote,
    deleteNote,
    updateNote
} = require("../controllers/noteController.js");

router.get("/notes", getAllNotes);
router.post("/notes", createNote);
router.delete("/notes/:id", deleteNote);
router.put("/notes/:id", updateNote);

module.exports = router;
