const express = require("express")
const router = express.Router()

const { login, signup, fetchUser } = require("../controllers/auth")
const { signupValidator, loginValidator } = require("../validators/auth_validator")
const { authorizeUser } = require("../middleware/auth_middleware")

router.get("/", authorizeUser, fetchUser)
router.post("/login", loginValidator, login)
router.post("/signup", signupValidator, signup)

module.exports = router