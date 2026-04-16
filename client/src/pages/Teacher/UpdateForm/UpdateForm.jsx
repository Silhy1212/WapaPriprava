import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTeacher, getTeacherById } from "../../../models/Teacher";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [teacher, setTeacher] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getTeacherById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeacher(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const teacher = await updateTeacher(id, formData);
    if (teacher.status === 200) {
      redirectToSuccessPage(teacher.payload._id);
    } else {
      setInfo(teacher.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/teacher/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>teacher not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading teacher...</p>
      </>
    )
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Teacher update form</h1>
  
      <form className="form-card">
        <input
          type="text"
          name="name"
          defaultValue={teacher.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
  
        <input
          type="number"
          name="age"
          defaultValue={teacher.age}
          placeholder="Enter age"
          onChange={handleChange}
        />
  
        <input
          type="number"
          name="weeklyHours"
          defaultValue={teacher.weeklyHours}
          placeholder="Enter weekly hours"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Update teacher</button>
  
        <p className="form-info">{info}</p>
      </form>
  
      <div className="form-links">
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
