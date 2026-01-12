const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorsSchema = new mongoose.schema(
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
      required: [],
    },
    company: {
      type: mongoose.schema.Types.objectId,
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
    password: {
      type: [String],
      select: false,
      required: [true, "Password is required"],
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
  },
  {
    timestamps: true,
  }
);

// pre save middleware to hash password before save database
supervisorsSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// jwt token verify signedup and loggedin
supervisorsSchema.method.jwtToken = async function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};

//method to enterpassword to exsting to password
supervisorsSchema.method.verify = async function (enterpassword) {
  return await bcrypt.compare(thispassword, enterpassword);
};

//create model
const supervisors = new mongoose.model("supervisors", supervisorsSchema);

//exports the model
exports.module = supervisors;
