import { Link } from "react-router-dom";

export default function SLink(props) {
  return (
    <div className="clink-content">
      <p className="clink-name">{props.name}</p>

      <Link to={`/subject/${props.id}`} className="clink-button">
        View subject
      </Link>
    </div>
  );
}