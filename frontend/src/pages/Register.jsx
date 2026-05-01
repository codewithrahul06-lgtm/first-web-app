import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";
import {toast} from 'react-toastify';

const Register = () => {

    // 🔥 MODE CONTROL
    const [mode, setMode] = useState("register"); // register | forgot | reset

    // 🔥 FORM STATES
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [otp, setOtp] = useState("");
    const [resetOtp, setResetOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    

    const [step, setStep] = useState(1);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ================= REGISTER =================

    const handleSendOtp = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/otp/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("OTP sent On Your Email Please Check Your Email 📩");
            setStep(2);
        } else {
            toast.error(data.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/otp/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: form.email,
                otp
            })
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Account created Successfully  🚀");
            login(data);
            navigate("/");
        } else {
            toast.error (data.message);
        }
    };

    // ================= FORGOT PASSWORD =================

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/otp/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email })
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Reset OTP sent on your email Please Check Your Email 📩");
            setMode("reset");
        } else {
            toast.error(data.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/otp/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: form.email,
                otp: resetOtp,
                newPassword
            })
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Password reset successful ✅");
            setMode("register");
             navigate("/login");
            setStep(1);
            
        } else {
            toast.error(data.message);
        }
    };

    // ================= UI =================

    return (
        <div className="auth-page">
            <div className="auth-card">

                {/* ================= REGISTER ================= */}
                {mode === "register" && step === 1 && (
                    <>
                        <h2>Create Account 🛍️</h2>

                        <form onSubmit={handleSendOtp}>
                            <input name="name" placeholder="Full Name" onChange={handleChange} required />
                            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                            <button type="submit">Create Account</button>
                        </form>

                        <p onClick={() => setMode("forgot")} style={{ cursor: "pointer", color: "red" }}>
                            Forgot Password?
                        </p>    
                        <p onClick={() =>  navigate("/login")} style={{  cursor: "pointer", color: "yellow" }}>
                            Back to Login
                        </p>
                    </>
                )}

                {/* ================= OTP VERIFY ================= */}
                {mode === "register" && step === 2 && (
                    <>
                        <h2>Verify OTP 🔐</h2>

                        <form onSubmit={handleVerifyOtp}>
                            <input
                                type="text"
                                placeholder="Enter Your OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />

                            <button type="submit">Verify & Register</button>
                        </form>
                    </>
                )}

                {/* ================= FORGOT ================= */}
                {mode === "forgot" && (
                    <>
                        <h2>Forgot Password 🔑</h2>

                        <form onSubmit={handleForgotPassword}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />

                            <button type="submit">Send Reset OTP</button>
                        </form>

                        <p onClick={() => setMode("register")} style={{ cursor: "pointer", color: "blue" }}>
                            Back to Register
                        </p>
                    </>
                )}

                {/* ================= RESET ================= */}
                {mode === "reset" && (
                    <>
                        <h2>Reset Password 🔐</h2>

                        <form onSubmit={handleResetPassword}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={resetOtp}
                                onChange={(e) => setResetOtp(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />

                            <button type="submit">Reset Password</button>
                        </form>

                        <p onClick={() => setMode("register")} style={{ cursor: "pointer", color: "blue" }}>
                            Back to Register
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default Register;