const express = require("express");
const router = express.Router();

const { forgotPassword, resetPassword, sendOtp, verifyOtp } = require("../controllers/otpControllers");

// Registration OTP
router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

// Forgot Password
router.post("/forgot", forgotPassword);

// Reset Password
router.post("/reset", resetPassword);

module.exports = router;
