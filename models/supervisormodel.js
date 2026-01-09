const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisors = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      default: [],
    },
    company: {
      type: mongoose.schema.Types.objectId,
      ref: "company",
      required: true,
    },
    favorates: {
      type: [string],
      default: [],
    },
    graphwl: {
      type: [string],
      default: [],
    },
    password: {
      type: string,
      select: false,
      required: [true, "Password is required"],
    },
    layout: {
      type: string,
      default: "layout1",
    },
    assigneddigitalmeters: {
      type: [
        {
          topic: String,
          metertype: String,
          minvalue: Number,
          maxvalue: Number,
          tick: Number,
          lable: String,
        },
      ],
      default: [],
    },
    role: {
      type: string,
      default: "supervisors",
    },
  },
  {
    timestamps: true,
  }
);

// pre-save middleware has password before saving database
supervisors.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.has(this.password, salt);
  next();
});

// jwt token verify signedup and signedin
