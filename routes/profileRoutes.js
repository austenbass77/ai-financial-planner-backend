const express = require("express");
const router = express.Router();
const { updateProfile, getProfile } = require("../controllers/profileController");

router.get("/:userId", getProfile);
router.post("/:userId", updateProfile);

module.exports = router;
