import React from "react";
import "../styles/policy.css";

const ReturnPolicy = () => {
    return (
        <div className="policy-page">

            <div className="policy-hero">
                <h1>Return & Refund Policy</h1>
                <p>Last updated: 2026</p>
            </div>

            <div className="policy-container">

                <section>
                    <h2>Returns</h2>
                    <p>
                        You have 7–14 days from the date of delivery to request a return. 
                        To be eligible, the item must be unused, in its original packaging, 
                        and in the same condition that you received it.
                    </p>
                </section>

                <section>
                    <h2>Non-Returnable Items</h2>
                    <p>
                        Certain items cannot be returned, including:
                    </p>
                    <ul>
                        <li>Perishable goods</li>
                        <li>Personal care items</li>
                        <li>Gift cards</li>
                        <li>Downloadable software products</li>
                    </ul>
                </section>

                <section>
                    <h2>Refunds</h2>
                    <p>
                        Once your return is received and inspected, we will notify you 
                        of the approval or rejection of your refund. If approved, your 
                        refund will be processed within 5–10 business days.
                    </p>
                </section>

                <section>
                    <h2>Exchanges</h2>
                    <p>
                        We only replace items if they are defective or damaged. 
                        If you need an exchange, contact us with proof of purchase.
                    </p>
                </section>

                <section>
                    <h2>Shipping Costs</h2>
                    <p>
                        Shipping costs for returning items are non-refundable. 
                        Customers are responsible for return shipping unless the 
                        item was defective or incorrect.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        For return requests or questions, contact us at:
                    </p>
                    <p>
                        📧 <a href="mailto:support@shopnest.com">support@shopnest.com</a>
                    </p>
                </section>

            </div>
        </div>
    );
};

export default ReturnPolicy;