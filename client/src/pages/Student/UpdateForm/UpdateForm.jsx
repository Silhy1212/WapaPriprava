import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateStudent, getStudentById } from "../../../models/Student";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [student, setStudent] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getStudentById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudent(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const student = await updateStudent(id, formData);
    if (student.status === 200) {
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
    return navigate(`/student/${id}`);
  };

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
    <div className="form-container">
      <h1 className="form-title">Student update form</h1>
  
      <form className="form-card">
        <input
          type="text"
          name="name"
          defaultValue={student.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
  
        <input
          type="number"
          name="age"
          defaultValue={student.age}
          placeholder="Enter age"
          onChange={handleChange}
        />
  
        <input
          type="text"
          name="grade"
          defaultValue={student.grade}
          placeholder="Enter grade"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Update student</button>
  
        <p className="form-info">{info}</p>
      </form>
  
      <div className="form-links">
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
