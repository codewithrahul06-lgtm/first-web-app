import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("dashboard");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch("/api/orders/my", {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            setOrders(data);
        };

        if (user?.token) fetchOrders();
    }, [user]);

    return (
        <div className="profile-container">

            {/* SIDEBAR */}
            <div className="sidebar">
                <h2>👤 {user?.name}</h2>

                <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
                <button onClick={() => setActiveTab("orders")}>My Orders</button>
                <button onClick={() => setActiveTab("details")}>My Details</button>
                <button onClick={() => setActiveTab("addProduct")}>Add Product</button>

                <button className="logout" onClick={logout}>Logout</button>
            </div>

            {/* CONTENT */}
            <div className="content">

                {activeTab === "dashboard" && (
                    <div className="card">
                        <h2>📊 Dashboard</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Total Orders:</strong> {orders.length}</p>
                    </div>
                )}

                {activeTab === "orders" && (
                    <div className="card">
                        <h2>🛒 My Orders</h2>

                        {orders.length === 0 ? (
                            <p>No orders yet</p>
                        ) : (
                            orders.map(order => (
                                <div key={order._id} className="order-box">
                                    <p><b>ID:</b> {order._id}</p>
                                    <p><b>Total:</b> Rs. {order.totalAmount}</p>
                                    <p><b>Status:</b> {order.status}</p>

                                    <ul>
                                        {order.items.map((item, i) => (
                                            <li key={i}>
                                                {item.productId?.name} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "details" && (
                    <div className="card">
                        <h2>👤 My Details</h2>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                )}

                {activeTab === "addProduct" && (
                    <div className="card">
                        <h2>➕ Add Product</h2>

                        <input placeholder="Product Name" />
                        <input placeholder="Price" />
                        <input placeholder="Category" />
                        <button>Add Product</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Profile;