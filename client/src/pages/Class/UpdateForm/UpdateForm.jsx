import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateClass, getClassById } from "../../../models/Class";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [classs, setClass] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClass(data.payload);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const classs = await updateClass(id, formData);
    if (classs.status === 200) {
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
    return navigate(`/class/${id}`);
  };

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
    <div className="form-container">
      <h1 className="form-title">Class update form</h1>
  
      <form className="form-card">
        <input
          type="number"
          name="year"
          defaultValue={classs.year}
          placeholder="Enter year"
          onChange={handleChange}
        />
  
        <input
          type="text"
          name="code"
          defaultValue={classs.code}
          placeholder="Enter code"
          onChange={handleChange}
        />
  
        <input
          type="checkbox"
          name="hasRoot"
          defaultChecked={classs.hasRoot}
          onChange={(e) =>
            setFormData({ ...formData, hasRoot: e.target.checked })
          }
        />
  
        <input
          type="number"
          name="rootNumber"
          defaultValue={classs.rootNumber}
          placeholder="Enter number"
          onChange={handleChange}
        />
  
        <button onClick={handlePost}>Update class</button>
  
        <p className="form-info">{info}</p>
      </form>
  
      <div className="form-links">
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
