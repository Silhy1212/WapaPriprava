import { Link } from "react-router-dom";
import ClassLink from "./CLink";
import { useState, useEffect } from "react";
import { getAllClasses } from "../../../models/Class";
import "./List.css"
export default function List() {
  const [classes, setClass] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllClasses();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClass(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Classes not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Classes are loading</p>
      </>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Class List</h1>
  
      <div className="list-grid">
        {classes.map((classs, index) => (
          <div className="list-card" key={index}>
            <ClassLink name={classs.name} id={classs._id} />
          </div>
        ))}
      </div>
  
      <Link to={"/"} className="back-link">
        Go back
      </Link>
    </div>
  );
}
