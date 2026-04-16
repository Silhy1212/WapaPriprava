import { Link } from "react-router-dom"
import "./List.css"
export default function CLink(props) {

    return (
        <div className="clink-content">
          <p className="clink-name">Name: {props.name}</p>
    
          <Link to={`/class/${props.id}`} className="clink-button">
            View class
          </Link>
        </div>
      );
}