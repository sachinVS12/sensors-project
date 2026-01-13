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
      unique: true,
      required: true,
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
      type: company.Schema.Types.objectId,
      ref: "company",
      required: true,
    },
    favorates: {
      type: [String],
      required: [],
    },
    grapghwl: {
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
    timstamps: true,
  }
);

//pre-save middleware  hash password to before save database
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to generate jwt token verify signdeup and loggedin
managerSchema.methods.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expareIn: "3d",
    }
  );
};

//method to verify enterpassword to existing password
managerSchema.methods.veryfypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//create manager model
const manager = new mongoose.model("manager", managerSchema);

//module.exports
module.expots = manager;
