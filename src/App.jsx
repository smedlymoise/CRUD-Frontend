import React from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./components/Home";
import Campus from "./components/CampusList";
import AddCampus from "./components/AddCampus";
import SingleCampus from "./components/SingleCampus";
import AddStudent from "./components/AddStudent";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="app-content">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* All Campuses Page */}
          <Route
            path="/campuses"
            element={
              <>
                <h1 className="page-title">All Campuses</h1>
                <Campus />
              </>
            }
          />

          {/* Add New Campus Page */}
          <Route
            path="/add-campus"
            element={
              <>
                <h1 className="page-title">Add New Campus</h1>
                <AddCampus />
              </>
            }
          />

          {/* Single Campus Detail Page */}
          <Route
            path="/campuses/:id"
            element={<SingleCampus />}
          />

          {/* Add Student Page (linked from SingleCampus) */}
          <Route
            path="/campuses/:id/add-student"
            element={
              <>
                <h1 className="page-title">Add New Student</h1>
                <AddStudent />
              </>
            }
          />

          {/* All Students Page */}
          <Route path="/students" element={<AllStudents />} />

          {/* Single Student Page */}
          <Route
            path="/students/:id"
            element={
              <>
                <h1 className="page-title">Student Details</h1>
                <SingleStudent />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);