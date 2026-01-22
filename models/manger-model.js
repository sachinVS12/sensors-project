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

//pre-save middleware to hashpassword before database
mangerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to veify token jwt token
mangerSchema.method.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigneddigitalmetrs: this.assigneddigitalmetrs,
    },
    process.env.JWT_SECRET,
    {
      expireIn: "3d",
    },
  );
};

//method to enterpassword into existing password
mangerSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//create model
const manager = mongoose.model("manager", mangerSchema);

//exports model
exports.module = manger;
