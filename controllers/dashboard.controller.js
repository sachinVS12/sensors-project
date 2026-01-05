exports.adminDashboard = (req, res) => {
  res.json({ message: "Admin Panel" });
};

exports.managerDashboard = (req, res) => {
  res.json({ message: "Manager Dashboard" });
};

exports.employeeDashboard = (req, res) => {
  res.json({ message: "Employee Dashboard" });
};
