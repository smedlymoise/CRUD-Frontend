// src/components/Home.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CampusView from './CampusView';
import StudentView from './StudentView';

const Home = () => {
  const [activeView, setActiveView] = useState('campuses');
  const [campuses, setCampuses] = useState([]);
  const [students, setStudents] = useState([]);
  const [modal, setModal] = useState({ show: false, content: '', action: null });

  // Load data on mount
  useEffect(() => {
    fetch('/api/campuses')
      .then(res => res.json())
      .then(setCampuses)
      .catch(err => console.error('Failed to fetch campuses', err));

    fetch('/api/students')
      .then(res => res.json())
      .then(setStudents)
      .catch(err => console.error('Failed to fetch students', err));
  }, []);

  const showModal = (content, action = null) => setModal({ show: true, content, action });
  const closeModal = () => setModal({ show: false, content: '', action: null });
  const confirmModal = () => { modal.action?.(); closeModal(); };

  // Add Campus
  const addCampus = async (name) => {
    try {
      const res = await fetch('/api/campuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const newCampus = await res.json();
      setCampuses([...campuses, newCampus]);
      showModal('Campus added!');
    } catch (err) {
      console.error('Failed to add campus', err);
      showModal('Error adding campus.');
    }
  };

  //  Add Student
  const addStudent = async (name, campusId) => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, campusId }),
      });
      const newStudent = await res.json();
      setStudents([...students, newStudent]);
      showModal('Student added!');
    } catch (err) {
      console.error('Failed to add student', err);
      showModal('Error adding student.');
    }
  };

  //  Delete Campus + its students
  const deleteCampus = useCallback((id) => {
    showModal("Delete this campus and its students?", async () => {
      try {
        // Delete all associated students first
        const associatedStudents = students.filter(s => s.campusId === id);
        await Promise.all(
          associatedStudents.map(s =>
            fetch(`/api/students/${s.id}`, { method: 'DELETE' })
          )
        );

        // Then delete campus
        await fetch(`/api/campuses/${id}`, { method: 'DELETE' });
        setCampuses(campuses.filter(c => c.id !== id));
        setStudents(students.filter(s => s.campusId !== id));
        showModal('Campus and related students deleted!');
      } catch (err) {
        console.error('Error deleting campus and students:', err);
        showModal('Failed to delete campus.');
      }
    });
  }, [students, campuses]);

  //  Delete Student
  const deleteStudent = useCallback((id) => {
    showModal("Delete this student?", async () => {
      try {
        await fetch(`/api/students/${id}`, { method: 'DELETE' });
        setStudents(students.filter(s => s.id !== id));
        showModal('Student deleted!');
      } catch (err) {
        console.error('Error deleting student:', err);
        showModal('Failed to delete student.');
      }
    });
  }, [students]);
}
 export default Home.jsx 