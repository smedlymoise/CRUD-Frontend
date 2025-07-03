import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./SingleCampus.css"; // make sure this is present

const SingleCampus = () => {
  const [campus, setCampus] = useState(null);
  const { id } = useParams();

  const getSingleCampus = async (id) => {
    try {
      const getSingleCampus = await axios.get(
        `http://localhost:8080/api/campuses/${id}`
      );
      setCampus(getSingleCampus.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleCampus(id);
  }, []);

  if (!campus) return <p>Loading...</p>;

  return (
    <div className="campus-container">
      <h2 className="campus-title">Campus Details</h2>
      <div className="campus-info">
        <h3>
          <strong>Name:</strong> {campus.name}
        </h3>
        <p>
          <strong>Address:</strong> {campus.address}
        </p>
        <p>
          <strong>Description:</strong> {campus.description}
        </p>
        <img
          src={campus.imageUrl || "https://via.placeholder.com/150"}
          alt={`${campus.name}`}
          className="campus-image"
        />
      </div>

      <div className="students-section">
        <h3 className="students-title">Students in this Campus</h3>
        {campus.students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <div className="student-cards">
            {campus.students.map((student) => (
              <div key={student.id} className="student-card">
                <p className="student-name">{student.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCampus;
