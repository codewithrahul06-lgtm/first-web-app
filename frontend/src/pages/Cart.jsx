import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
    );

    const handleQuantityChange = (item, delta) => {
        const newQty = (item.quantity || 1) + delta;

        if (newQty < 1) {
            dispatch(removeFromCart(item._id));
        } else {
            dispatch(updateQuantity({ itemId: item._id, quantity: newQty }));
        }
    };

    return (
        <div className="cart-container">
          

            <h2 className="cart-title">Your Cart 🛒</h2>

            {cartItems.length === 0 ? (
                <p className="empty-cart">
                    Your cart is empty. Start shopping!
                </p>
            ) : (
                <div className="cart-content">

                    {/* LEFT */}
                    <div className="cart-items">

                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">

                                <img
                                    src={item.image || item.imageUrl}
                                    alt={item.name}
                                />

                                <div className="item-info">

                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>

                                    <div className="qty">

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item, -1)
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item, 1)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            dispatch(removeFromCart(item._id))
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                                <div className="item-total">
                                    $
                                    {(
                                        item.price * item.quantity
                                    ).toFixed(2)}
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* RIGHT */}
                    <div className="cart-summary">

                        <h3>Order Summary</h3>

                        <p>Total Items: {cartItems.length}</p>

                        <p className="total-price">
                            Total: ${total.toFixed(2)}
                        </p>

                        <Link
                            to="/checkout"
                            className="checkout-btn"
                        >
                            Proceed to Checkout
                        </Link>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Cart;