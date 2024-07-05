// export default UserManagement;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap"; // Import Bootstrap container for responsive layout
import UserList from "../components/Admin/UserList";

const UserManagement = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the Home page after logout
  };

  return (
    <Container>
      <div className="my-4">
        <h1 className="text-center">User Management</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
        <UserList />
      </div>
    </Container>
  );
};

export default UserManagement;
