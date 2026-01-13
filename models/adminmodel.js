const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/.+\.@+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

//pre-save middleware to hash the password before saving the database
adminSchema("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// mtehod to genrate jwtToken for logedin or signdup
adminSchema.methods.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expireIn: "3d",
    }
  );
};

//method to verify user enter password with existing password in database
adminSchema.methods.verifypassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

// create the user model
const Admin = mongoose.model("Admin", adminSchema);

//moduel exports
module.eports = Admin;
