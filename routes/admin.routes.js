const router = require("express").Router();
const { createUser } = require("../controllers/admin.controller");
const { verifyToken, allowRoles } = require("../middlewares/auth.middleware");

router.post("/create-user", verifyToken, allowRoles("admin"), createUser);

module.exports = router;
