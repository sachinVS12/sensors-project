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
  const ismatch = await user.verifypass(password);
  if (!ismatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await user.gettoken();
  res.status(200).json({
    success: true,
    token,
  });
});

const admin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await admin.findone({ email }).select("+select");
  if (!user) {
    return next(new ErrorResponse("Invalid crdentials", 401));
  }
  const isMatch = await verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await admin.gettoken();
  (res.status(200),
    json({
      success: true,
      token,
    }));
});

//cretecompany
const company = asyncHandler(async (req, res, next) => {
  const { name, email, phonnumber, label, address } = req.body;
  const company = await company.findone({ name });
  if (!company) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const newcompany = new company({ name, email, phonnumber, label, address });
  await newcompany.save();
  res.status(200).json({
    success: true,
    data: compnay,
  });
});

//getsinglecompany
const getsinglecompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await company.findById({ companyId });
  if (!companyId) {
    return next(new ErrorResponse(`no company found with id ${companyId}`));
  }
  res.status(200).json({
    success: true,
    data: company,
  });
});

//deletecompany
const deletecompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const company = await company.findById(id);
  if (!company) {
    return next(new ErrorResponse(`no company fund iwith id ${id}`));
  }
  await token.deleteone();
  res.status(200).json({
    success: true,
    data: [],
  });
});
