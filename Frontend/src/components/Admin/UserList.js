import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../services/userService";
import UserForm from "./UserForm";
import "./UserList.css"; // Import custom CSS for further styling

const UserList = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers(auth.token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [auth.token]);

  const handleUserFormSubmit = (updatedUser) => {
    if (selectedUser) {
      // Update existing user in the list
      setUsers(
        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
    } else {
      // Add new user to the list
      setUsers([...users, updatedUser]);
    }
    setSelectedUser(null); // Clear the form after submission
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await userService.deleteUser(userId, auth.token);
      setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from the list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">User List</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          <UserForm
            selectedUser={selectedUser}
            onFormSubmit={handleUserFormSubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>{" "}
                  ({user.email}) [{user.role}]
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
