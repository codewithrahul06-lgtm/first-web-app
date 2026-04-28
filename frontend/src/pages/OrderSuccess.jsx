import React from "react";
import { Link } from "react-router-dom";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {
    return (
        <div className="success-page">

            <div className="success-card">

                <div className="check-icon">✔</div>

                <h1>Order Placed Successfully!</h1>

                <p>Thank you for shopping with ShopNest 🛍️</p>

                <p>Your order has been confirmed and will be shipped soon.</p>

                <div className="buttons">

                    <Link to="/" className="home-btn">
                        Continue Shopping
                    </Link>

                    <Link to="/orders" className="order-btn">
                        View Orders
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;