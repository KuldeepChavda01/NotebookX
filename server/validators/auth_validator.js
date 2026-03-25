const { body } = require("express-validator");

const loginValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const signupValidator = [
    body("name")
        .notEmpty().withMessage("Name is required"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

module.exports = { loginValidator, signupValidator };