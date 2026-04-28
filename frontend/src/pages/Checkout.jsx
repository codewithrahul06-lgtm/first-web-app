import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { AuthContext } from "../context/AuthContext";
import "../styles/checkout.css";

const Checkout = () => {
    const { user } = useContext(AuthContext);

    const cartItems = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check authentication on mount
    useEffect(() => {
        if (!user || !user.token) {
            // Try to get user from localStorage
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                navigate("/login", { state: { from: "/checkout" } });
            }
        }
    }, [user, navigate]);

    const [address, setAddress] = useState({
        fullname: "",
        phone: "",
        street: "",
        city: "",
        zip: ""
    });

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const bypassPayment = async () => {
        if (!user || !user.token) {
            alert("Please login first");
            return;
        }
        const saveOrderRes = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: "bypass_" + Date.now()
            })
        });

        if (saveOrderRes.ok) {
            dispatch(clearCart());
            navigate("/order-success");
        } else {
            alert("Order failed");
        }
    };

  const handlePayment = async () => {
    if (!user || !user.token) {
        alert("Please login first");
        navigate("/login");
        return;
    }

    if (!address.fullname || !address.phone || !address.street) {
        alert("Fill all fields");
        return;
    }

    try {
        const orderResponse = await fetch("/api/payment/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ amount: totalPrice })
        });

        const orderData = await orderResponse.json();

        const options = {
            key: orderData.key,
            amount: orderData.order.amount,
            currency: "INR",
            name: "ShopNest",
            order_id: orderData.order.id,

            handler: async function (response) {
                const verifyResponse = await fetch("/api/payment/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${user.token}`
                    },
                    body: JSON.stringify(response)
                });

                const verifyData = await verifyResponse.json();

                if (verifyData.verified)  {
                    await fetch("/api/orders", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${user.token}`
                        },
                        body: JSON.stringify({
                            items: cartItems,
                            totalAmount: totalPrice,
                            address,
                            paymentId: response.razorpay_payment_id
                        })
                    });

                    dispatch(clearCart());
                    navigate("/order-success");
                } else {
                    alert("Payment verification failed");
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (err) {
        console.error(err);
        alert("Payment error");
    }
};
    return (
        <div className="checkout-page">

            <h2 className="checkout-title">Checkout 🧾</h2>

            <div className="checkout-container">

                {/* FORM */}
                <div className="checkout-form">

                    <input
                        name="fullname"
                        placeholder="Full Name"
                        value={address.fullname}
                        onChange={handleChange}
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={address.phone}
                        onChange={handleChange}
                    />

                    <input
                        name="street"
                        placeholder="Street"
                        value={address.street}
                        onChange={handleChange}
                    />

                    <input
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                    />

                    <input
                        name="zip"
                        placeholder="ZIP"
                        value={address.zip}
                        onChange={handleChange}
                    />

                    <button onClick={handlePayment}>
                        Pay Now
                    </button>

                    <button onClick={bypassPayment}>
                        Cash on Delivery
                    </button>

                </div>

                {/* SUMMARY */}
                <div className="checkout-summary">

                    {cartItems.map((item) => (
                        <div key={item._id}>
                            {item.name} × {item.quantity}
                        </div>
                    ))}

                    <h3>Total: ${totalPrice.toFixed(2)}</h3>

                </div>

            </div>
        </div>
    );
};

export default Checkout;