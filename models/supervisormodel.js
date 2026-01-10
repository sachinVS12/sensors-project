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
      type: String,
      ref: "company",
      required: true,
    },
    favorates: {
      type: [String],
      required: [],
    },
    grpahawl: {
      type: [String],
      required: [],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    assignedgigitalmeters: {
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
      defalut: "supervisors",
    },
  },
  {
    timestamps: true,
  }
);

//pre save midddleware to hash password before saving database
supervisorsSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jwt token verify in signedup and logedin
supervisorsSchema.method.jwtToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.pasword,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};

//method to enterpassword to existing password database
supervisorsSchema.method.verify = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

//create supervisors model
const supervisors = mongoose.model("supervisors", supervisorsSchema);

//exports models
exports.module = supervisors;
