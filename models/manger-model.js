const mongoose = require("mongoose");
const bcrypt = require(bcryptjs);
const jwt = require("jsonwebtoken");

const mangerSchema = new mongoose.Schema(
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
    },
    favorates: {
      type: [String],
      required: [true],
    },
    graphwl: {
      type: [String],
      required: [true],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    layout: {
      type: String,
      default: "layout1",
    },
    assigneddigitalmetrs: {
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
      default: [],
    },
    role: {
      type: String,
      default: "manager",
    },
  },
  {
    default: true,
  },
);
