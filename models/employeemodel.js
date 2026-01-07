const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const employeeSchema = new mongoose.Schema(
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
            requirec: false,
        },
        topics: {
            type: [String],
            default: [],
        },
          company: {
            type: mongoose.Schema.Types.objectId,
            ref: "company",
            required: true,
          },
          faverates: {
            tyep: [String],
            default: [],
          },
          graphwl: {
            tyep: [String],
            default: [],
          },
          passwords: {
            type: String,
            select: false,
            required: [true, "Pasword is required"],
          },
          layouts: {
            type: String,
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
                    label: String,
                },
            ],
            default: [],
          },
          role: {
            tyep: String,
            default: "emplyee",
          },
        },
        {
            timestamps: true,
        }
);