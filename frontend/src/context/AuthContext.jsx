import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 🔥 Load user from localStorage on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            // Ensure token is included in user object
            if (storedToken && !user.token) {
                user.token = storedToken;
            }
            setUser(user);
        }
    }, []);

const login = (data) => {
  localStorage.setItem("token", data.token);
  // Include token in user object for admin dashboard access
  const userWithToken = { ...data.user, token: data.token };
  localStorage.setItem("user", JSON.stringify(userWithToken));
  setUser(userWithToken);
};

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};  