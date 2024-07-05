import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap"; // Import Bootstrap components

const Login = () => {
  const { login, isAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Redirect based on user role
      if (isAdmin()) {
        navigate("/users"); // Redirect to UserManagement page for admins
      } else {
        navigate("/dashboard"); // Redirect to dashboard for regular users
      }
    } catch (error) {
      setError("Invalid email or password");
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Login
        </Button>
        <Link
          to="/"
          className="btn btn-secondary w-100 mt-2"
          onClick={handleCancel}
        >
          Cancel
        </Link>
      </Form>
    </div>
  );
};

export default Login;
