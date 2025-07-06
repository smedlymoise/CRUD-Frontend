import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"; 
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [campuses, setCampuses] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const campusRes = await axios.get("http://localhost:8080/api/campuses");
                const studentRes = await axios.get("http://localhost:8080/api/students");
                setCampuses(campusRes.data.slice(0, 3));
                setStudents(studentRes.data.slice(0, 3)); 
            }catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <section className="preview-section">
                <h2>Featured Campuses</h2>
                <div className="preview-list">
                    {campuses.map((campus) => (
                        <div
                            className="preview-card"
                            key={campus.id}
                            onClick={() => navigate(`/campuses/${campus.id}`)}
                        >
                            <h3>{campus.name}</h3>
                            <p>{campus.address}</p>
                        </div>
                    ))}
                </div>
                <button className="view-button" onClick={() => navigate("/campuses")}>
                    View All Campuses
                </button>
            </section>

            <section className="preview-section">
                <h2>Featured Students</h2>
                <div className="preview-list">
                    {students.map((student) => (
                        <div
                            className="preview-card"
                            key={student.id}
                            // onClick to navigate to single student details
                            onClick={() => navigate(`/students/${student.id}`)}
                        >
                            <h3>{student.firstName} {student.lastName}</h3>
                            <p>{student.email}</p>
                        </div>
                    ))}
                </div>
                <button className="view-button" onClick={() => navigate("/students")}>
                    View All Students
                </button>
            </section>
        </div>
    );
};

export default Home;