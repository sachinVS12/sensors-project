const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema(
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
employeeSchema("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
const salt = await bcrypt.gensalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});
  

//jwt token verify signedup and loggedin
employee.methods.getToken = function () {
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
employeeSchema.methods.verify = async function (enterpassword) {
    return await bcrypt.compare(this.password, enterpassword);
};

// create manger model
const employee = mongoose.model("employee", employeeSchema);

//exports in model
module.exports= employee;
