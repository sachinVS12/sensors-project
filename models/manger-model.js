const mongoose = require("mongoose");
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
            required: true,
            unique: true,
        },
        phonenumber: {
            type: String,
            required: false,
        },
        topics: {
            type: [String],
            defalut: [],
        },
        company: {
            type: mongoose.Schema.Types.objectId,
            ref: "company",
            required: true,
        },
        faviortes: {
            type: [String],
            defalut: [],
        },
        graphwl: {
            type: [String],
            defalut: [],
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
        },
        layouts: {
            type: String,
            defalut: "layout1",
        },
        assigneddigitalmeters: {
            type: [
                {
                    topic: String,
                    metertype: String,
                    minvalue:Number,
                    maxvalue: Number,
                    tick: Number,
                    lable: String,
                },
            ],
            defalut: [],
        },
        role: {
            type: String,
            defalut: "manager",
        },
    },
    { 
        tiemstamps: true,
     }
);

// pre save midddlware has password saving befor database 
mangerSchema("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
const salt = await bcrypt.gensalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});
  

//jwt token verify signedup and loggedin
mangerSchema.methods.getToken = function () {
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
mangerSchema.methods.verify = async function (enterpassword) {
    return await bcrypt.compare(thispassword, enterpassword);
};

// create manger model
const Manger = mongoose.model("manager", mangerSchema);

//exports in model
module.exports= Manger;
