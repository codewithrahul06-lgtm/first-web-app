import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-page">

            {/* HERO */}
            <div className="contact-hero">
                <h1>Contact Us</h1>
                <p>We’re here to help you anytime</p>
            </div>

            {/* CONTENT */}
            <div className="contact-container">

                {/* FORM */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h2>Send Message</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Send Message</button>
                </form>

                {/* INFO */}
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>📧 support@shopnest.com</p>
                    <p>📞 +1 234 567 890</p>
                    <p>📍 Kathmandu, Nepal</p>

                    <div className="social">
                        <p>Follow us:</p>
                        <span>Facebook</span>
                        <span>Instagram</span>
                        <span>Twitter</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;