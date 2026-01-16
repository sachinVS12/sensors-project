const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emial: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: fasle,
    },
    lebel: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const company = mongoose.model("company", companySchema);

exports.module = company;
