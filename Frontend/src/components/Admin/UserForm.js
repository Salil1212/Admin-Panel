import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../services/userService";

const UserForm = ({ selectedUser, onFormSubmit }) => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
    password: "", // Add password field
  });

  useEffect(() => {
    if (selectedUser) {
      setUserData({ ...selectedUser, password: "" }); // Set password to empty for updates
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedUser;
      if (selectedUser) {
        // For updates, do not include password if it's empty
        const { password, ...updatedData } = userData;
        updatedUser = await userService.updateUser(
          selectedUser._id,
          updatedData,
          auth.token
        );
      } else {
        updatedUser = await userService.createUser(userData, auth.token);
      }
      onFormSubmit(updatedUser.data); // Pass updated user data to the callback
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={userData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={userData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {!selectedUser && ( // Show password field only for creation
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      )}
      <select
        name="role"
        value={userData.role}
        onChange={handleChange}
        required
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">{selectedUser ? "Update" : "Create"}</button>
    </form>
  );
};

export default UserForm;
