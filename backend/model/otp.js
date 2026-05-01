const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: Date,
    name: String,
    password: String
});

module.exports = mongoose.model("Otp", otpSchema);