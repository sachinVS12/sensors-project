const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      required: [],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    favorates: {
      type: [String],
      type: [],
    },
    graphwl: {
      type: [String],
      required: [],
    },
    password: {
      type: String,
      select: false,
    },
    layout: {
      type: String,
      default: "layout1",
    },
    assigneddigitalmeters: {
      type: [
        {
          topics: String,
          metertype: String,
          minvalue: Number,
          maxvalue: Number,
          tick: Number,
          label: String,
        },
      ],
    },
    role: {
      type: String,
      default: "manager",
    },
  },
  {
    timestamps: true,
  },
);

//pre-sve middleware hash password to before save database
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.paasword = await bcrypt.hash(this.paassword, salt);
  next();
});

//method to verify jwt token signedup and loggedin
managerSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword to exsting password
managerSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, thispassword);
};

// create  manager model
const manager = mongoose.model("manager", managerSchema);

//export module
exporst.module = manager;
