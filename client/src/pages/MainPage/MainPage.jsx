import "./MainPage.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Školní systém</h1>

      <div className="grid">
        <div className="card" onClick={() => navigate("/createteacher")}>
          <h2>Učitelé</h2>
          <p>Správa učitelů</p>
        </div>

        <div className="card" onClick={() => navigate("/createstudent")}>
          <h2>Žáci</h2>
          <p>Správa žáků</p>
        </div>

        <div className="card" onClick={() => navigate("/createsubject")}>
          <h2>Předměty</h2>
          <p>Správa předmětů</p>
        </div>

        <div className="card" onClick={() => navigate("/createclass")}>
          <h2>Třídy</h2>
          <p>Správa tříd</p>
        </div>
      </div>
    </div>
  );
}