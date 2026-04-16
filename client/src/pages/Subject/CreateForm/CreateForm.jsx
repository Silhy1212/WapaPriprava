import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSubject } from "../../../models/Subject";

export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const student = await createSubject(formData);
    if (student.status === 201) {
      redirectToSuccessPage(student.payload._id);
    } else {
      setInfo(student.msg);
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
    return navigate(`/createdstudent/${id}`);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create Subject</h1>
  
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Go back</button>
        <button onClick={() => navigate('/subjects')}>See list</button>
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
          type="text"
          required
          name="code"
          placeholder="Enter subject code"
          onChange={handleChange}
        />
  
        <input
          type="number"
          required
          name="year"
          placeholder="Enter year"
          onChange={handleChange}
        />
  
        <input
          type="number"
          required
          name="weeklyHours"
          placeholder="Enter weekly hours"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Create Subject</button>
  
        <p className="info">{info}</p>
      </form>
    </div>
  );
}
