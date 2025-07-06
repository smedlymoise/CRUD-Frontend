import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CampusList.css";
import { useNavigate, Link } from "react-router-dom";

const Campus = () => {
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  const getAllCampuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/campuses");
      setCampuses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCampuses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/campuses/${id}`);
      await getAllCampuses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="campus-container">
      <Link to="/add-campus">
        <button className="add-campus-button">Add Campus</button>
      </Link>

      {campuses.length === 0 ? (
        <p className="no-campus">There are no campuses in the database.</p>
      ) : (
        <ul>
          {campuses.map((campus) => (
            <li
              key={campus.id}
              onClick={() => navigate(`/campuses/${campus.id}`)}
            >
              <div className="campus-image-placeholder">
                {/* Use campus.imageUrl if available, otherwise show "No Image" */}
                {campus.imageUrl ? (
                  <img src={campus.imageUrl} alt={campus.name} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <h3>{campus.name}</h3>
              {/* Display campus address if available */}
              {campus.address && (
                <p className="campus-address">{campus.address}</p>
              )}
              {/* Display campus description if available */}
              {campus.description && (
                <p className="campus-description">{campus.description}</p>
              )}
              <button
                className="trash-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(campus.id);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Campus;