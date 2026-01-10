const mongoose = required("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mangerSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.objectId,
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
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    assignedigitalmeters: {
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
mangerSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jwt token verify sinedup and logedin
managerSchema.method.jwtToken = async function () {
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
      ExpirIn: "3d",
    }
  );
};

// method to enterpassword to existing password to database
managerSchema.method.verify = async function (enterpassword) {
  return await bcrypt.comapre(this.password, enterpassword);
};

// create manager model
const manager = mongoose.model("manager", managerSchema);

// exports model
exports.module = manager;
