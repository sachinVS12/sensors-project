const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorsScehma = new mongoose.Schema(
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
    aasigneddigitalmeters: {
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
      default: "supervisors",
    },
  },
  {
    timstamps: true,
  }
);

// pre-save middleware to hash password before save database
supervisorsScehma.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
supervisorsScehma.methods.getToken = function () {
  jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: thgis.role,
      aasigneddigitalmeters: this.aasigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};

// method to enterpassword to exsting password
supervisorsScehma.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//crete supervisors model
const supervisors = mongoose.model("supervisors", supervisorsScehma);

//exports the model
exports.module = supervisors;
