const jwt = require("jsonwebtoken")

const authorizeUser = (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Please authenticate using a valid token"
            });
    }

    try {
        const dataOfJWT = jwt.verify(token, process.env.JWT_SECRET)
        req.user = dataOfJWT.user
        next();
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message
        });
    }
}

module.exports = { authorizeUser }