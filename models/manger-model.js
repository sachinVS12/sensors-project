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
    phoneNumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      required: [],
    },
    company: {
      type: mongoose.Schema.Types.objectid,
      ref: "company",
      required: true,
    },
    favorates: {
      type: [String],
      required: [],
    },
    graphwl: {
      type: [String],
      required: [],
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

//pre-save middleware to hash password
managerSchema.pre("save", async function (next) {
  if (!this.isModiefied("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token in signedeup and loggedin
managerSchema.method.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      emial: this.email,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    ProcessingInstruction.env.JWT_SECRET,
    {
      expririn: "3d",
    }
  );
};

//method to  enterpaasword to existing passowrd
managerSchema.method.verify = async function (enterpaasword) {
  return await bcrypt.compare(enterpaasword, this.password);
};

//create to model
const manager = new mongoose.model("manager", managerSchema);

//expots the model
module.exports = manager;
