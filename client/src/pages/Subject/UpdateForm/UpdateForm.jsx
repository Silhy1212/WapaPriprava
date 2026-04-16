import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateSubject, getSubjectById } from "../../../models/Subject";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [subject, setSubject] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubject(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const subject = await updateSubject(id, formData);
    if (subject.status === 200) {
      redirectToSuccessPage(subject.payload._id);
    } else {
      setInfo(subject.msg);
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
    return navigate(`/subject/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>subject not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading subject...</p>
      </>
    )
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Subject update form</h1>
  
      <form className="form-card">
        <input
          type="text"
          name="name"
          defaultValue={subject.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
  
        <input
          type="text"
          name="code"
          defaultValue={subject.code}
          placeholder="Enter code"
          onChange={handleChange}
        />
  
        <input
          type="number"
          name="year"
          defaultValue={subject.year}
          placeholder="Enter year"
          onChange={handleChange}
        />
  
        <input
          type="number"
          name="weeklyHours"
          defaultValue={subject.weeklyHours}
          placeholder="Enter weekly hours"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Update subject</button>
  
        <p className="form-info">{info}</p>
      </form>
  
      <div className="form-links">
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
