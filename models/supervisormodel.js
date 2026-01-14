const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorSchema = new mongoose.Schema(
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
      required: fasle,
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
      type: [string],
      required: [],
    },
    graphwl: {
      type: [String],
      requiured: [],
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
      default: [],
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

//pre-save middleware hash password to before save databse
supervisorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to generate jwt token verify signedup and loggedin
supervisorSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      Password: this.password,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
};

//method to enterpassword to exsiting password
supervisorSchema.methods.verifypass = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

//create supervisors model
const supervisors = mongoose.model("supervisors", supervisorSchema);

//exports module
moduel.exports = supervisors;
