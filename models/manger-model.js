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
    phoneNumber: {
      type: String,
      required: false,
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

// pre save midddlware has password saving befor database
managerSchema("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jwt token verify signedup and loggedin
managerSchema.methods.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expireIn: "3d",
    }
  );
};

// method to enterpaswor to exiating password in database
managerSchema.methods.verify = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

// create manger model
const manager = mongoose.model("manger", managerSchema);

// exports in model
module.exports = manager;
