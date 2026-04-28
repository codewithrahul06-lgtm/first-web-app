import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
                alert("Login successful 🚀");

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
                alert(data.message || "Invalid credentials");
            }

        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

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
                    <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    );
};

export default Login;