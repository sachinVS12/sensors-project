const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const managerSchema = new mongoose.Schema(
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
            type: String,
            default: [],
        },
        company: {
            type: mongoose.Schema.Types.objectId,
            ref:"company",
            required: true,
        },
        faverates: {
            type: [String],
            default: [],
        },
        graphwl: {
            type: [String],
            default: [],
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
        },
        layout: {
            type: String,
            default:"layout1",
        },
        assigndigitalmeters: {
            type: [
                {
                    topic: String,
                    metertype: String,
                    minvalue: Number,
                    maxvalue: Number,
                    ticks: Number,
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
        timestamps: true,
    }
);