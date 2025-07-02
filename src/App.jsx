// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./AppStyles.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
