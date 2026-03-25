const { body } = require("express-validator");

const noteValidator = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .bail()
        .isLength({ min: 2 }).withMessage("Title must be atleast two Characters"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .bail()
        .isLength({ min: 5 }).withMessage("Description must be atleast five Characters"),

];

module.exports = { noteValidator };