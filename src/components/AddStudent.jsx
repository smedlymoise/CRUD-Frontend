import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./AddStudent.css";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const postStudent = async (event) => {
    event.preventDefault();

    try {
      const newStudent = await axios.post(
        "http://localhost:8080/api/students",
        {
          name,
          email,
          gpa,
          imageUrl,
          campusId: id,
        }
      );

      setName("");
      setEmail("");
      setGpa(0.0);
      setImageUrl("");

      navigate(`/campuses/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={postStudent}>
      <h2>Add New Student</h2>

      <label>Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />

      <label htmlFor="gpa">gpa</label>
      <input
        id="gpa"
        type="number"
        step="0.01"
        value={gpa}
        onChange={(e) => setGpa(parseFloat(e.target.value))}
        placeholder="GPA (0.0 - 4.0)"
        min="0"
        max="4"
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <button type="submit">Add Student</button>
    </form>
  );
};
export default AddStudent;
