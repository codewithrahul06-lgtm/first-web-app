const User = require("../model/user");
const Otp = require("../model/otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ================= SEND OTP (Registration) =================
exports.sendOtp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔢 Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ⏳ Expiry (5 min)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // ❌ Delete old OTP
        await Otp.deleteMany({ email });

        // 💾 Save new OTP with user data
        await Otp.create({ 
            email, 
            otp, 
            expiresAt,
            name,
            password 
        });

        // 📩 Send Email
        const message = `Your ShopNest registration OTP is: ${otp}. This OTP is valid for 5 minutes.`;
        await sendEmail(
            email,
            "ShopNest - Registration OTP",
            message
        );

        res.status(200).json({ message: "OTP sent to email" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= VERIFY OTP (Registration) =================
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await Otp.findOne({ email, otp });

        if (!record) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ⏳ Check expiry
        if (record.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(record.password, 10);

        // 👤 Create user
        const user = await User.create({
            name: record.name,
            email: record.email,
            password: hashedPassword
        });

        // ❌ Delete OTP after use
        await Otp.deleteMany({ email });

        // Generate token
        const token = generateToken(user._id);

        // Return user data (without password)
        res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🔢 Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ⏳ Expiry (5 min)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // ❌ Delete old OTP
        await Otp.deleteMany({ email });

        // 💾 Save new OTP
        await Otp.create({ email, otp, expiresAt });

        // 📩 Send Email
        const message = `Your password reset OTP is: ${otp}. This OTP is valid for 5 minutes.`;
        await sendEmail(
            email,
            "ShopNest - Password Reset OTP",
            message
        );

        res.status(200).json({ message: "OTP sent to email" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const record = await Otp.findOne({ email, otp });

        if (!record) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ⏳ Check expiry
        if (record.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 🔄 Update user password
        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        // ❌ Delete OTP after use
        await Otp.deleteMany({ email });

        res.status(200).json({ message: "Password reset successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};