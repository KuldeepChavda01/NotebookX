const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Creating a User using POST: "/api/auth/createuser". No Login Required.
router.post(
  "/createuser",
  [
    body("name", "name can't be empty").notEmpty(),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Req Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, error: result.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check for the user in the database with provided email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          success,
          error: "Sorry a user with this email exists already",
        });
      }
      // Password hashing
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);
      // Creating and save the user
      user = new User({ name, email, password: securePass });
      await user.save();
      // AuthToken
      const dataForToken = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(dataForToken, JWT_SECRET);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.log(`Internal server error:${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// // ROUTE 2: Authenticate a User Using: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Req Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, error: result.array() });
    }
    const { email, password } = req.body;
    try {
      // Check for the user in the database with provided email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ error: "Please try to login with correct credentials" });
      }
      // Password Comparison
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(401)
          .json({ error: "Please try to login with correct credentials" });
      }
      // Authtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.log(`Internal server error:${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ROUTE 3: Get loggedin user details Using: POST "api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(`Internal server error:${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
