const { validationResult } = require("express-validator")
const Note = require("../models/Note")

const addNote = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const { title, description, tag } = req.body;

        const note = new Note({
            user: req.user.id,
            title,
            description,
            tag: tag.trim() === "" ? undefined : tag,
        });

        await note.save();

        res.status(201).json({
            success: true,
            message: "Note added successfully",
            note
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            notes
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

const updateNote = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const { title, description, tag } = req.body;

        const newNote = {};

        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Not Found",
            });
        }

        const noteOwnerId = note.user.toString();
        if (noteOwnerId !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Allowed",
            });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Note has been updated",
            note
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

const deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Not Found",
            });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Allowed",
            });
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Note has been deleted",
            note
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

module.exports = { getNotes, addNote, updateNote, deleteNote }