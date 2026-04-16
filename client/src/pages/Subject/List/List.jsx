import { Link } from "react-router-dom";
import SubjectLink from "./SLink";
import { useState, useEffect } from "react";
import { getAllSubjects } from "../../../models/Subject";

export default function List() {
  const [subjects, setSubjects] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllSubjects();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubjects(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>CSubjects not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Subjects are loading</p>
      </>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Subject List</h1>
  
      <div className="list-grid">
        {subjects.map((subject, index) => (
          <div className="list-card" key={index}>
            <SubjectLink name={subject.name} id={subject._id} />
          </div>
        ))}
      </div>
  
      <Link to={"/"} className="back-link">
        Go back
      </Link>
    </div>
  );
}
