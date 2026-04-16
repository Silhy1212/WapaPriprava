import { Link } from "react-router-dom";
import TeacherLink from "./TLink";
import { useState, useEffect } from "react";
import { getAllTeachers } from "../../../models/Teacher";

export default function TeacherList() {
  const [teachers, setTeachers] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllTeachers();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeachers(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Teachers not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Teachers are loading</p>
      </>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Teacher List</h1>
  
      <div className="list-grid">
        {teachers.map((teacher, index) => (
          <div className="list-card" key={index}>
            <TeacherLink name={teacher.name} id={teacher._id} />
          </div>
        ))}
      </div>
  
      <Link to={"/"} className="back-link">
        Go back
      </Link>
    </div>
  );
}
