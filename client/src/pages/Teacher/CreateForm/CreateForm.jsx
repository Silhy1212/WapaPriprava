import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTeacher } from "../../../models/Teacher";
import "./CreateForm.css"
export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const teacher = await createTeacher(formData);
    if (teacher.status === 201) {
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
    return navigate(`/createdteacher/${id}`);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create Teacher</h1>
  
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Go back</button>
        <button onClick={() => navigate('/teachers')}>See list</button>
      </div>
  
      <form className="form-card">
        <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />
  
        <input
          type="number"
          required
          name="age"
          placeholder="Enter age"
          onChange={handleChange}
        />
  
        <input
          type="number"
          required
          name="weeklyHours"
          placeholder="Enter weekly hours"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Create teacher</button>
  
        <p className="info">{info}</p>
      </form>
    </div>
  );
}
