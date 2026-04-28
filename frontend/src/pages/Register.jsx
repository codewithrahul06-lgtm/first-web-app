import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful 🚀");

                login(data.token);   // store token
                navigate("/");
            } else {
                alert(data.message || "Registration failed");
            }

        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h2>Create Account 🛍️</h2>
                <p>Join ShopNest and start shopping</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

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

                    <button type="submit">Register</button>

                </form>

                <p className="switch">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
};

export default Register;