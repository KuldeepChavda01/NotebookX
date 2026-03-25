const User = require("../models/User")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({ name, email, password: hashedPassword })

        await user.save()

        const dataForJWT = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(dataForJWT, JWT_SECRET)

        res.status(201).json({
            success: true,
            message: "Signup success",
            user: {
                name: user.name,
                email: user.email
            },
            token
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Please try to login with correct credentials"
                });
        }

        const dataForJWT = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(dataForJWT, JWT_SECRET)


        res.status(200).json({
            success: true,
            message: "Login success",
            token
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
};

const fetchUser = async (req, res) => {
    try {
        const userID = req.user.id;

        const user = await User.findById(userID).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
};

module.exports = { signup, login, fetchUser };