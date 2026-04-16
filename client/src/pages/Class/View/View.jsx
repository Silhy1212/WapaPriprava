import { Link, useParams, useNavigate } from "react-router-dom";
import { getClassById, deleteClass } from "../../../models/Class";
import { useEffect, useState } from "react";
import "./View.css"

export default function View() {
  const { id } = useParams();
  const [classs, setClass] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClass(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === classs.code) {
      const result = await deleteClass(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong Class name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedclass/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Class not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading Class...</p>
      </>
    )
  }

  return (
    <div className="view-container">
      <h1 className="view-title">Class view</h1>
  
      <div className="view-card">
        <p>Class id: {id}</p>
        <p>Class name: {classs.year}</p>
        <p>Class code: {classs.code}</p>
        <p>Has root: {classs.hasRoot + ""}</p>
        <p>Root number: {classs.rootNumber}</p>
  
        <form className="delete-box">
          <p>Type class code to delete</p>
          <input type="text" onChange={handleChange} />
          <button onClick={handleDelete}>Delete class</button>
          <p>{info}</p>
        </form>
  
        <div className="view-links">
          <Link to={`/updateclass/${id}`}>Update class</Link>
          <Link to={"/"}>Go back</Link>
        </div>
      </div>
    </div>
  );
}
