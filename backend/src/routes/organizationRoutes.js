const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getOrganizationTree,
} = require("../controllers/organizationController");

router.get(
  "/tree",
  protect,
  authorizeRoles("Super Admin", "HR Manager"),
  getOrganizationTree
);

module.exports = router;