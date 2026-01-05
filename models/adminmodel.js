const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [/.+\.@+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            select: false,
            require: [true, "Password is required"]
        },
    },
    { timestamps: true }
);