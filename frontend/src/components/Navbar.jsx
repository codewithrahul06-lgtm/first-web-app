import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";



const Navbar = () => {
    const { user, logout, cart } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.items);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-container">

                {/* Logo */}
                <div className="nav-brand">
                    <Link to="/" className="logo">
                        🛍️ ShopNest
                    </Link>
                </div>

                {/* Menu */}
                <ul className="nav-menu">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/products" className="nav-link">Shop</Link></li>

                    <li>
                        <Link to="/cart" className="nav-link">
                            Cart 🛒 ({cart.length})
                        </Link>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link to="/profile" className="nav-link">
                                    Hi, {user.name}
                                </Link>
                            </li>

                            {user.role === "admin" && (
                                <li>
                                    <Link to="/admin" className="nav-link">Admin</Link>
                                </li>
                            )}

                            <li>
                                <button onClick={handleLogout} className="nav-link logout-btn">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;