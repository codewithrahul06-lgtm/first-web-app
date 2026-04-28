import React from "react";
import "../styles/policy.css";

const ShippingPolicy = () => {
    return (
        <div className="policy-page">

            {/* HERO */}
            <div className="policy-hero">
                <h1>Shipping Policy</h1>
                <p>Last updated: 2026</p>
            </div>

            {/* CONTENT */}
            <div className="policy-container">

                <section>
                    <h2>Processing Time</h2>
                    <p>
                        All orders are processed within 1–3 business days. 
                        Orders are not shipped or delivered on weekends or holidays.
                    </p>
                </section>

                <section>
                    <h2>Shipping Rates & Delivery Estimates</h2>
                    <p>
                        Shipping charges for your order will be calculated and displayed at checkout.  
                        Delivery times depend on your location:
                    </p>
                    <ul>
                        <li>Local Shipping: 2–5 business days</li>
                        <li>National Shipping: 5–10 business days</li>
                        <li>International Shipping: 10–20 business days</li>
                    </ul>
                </section>

                <section>
                    <h2>Order Tracking</h2>
                    <p>
                        Once your order is shipped, you will receive a tracking number via email 
                        so you can monitor your delivery status in real time.
                    </p>
                </section>

                <section>
                    <h2>Shipping Delays</h2>
                    <p>
                        Delivery delays can occasionally occur due to high demand, weather 
                        conditions, or courier issues. We appreciate your patience.
                    </p>
                </section>

                <section>
                    <h2>Incorrect Address</h2>
                    <p>
                        Please ensure your shipping address is correct. We are not responsible 
                        for orders delivered to incorrect addresses provided by the customer.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about shipping, contact us at:
                    </p>
                    <p>
                        📧 <a href="mailto:support@shopnest.com">support@shopnest.com</a>
                    </p>
                </section>

            </div>
        </div>
    );
};

export default ShippingPolicy;