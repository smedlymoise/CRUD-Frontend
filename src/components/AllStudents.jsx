// components/AllStudents.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "./AllStudents.css";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students'); // Adjust API endpoint if needed
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching all students:", err);
        setError("Failed to load students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, []);

  if (loading) {
    return <p>Loading all students...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="all-students-container">
      <h2 className="page-title">All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="students-grid">
          {students.map(student => (
            <div key={student.id} className="student-card">
              <Link to={`/students/${student.id}`}>
                <img
                  src={student.imageUrl || 'https://placehold.co/150x150/cccccc/000000?text=No+Image'}
                  alt={student.name}
                  className="student-list-image"
                />
                <h3>{student.name}</h3>
                <p>{student.email}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudents;