const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("User", "Admin"),
    defaultValue: "User",
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  mobile_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

// 🔹 Generate JWT Token
User.prototype.generateAuthToken = function () {
  const payload = { id: this.id, role: this.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🔹 Hash Password Before Save
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;

