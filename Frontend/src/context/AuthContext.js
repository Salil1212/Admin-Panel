
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth({ token, user: decodedToken });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://admin-panel-server-wheat.vercel.app/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuth({ token, user: decodedToken });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  const isAdmin = () => auth && auth.user && auth.user.role === "Admin";

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
