const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Validate input fields
    await Promise.all([
      body("username")
        .notEmpty().withMessage("Username is required")
        .trim().escape()
        .run(req),
  
      body("email")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail()
        .run(req),
  
      body("password")
        .isLength({ min: 3 }).withMessage("Password must be at least 6 characters")
        .run(req),
    ]);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    await Promise.all([
      body("username").notEmpty().withMessage("Username is required").trim().escape().run(req),
      body("password").notEmpty().withMessage("Password is required").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is missing in environment variables" });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, username });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
