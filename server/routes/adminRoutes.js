const express = require("express");
const adminController = require("../controller/adminController");
const adminRoutes = express.Router();
const Authorize = require("../middleware/auth");
adminRoutes.post("/register", adminController.adminRegister);
adminRoutes.post("/login", adminController.adminLogin);

// common for both admin and user
adminRoutes.post("/logout", Authorize([1, 2]), adminController.adminLogout);
adminRoutes.post("/generate-refresh-token", Authorize([1, 2]), adminController.generateRefreshToken);

module.exports = adminRoutes;
