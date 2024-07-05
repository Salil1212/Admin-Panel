import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the Home page after logout
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
