import React from "react";
import "../styles/about.css";

const About = () => {
    return (
        <div className="about-page">

            {/* HERO */}
            <div className="about-hero">
                <h1>About ShopNest</h1>
                <p>Your one-stop destination for seamless online shopping</p>
            </div>

            {/* MAIN CONTENT */}
            <div className="about-wrapper">

                {/* CENTER CARD */}
                <div className="about-card">
                    <h2>Who We Are</h2>
                    <p>
                        ShopNest is a modern e-commerce platform built to provide a
                        smooth and fast shopping experience. We focus on quality,
                        trust, and innovation.
                    </p>

                    <div className="stats">
                        <div>
                            <h3>10K+</h3>
                            <p>Users</p>
                        </div>
                        <div>
                            <h3>5K+</h3>
                            <p>Products</p>
                        </div>
                        <div>
                            <h3>99%</h3>
                            <p>Satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* STORY */}
                <div className="about-card">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2024, ShopNest started with a simple idea:
                        make online shopping easy, fast, and reliable for everyone.
                    </p>
                </div>

                {/* VALUES */}
                <div className="about-grid">
                    <div className="glass-card">Customer First</div>
                    <div className="glass-card">Quality Products</div>
                    <div className="glass-card">Fast Delivery</div>
                    <div className="glass-card">Secure Payment</div>
                </div>

                {/* SOCIAL */}
                <div className="social-section">
                    <h2>Follow Us</h2>

                    <div className="social-buttons">

                        <a href="#" className="social-btn facebook">
                            📘 Facebook
                        </a>

                        <a href="#" className="social-btn instagram">
                            📸 Instagram
                        </a>

                        <a href="#" className="social-btn twitter">
                            🐦 Twitter
                        </a>

                        <a href="#" className="social-btn linkedin">
                            💼 LinkedIn
                        </a>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;