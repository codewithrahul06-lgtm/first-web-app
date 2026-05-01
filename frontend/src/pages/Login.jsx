import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [mode, setMode] = useState("login"); // login | forgot | reset
    // const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetOtp, setResetOtp] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ================= LOGIN =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Login successful 🚀");

                // store token in context/localStorage
                login(data);

                // redirect to checkout if that's where user came from, else home
                const redirect = location.state?.from;
                if (redirect) {
                    navigate(redirect);
                } else {
                    navigate("/");
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }

        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong");
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
            toast.success("Reset OTP sent on your email 📩");
            setMode("reset");
        } else {
            toast.error(data.message);
        }
    };

    // ================= RESET PASSWORD =================
    const handleResetPassword = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/otp/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: form.email,
                otp: resetOtp,
                newPassword,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Password reset successful ✅");
            setMode("login");
            navigate("/login");
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                {/* ================= LOGIN ================= */}
                {mode === "login" && (
                    <>
                        <h2>Welcome Back 👋</h2>
                        <p>Login to continue shopping</p>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit">Login</button>

                        </form>

                        <p className="switch">
                            Don’t have an account?{" "}
                            <Link to="/register">Register</Link> |{" "} 
                            <Link to="#" onClick={() => setMode("forgot")}>Forgot Password</Link>
                        </p>
                    </>
                )}

                {/* ================= FORGOT PASSWORD ================= */}
                {mode === "forgot" && (
                    <>
                        <h2>Forgot Password 🔑</h2>

                        <form onSubmit={handleForgotPassword}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Send Reset OTP</button>
                        </form>

                        <p onClick={() => setMode("login")} style={{ cursor: "pointer", color: "blue" }}>
                            Back to Login
                        </p>
                    </>
                )}

                {/* ================= RESET PASSWORD ================= */}
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

                        <p onClick={() => setMode("login")} style={{ cursor: "pointer", color: "blue" }}>
                            Back to Login
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default Login;