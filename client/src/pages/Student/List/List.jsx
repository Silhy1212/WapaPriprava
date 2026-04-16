import { Link } from "react-router-dom";
import StudentLink from "./SLink";
import { useState, useEffect } from "react";
import { getAllStudents } from "../../../models/Student";
import "./List.css"
export default function List() {
  const [students, setStudents] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllStudents();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudents(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Students not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Students are loading</p>
      </>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Student List</h1>
  
      <div className="list-grid">
        {students.map((student, index) => (
          <div className="list-card" key={index}>
            <StudentLink name={student.name} id={student._id} />
          </div>
        ))}
      </div>
  
      <Link to={"/"} className="back-link">
        Go back
      </Link>
    </div>
  );
}
