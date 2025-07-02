// src/components/StudentView.jsx
import React, { useState, useEffect } from 'react';

function StudentView({ students, campuses, addStudent, deleteStudent }) {
  const [newStudentName, setNewStudentName] = useState('');
  const [selectedCampusId, setSelectedCampusId] = useState('');

  useEffect(() => {
    if (campuses.length > 0 && !selectedCampusId) {
      setSelectedCampusId(campuses[0].id);
    }
  }, [campuses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStudentName.trim() && selectedCampusId) {
      addStudent(newStudentName.trim(), selectedCampusId);
      setNewStudentName('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-700 text-center">Manage Students</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="New Student Name"
          className="flex-grow p-3 border border-gray-300 rounded-lg"
          required
        />
        <select
          value={selectedCampusId}
          onChange={(e) => setSelectedCampusId(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white"
          required
        >
          <option value="">Select Campus</option>
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
          disabled={!selectedCampusId}
        >
          Add Student
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No students added yet.</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="bg-white border rounded-xl p-5">
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Campus: {campuses.find(c => c.id === student.campusId)?.name || 'N/A'}
              </p>
              <button
                onClick={() => deleteStudent(student.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentView;
