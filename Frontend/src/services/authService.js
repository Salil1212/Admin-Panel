// src/services/authService.js
import axios from "axios";

const API_URL = "https://admin-panel-server-wheat.vercel.app/api/auth";

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
