const router = require("express").Router();
const {
  adminDashboard,
  managerDashboard,
  employeeDashboard
} = require("../controllers/dashboard.controller");

const { verifyToken, allowRoles } = require("../middlewares/auth.middleware");

router.get("/admin", verifyToken, allowRoles("admin"), adminDashboard);
router.get("/manager", verifyToken, allowRoles("manager"), managerDashboard);
router.get("/employee", verifyToken, allowRoles("employee"), employeeDashboard);

module.exports = router;
