const path = require("path");

// ✅ explicitly load .env from backend root
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User.model");

const seedAdmin = async () => {
  await connectDB();

  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "sachin",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created successfully");
  process.exit();
};

seedAdmin();
