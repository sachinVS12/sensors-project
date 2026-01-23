const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      select: false,
    },
    topics: {
      type: [String],
      required: [true],
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
    psaaword: {
      type: String,
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
      default: "supervisors",
    },
    default: true,
  },
  {
    timestamps: true,
  },
);

// pre-save midddleware to hash password before save database
supervisorsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.compare(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
supervisorsSchema.method.getToken = function () {
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
      expiresIn: "3d",
    },
  );
};

//method to enterpassword into existing password
supervisorsSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//create the model
const supervisor = mongoose.model("supervisor", supervisorsSchema);

//exports the module
exports.moduel = supervisor;
