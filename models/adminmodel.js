const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongooseSchema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [/.+\.@+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            default: "employee"
        },
    },
    {
        timestamps: true,
    }
);

adminSchema("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.gensalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.getToken = function () {
    return jwt_sign(
        { id: this._id, name: this.name, email:this.email, password: this.password, role:this.role},
        process.env.JWT_SECRET,
        {
            expireIn: "3d",
        }
    );
};

