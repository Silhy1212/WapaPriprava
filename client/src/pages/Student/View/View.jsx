import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentById, deleteStudent } from "../../../models/Student";
import { useEffect, useState } from "react";
import "./View.css"

export default function View() {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getStudentById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudent(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === student.name) {
      const result = await deleteStudent(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong student name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedstudent/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>student not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading student...</p>
      </>
    )
  }

  return (
    <div className="view-container">
      <h1 className="view-title">Student view</h1>
  
      <div className="view-card">
        <p>Student id: {id}</p>
        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>Grade: {student.grade}</p>
  
        <form className="delete-box">
          <p>Type student name to delete</p>
  
          <input
            type="text"
            placeholder={student.name}
            onChange={handleChange}
          />
  
          <button onClick={handleDelete}>
            Delete student
          </button>
  
          <p>{info}</p>
        </form>
  
        <div className="view-links">
          <Link to={`/updatestudent/${id}`}>Update student</Link>
          <Link to={"/"} className="back-link">Go back</Link>
        </div>
      </div>
    </div>
  );
}
