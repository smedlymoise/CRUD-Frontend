import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth(); // Destructure isAuthenticated and logout from useAuth

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/campuses" className="navbar-link">Campuses</Link>
      <Link to="/students" className="navbar-link">Students</Link> {/* Added Students link, as per previous full NavBar */}
      {isAuthenticated ? (
        // If authenticated, show Logout button
        <button onClick={handleLogout} className="navbar-button">Logout</button>
      ) : (
        // If not authenticated, show Login and Signup links
        <>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;