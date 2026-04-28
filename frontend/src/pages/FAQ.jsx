import React from "react";
import "../styles/faq.css";

const FAQ = () => {
    return (
        <div className="faq-page">

            {/* HERO */}
            <div className="faq-hero">
                <h1>Frequently Asked Questions</h1>
                <p>Find answers to common questions about ShopNest</p>
            </div>

            {/* CONTENT */}
            <div className="faq-container">

                <div className="faq-item">
                    <h3>🛒 How do I place an order?</h3>
                    <p>
                        Simply browse products, add them to your cart, and proceed to checkout.
                        Follow the steps to complete your order.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>🚚 How long does delivery take?</h3>
                    <p>
                        Delivery usually takes 2–5 business days for local orders and up to 10–20 days for international shipping.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>💳 What payment methods do you accept?</h3>
                    <p>
                        We accept cash on delivery, credit/debit cards, and online payment gateways (depending on availability).
                    </p>
                </div>

                <div className="faq-item">
                    <h3>🔄 Can I return a product?</h3>
                    <p>
                        Yes, you can return products within 7–14 days if they are unused and in original condition.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>📦 How can I track my order?</h3>
                    <p>
                        Once your order is shipped, you will receive a tracking ID via email or SMS.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>📞 How can I contact support?</h3>
                    <p>
                        You can reach us at support@shopnest.com or call +1 234 567 890.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default FAQ;