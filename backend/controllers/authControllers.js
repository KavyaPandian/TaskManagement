const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Signup request:", req.body); // DEBUG

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ msg: "Signup successful" });

  } catch (err) {
    console.error("🔥 Signup Error:", err);
    res.status(500).json({ msg: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, msg: "This email is not registered!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Password incorrect!!" });
    }

    const token = createAccessToken({ id: user._id });

    // ✅ FIX HERE
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      token,
      user: userData,
      status: true,
      msg: "Login successful.."
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};