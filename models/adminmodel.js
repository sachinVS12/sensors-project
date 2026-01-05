const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
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
            require: [true, "Password is required"]
        },
        role: {
            type:String,
            default: "employee"
        }
    },
    { timestamps: true }
);

//pre-save middleware to hash the password before saving to database
adminschema("save", async function (next) {
    if (!this.isModified("Password")) {
        return next();
    }
    const salt = await bcrypt.gensalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminschema.methods.getToken = function () {
    return jwt_sign(
        { id: this_id, name: this.name, email: this.email, role: this.role },
        process.env.JWT_SECRET,
        {
            expireIn: "3d",
        }
    );
};