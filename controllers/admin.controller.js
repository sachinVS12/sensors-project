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

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalide Crdentials", 401));
  }
  const isMatch = await user.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalide Crdentials", 401));
  }
  const token = await user.getToken();
  res.status(201).json({
    success: true,
    token,
  });
});

const admin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await admin.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Crdentials", 401));
  }
  const isMatch = await verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Crdentials", 401));
  }
  const token = await admin.getToken();
  res.status(201).json({
    success: true,
    token,
  });
});
