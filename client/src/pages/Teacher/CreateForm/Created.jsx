import { useParams, Link } from "react-router-dom";

export default function Created() {
  const { id } = useParams();

  return (
    <>
      <p>Teacher was created: {id}</p>
      <Link to={`/teacher/${id}`}>
        <p>View Teacher</p>
      </Link>
      <Link to={`/`}>
        <p>Go back</p>
      </Link>
    </>
  );
}
