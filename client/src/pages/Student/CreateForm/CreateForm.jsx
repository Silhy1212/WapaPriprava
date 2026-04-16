import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createStudent } from "../../../models/Student";
import "./CreateForm.css"
export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const student = await createStudent(formData);
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
      <h1 className="form-title">Create Student</h1>
  
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Go back</button>
        <button onClick={() => navigate('/students')}>See list</button>
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
          name="grade"
          placeholder="Enter grade"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Create student</button>
  
        <p className="info">{info}</p>
      </form>
    </div>
  );
}
