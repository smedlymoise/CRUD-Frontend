import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddCampus.css";

const AddCampus = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const postCampus = async (event) => {
    event.preventDefault();
    try {
      const newCampus = await axios.post("http://localhost:8080/api/campuses", {
        name,
        address,
        description,
        imageUrl,
      });

      setName("");
      setAddress("");
      setDescription("");
      setImageUrl("");

      navigate(`/campuses/${newCampus.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="add-campus-form" onSubmit={postCampus}>
      <h2>Add New Campus</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Campus Name"
        required
      />

      <label htmlFor="address">Address</label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Campus Address"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description"
        rows={3}
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <button type="submit">Add Campus</button>
    </form>
  );
};

export default AddCampus;
