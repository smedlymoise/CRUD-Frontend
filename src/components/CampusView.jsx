// src/components/CampusView.jsx
import React, { useState } from 'react';

function CampusView({ campuses, addCampus, deleteCampus }) {
  const [newCampusName, setNewCampusName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCampusName.trim()) {
      addCampus(newCampusName.trim());
      setNewCampusName('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-700 text-center">Manage Campuses</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={newCampusName}
          onChange={(e) => setNewCampusName(e.target.value)}
          placeholder="New Campus Name"
          className="flex-grow p-3 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Add Campus
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No campuses added yet.</p>
        ) : (
          campuses.map((campus) => (
            <div key={campus.id} className="bg-white border rounded-xl p-5">
              <h3 className="text-xl font-semibold">{campus.name}</h3>
              <button
                onClick={() => deleteCampus(campus.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
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

export default CampusView;
