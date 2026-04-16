import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClass } from "../../../models/Class";
import "./CreateForm.css"
export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const classs = await createClass(formData);
    if (classs.status === 201) {
      redirectToSuccessPage(classs.payload._id);
    } else {
      setInfo(classs.msg);
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
    return navigate(`/createdclass/${id}`);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create Class</h1>
  
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Go back</button>
        <button onClick={() => navigate('/classes')}>See list</button>
      </div>
  
      <form className="form-card">
        <input
          type="number"
          required
          name="year"
          placeholder="Enter year"
          onChange={handleChange}
        />
  
        <input
          type="text"
          required
          name="code"
          placeholder="Enter code"
          onChange={handleChange}
        />
  
        {/* checkbox trochu upravíme vizuálně */}
        <label style={{ display: "flex", alignItems: "center", marginBottom: "15px", gap: "10px" }}>
          <input
            type="checkbox"
            name="hasRoot"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }
          />
          Has root?
        </label>
  
        <input
          type="number"
          name="rootNumber"
          placeholder="Enter number"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Create class</button>
  
        <p className="info">{info}</p>
      </form>
    </div>
  );
}
