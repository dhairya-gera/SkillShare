import { Link } from "react-router-dom";

export default function NotFoundContent({
  message = "The page you are looking for does not exist.",
}) {
  return (
    <div className="state-box">
      <h1 className="nf-code">404</h1>
      <p>{message}</p>
      <Link to="/" className="btn nf-btn">
        Back to Home
      </Link>
    </div>
  );
}
