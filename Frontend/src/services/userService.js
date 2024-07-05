// src/services/userService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAllUsers = (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `${token}` },
  });
};

const createUser = (userData, token) => {
  return axios.post(`${API_URL}`, userData, {
    headers: { Authorization: `${token}` },
  });
};

const updateUser = (userId, userData, token) => {
  return axios.put(`${API_URL}/${userId}`, userData, {
    headers: { Authorization: `${token}` },
  });
};

const deleteUser = (userId, token) => {
  return axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `${token}` },
  });
};
// eslint-disable-next-line
export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
