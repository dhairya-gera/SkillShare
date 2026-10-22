import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../skill-share-logo.png";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

export default function Navbar({ credits, onOpenModal, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="logo-box">
          <img src={logoImg} alt="Skill Share logo" className="nav-logo" />
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
          <NavLink to="/how-it-works" className={linkClass}>
            How it works
          </NavLink>
        </nav>
      </div>
      <div className="nav-btns">
        <span className="badge">💰 {credits} Credits</span>
        <button className="btn-border" onClick={onOpenModal}>
          + Post a Request
        </button>
        <button className="btn-red" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}