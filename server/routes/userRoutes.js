const express = require("express");
const router = express.Router();
const { updateUserProfile, getUserProfile } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;
