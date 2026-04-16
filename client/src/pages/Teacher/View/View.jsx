import { Link, useParams, useNavigate } from "react-router-dom";
import { getTeacherById, deleteTeacher } from "../../../models/Teacher";
import { useEffect, useState } from "react";
import "./View.css"

export default function View() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getTeacherById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeacher(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === teacher.name) {
      const result = await deleteTeacher(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong Teacher name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedteacher/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Teacher not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading Teacher...</p>
      </>
    )
  }

  return (
    <div className="view-container">
      <h1 className="view-title">Teacher view</h1>
  
      <div className="view-card">
        <p>Teacher id: {id}</p>
        <p>Name: {teacher.name}</p>
        <p>Age: {teacher.age}</p>
        <p>Weekly hours: {teacher.weeklyHours}</p>
  
        <form className="delete-box">
          <p>Type teacher name to delete</p>
  
          <input
            type="text"
            placeholder={teacher.name}
            onChange={handleChange}
          />
  
          <button onClick={handleDelete}>
            Delete teacher
          </button>
  
          <p>{info}</p>
        </form>
  
        <div className="view-links">
          <Link to={`/updateteacher/${id}`}>Update teacher</Link>
          <Link to={"/"} className="back-link">Go back</Link>
        </div>
      </div>
    </div>
  );
}
