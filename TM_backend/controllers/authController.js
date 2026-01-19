// controllers/authController.js
const User = require("../models/users");
const bcrypt = require("bcryptjs");

// Signup
exports.postSignup = async (req, res) => {
  const { name, email, password, userType } = req.body;
  console.log("User Created ", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err); // <-- log the full error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id.toString(),
      email: user.email,
      userType: user.userType,
    };

    // 🔥 CRITICAL
    req.session.save((err) => {
      if (err) {
        console.error("SESSION SAVE ERROR:", err);
        return res.status(500).json({ message: "Session save failed" });
      }

      return res.status(200).json({
        message: "Logged in successfully",
        user: req.session.user,
      });
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Logout
exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

// Protected Dashboard
exports.dashboard = (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized" });

  res.json({
    message: `Welcome ${req.session.user.email}`,
    user: req.session.user,
  });
};

exports.getCurrentUser = async (req, res) => {
  console.log("COOKIE HEADER:", req.headers.cookie);
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION DATA:", req.session);

  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Fetch full user from DB using session user id
    const user = await User.findById(req.session.user.id).select(
      "-password" // exclude password
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("GET CURRENT USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
