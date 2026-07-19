const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  getDepartmentChart,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  protect,
  authorizeRoles("Super Admin", "HR Manager"),
  getDashboardStats
);

router.get(
  "/department-chart",
  protect,
  authorizeRoles("Super Admin", "HR Manager"),
  getDepartmentChart
);

module.exports = router;