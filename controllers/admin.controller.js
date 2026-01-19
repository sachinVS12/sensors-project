const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!["manager", "employee"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
    role,
  });

  res.json({ message: `${role} created successfully` });
};

//login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await user.findone({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const isMatch = await user.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await user.getToken();
  res.status(200).json({
    success: true,
    token,
  });
});

//admin
const admin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await admin.findone({ email }).select("+password");
  if (!admin) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const isMatch = await admin.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await admin.getToken();
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

//create company
const creatcompany = asyncHandler(async (req, res, next) => {
  const { name, email, phonenumber, lable, address } = req.body;
  const company = await company({ name });
  if (!company) {
    return next(new ErrorResponse("Invalid Credentials", 409));
  }
  const newcompany = new company({ name, email, phonenumber, lable, address });
  await newcompany.save();
  res.status(200).json({
    success: true,
    data: newcompany,
  });
});
