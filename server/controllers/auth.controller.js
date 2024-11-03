const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const moment = require('moment');


exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    console.log("Hello")
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("World")
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Hello world")
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Logout user
exports.logout = async (req, res) => {
  // Simply return success message, frontend will handle token removal
  res.status(200).json({ message: "User logged out successfully" });
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.requestOtp = async(req,res, next) => {
  try{
    const {email} = req.body;

    //Check if user exists
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    // Generate OTP and save it to the user record with expiration time
    const otp = generateOtp();
    const otpExpiresAt = moment().add(10,'minutes');
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    console.log(user)

    await user.save();

    // Send OTP to user's mobile (implement SMS or email service here)
    console.log(`OTP for ${email} is ${otp}`)

    res.status(200).json({message: 'OTP sent successfully'});
  }
  catch(error){
    next(error);
  }
}

// 2. Verify OTP
exports.verifyOtp = async (req, res, next) => {
  try{
    const {email, otp} = req.body;

    //Check if user exists
    const user = await User.findOne({email});
    if(!user || user.otp!== otp){
      return res.status(400).json({message: 'Invalid OTP or email'});
    }

    // Check if OTP is expired
    if(moment().isAfter(user.otpExpiresAt)){
      return res.status(400).json({message: 'OTP expired'});
    }

    // Clear OTP and set mobile_verified to true
    user.otp = null;
    user.otpExpiresAt = null;
    user.mobile_verified = true;
    await user.save();

    res.status(200).json({message: 'OTP verified successfully',token: user.generateAuthToken()})
  }catch(error){
    next(error);
  }
};