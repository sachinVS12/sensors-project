const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schem(
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
    phonenumbers: {
      type: String,
      select: false,
    },
    topics: {
      type: [String],
      required: [],
    },
    company: {
      type: mongoose.Schema.Types.objectId,
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
      required: true,
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
  },
);

//pre-save middleware to hash password in beforedatbase
employeeSchema.pre("save", async function (next) {
  if (!this.ismodified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
employeeSchema.method.getToken = function () {
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

//method to enterpassword to existing password
employeeSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//crete model
const employee = mongoose.model("employee", employeeSchema);

//expots module
exports.moduel = employee;
