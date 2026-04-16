import { Link } from "react-router-dom";

export default function TLink(props) {
  return (
    <div className="clink-content">
      <p className="clink-name">{props.name}</p>

      <Link to={`/teacher/${props.id}`} className="clink-button">
        View teacher
      </Link>
    </div>
  );
}