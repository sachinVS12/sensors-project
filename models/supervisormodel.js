const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supervisorSchema = new mongooseSchema(
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
      require: [],
    },
    company: {
      type: mongoose.Schem.Types.objectId,
      ref: "company",
      required: true,
    },
    favarates: {
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
    layout: {
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
          lable: String,
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

//pre save middleware hash password before saving database
supervisorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//jwt token verify in signedup and logedin
supervisorSchema.method.getToken = function () {
  return jwt_sign(
    {
      id: this._id,
      name: this.name,
      emial: this.email,
      pasword: this.password,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};

//method to enterpassword to existing pasword in database
supervisorSchema.method.verify = async function (enterpassword) {
  return await bcrypt.comapre(this.password, enterpassword);
};

//cretae supervisor model
const supervisors = mongoose.model("supervisors", supervisorSchema);

//module exports
exports.module = supervisors;
