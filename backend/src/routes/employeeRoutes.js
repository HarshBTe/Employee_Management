const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");


const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getReportees,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/employeeController");

router.use(protect);

// Super Admin & HR
router.post(
  "/",
  authorizeRoles("Super Admin", "HR Manager"),
  upload.single("profileImage"),
  createEmployee
);

router.get(
  "/",
  authorizeRoles("Super Admin", "HR Manager"),
  getEmployees
);

router.get(
  "/:id",
  authorizeRoles("Super Admin", "HR Manager"),
  getEmployeeById
);

router.put(
  "/:id",
  authorizeRoles("Super Admin", "HR Manager"),
  upload.single("profileImage"),
  updateEmployee
);

router.delete(
  "/:id",
  authorizeRoles("Super Admin"),
  deleteEmployee
);

router.patch(
  "/:id/manager",
  authorizeRoles("Super Admin", "HR Manager"),
  assignManager
);

router.get(
  "/:id/reportees",
  authorizeRoles("Super Admin", "HR Manager"),
  getReportees
);

router.get(
  "/me/profile",
  authorizeRoles("Employee"),
  getMyProfile
);

router.put(
  "/me/profile",
  authorizeRoles("Employee"),
  upload.single("profileImage"),
  updateMyProfile
);

module.exports = router;