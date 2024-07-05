// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="mb-4">Welcome to the Admin Panel</h1>
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4 mb-3">
            <Link to="/login" className="btn btn-primary btn-block">
              Login
            </Link>
          </div>
          <div className="col-sm-6 col-md-4">
            <Link to="/register" className="btn btn-secondary btn-block">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
