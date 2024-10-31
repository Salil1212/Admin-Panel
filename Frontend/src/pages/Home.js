// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css" // Import custom CSS file

const Home = () => {
  const navigate = useNavigate();
  

  const handleLogin = () => {

    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center home-container">
      <div className="text-center">
        <h1 className="mb-5">Welcome to the Admin Panel</h1>
        
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <button
              onClick={handleLogin}
              className="btn btn-primary btn-sm btn-block custom-btn"
            >
              Login
            </button>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <button
              onClick={handleRegister}
              className="btn btn-secondary btn-sm btn-block custom-btn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;