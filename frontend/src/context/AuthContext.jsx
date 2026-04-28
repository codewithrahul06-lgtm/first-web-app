import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // 🔥 Load user from localStorage on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

 const login = (data) => {
    const userData = {
        ...data.user,
        token: data.token
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
};

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item._id === product._id);
            let newCart;
            if (existingItem) {
                newCart = prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [...prevCart, { ...product, quantity: 1 }];
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter(item => item._id !== productId);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </AuthContext.Provider>
    );
};  