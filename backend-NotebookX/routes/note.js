const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");

// ROUTE 1: Add a new Note Using : POST "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast two Characters").isLength({ min: 2 }),
    body("description", "Description must be atleast five Characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    let success = false;
    // Req Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    const { title, description, tag } = req.body;
    try {
      // Create and save a new note
      const note = new Note({
        title,
        description,
        tag: tag.trim() === "" ? undefined : tag,
        user: req.user.id,
      });
      await note.save();
      success = true;
      // Response
      res
        .status(201)
        .json({ success, note, message: "Note added successfully" });
    } catch (error) {
      console.log(`Internal server error:${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ROUTE 2: Update an Existing Note Using : PUT "/api/notes/updatenote/:id". Login Required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Title must be atleast two Characters")
      .optional()
      .isLength({ min: 2 }),
    body("description", "Description must be atleast five Characters")
      .optional()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Req Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    try {
      const { title, description, tag } = req.body;
      // Object for update note
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;
      // Find the note in database by noteID
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ success, message: "Not Found" });
      }
      // Allow updating only if user owns the note.
      const noteOwnerId = note.user.toString();
      if (noteOwnerId !== req.user.id) {
        return res.status(401).json({ success, message: "Not Allowed" });
      }
      // Update a note
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      success = true;
      // Response
      res.status(200).json({ success, message: "Note has been updated", note });
    } catch (error) {
      console.log(`Internal server error:${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ROUTE 3: Delete an Existing Note Using : DELETE "/api/notes/deletenote". Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    // Find the note in database by noteID
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success, message: "Not Found" });
    }
    // Allow deleting only if user owns the note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success, message: "Not Allowed" });
    }
    // Delete a note
    note = await Note.findByIdAndDelete(req.params.id);
    success = true;
    // Response
    res.status(200).json({ success, message: "Note has been deleted", note });
  } catch (error) {
    console.log(`Internal server error:${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE 4: Get All the Notes Using : GET "/api/notes/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const allNotes = await Note.find({ user: req.user.id });
    res.status(200).json({ success: true, notes: allNotes });
  } catch (error) {
    console.log(`Internal server error:${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
