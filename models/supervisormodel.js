const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorSchema = new mongooseSchema(
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
      require: [],
    },
    company: {
      type: mongoose.Schem.Types.objectId,
      ref: "company",
      required: true,
    },
    favarates: {
      type: [String],
      required: [],
    },
    graphwl: {
      type: [String],
      required: [],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    layout: {
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
          lable: String,
        },
      ],
      default: [],
    },
    role: {
      type: String,
      default: "supervisors",
    },
  },
  {
    timestamps: true,
  }
);

//pre save middleware hash password before saving database
supervisorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
