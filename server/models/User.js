const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    mobile:{
      type: String,
      required: false,
      unique: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiresAt: {
      type: Date,
      required: false,
    },
    mobile_verified: {
      type: Boolean,
    },

  },
  { timestamps: true }
);
UserSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, roles: this.roles };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = mongoose.model("User", UserSchema);
