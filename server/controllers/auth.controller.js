const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../model2/User");


exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.requestOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();
    const otpExpiresAt = moment().add(10, "minutes").toDate();
    await user.update({ otp, otpExpiresAt });

    console.log(`OTP for ${email} is ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }

    if (moment().isAfter(user.otpExpiresAt)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await user.update({ otp: null, otpExpiresAt: null, mobile_verified: true });
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};
