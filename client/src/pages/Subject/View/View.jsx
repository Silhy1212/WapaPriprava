import { Link, useParams, useNavigate } from "react-router-dom";
import { getSubjectById, deleteSubject } from "../../../models/Subject";
import { useEffect, useState } from "react";
import "./View.css"

export default function SubjectView() {
  const { id } = useParams();
  const [subject, setSubject] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubject(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === subject.name) {
      const result = await deleteSubject(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong Subject name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedsubject/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Subject not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading Subject...</p>
      </>
    )
  }

  return (
    <div className="view-container">
      <h1 className="view-title">Subject view</h1>
  
      <div className="view-card">
        <p>Subject id: {id}</p>
        <p>Subject name: {subject.name}</p>
        <p>Subject code: {subject.code}</p>
        <p>Subject year: {subject.year}</p>
        <p>Weekly hours: {subject.weeklyHours}</p>
  
        <form className="delete-box">
          <p>Type subject name to delete</p>
  
          <input
            type="text"
            placeholder={subject.name}
            onChange={handleChange}
          />
  
          <button onClick={handleDelete}>
            Delete subject
          </button>
  
          <p>{info}</p>
        </form>
  
        <div className="view-links">
          <Link to={`/updatesubject/${id}`}>Update subject</Link>
          <Link to={"/"} className="back-link">Go back</Link>
        </div>
      </div>
    </div>
  );
}
