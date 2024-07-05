import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import statement

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setAuth({ token: response.data.token });
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow error to handle in calling component
    }
  };

  const decodeToken = (token) => {
    return jwtDecode(token); // Decodes the JWT token
  };

  const isAdmin = () => {
    return auth && auth.token && decodeToken(auth.token).role === "Admin";
  };

  return (
    <AuthContext.Provider value={{ auth, login, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
