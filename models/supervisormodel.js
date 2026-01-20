const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorSchem = new mongoose.Schema(
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
    comapany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    favorates: {
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
      default: "supervisors",
      required: true,
    },
  },
  {
    default: true,
  },
);

// pre-save middleware to hash password to before database
supervisorSchem.pre("save", async (req, res, next) => {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
supervisorSchem.method.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expireIn: "3d",
    },
  );
};

//method to enterpassword to thispassword
supervisorSchem.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

//create the supervisors model
const superviosrs = mongoose.model("supervisors", supervisorSchem);

//exports the module
exports.module = superviosrs;
