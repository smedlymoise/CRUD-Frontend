import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./SingleStudent.css";

const SingleStudent = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  const getSingleStudent = async (id) => {
    try {
      const getSingleStudent = await axios.get(
        `http://localhost:8080/api/students/${id}`
      );
      setStudent(getSingleStudent.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleStudent(id);
  }, [id]);

  if (!student) return <p>loading...</p>;

  return (
    <div className="single-student-container">
      <h2 className="single-student-title">Student Details</h2>
      <div className="single-student-info">
        <h3>
          <strong>Name:</strong> {student.name}
        </h3>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>GPA:</strong> {student.gpa}
        </p>
        <p>
          <img
            src={student.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
            alt={`${student.name}`}
            className="single-student-image"
          />
        </p>
      </div>
    </div>
  );
};

export default SingleStudent;