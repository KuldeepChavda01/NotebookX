const express = require("express")
const router = express.Router()

const { addNote, getNotes, updateNote, deleteNote } = require("../controllers/note")
const { authorizeUser } = require("../middleware/auth_middleware")
const { noteValidator } = require("../validators/note_validator")

router.post("/", authorizeUser, noteValidator, addNote)
router.get("/", authorizeUser, getNotes)
router.put("/:id", authorizeUser, noteValidator, updateNote)
router.delete("/:id", authorizeUser, noteValidator, deleteNote)

module.exports = router