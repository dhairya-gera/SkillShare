import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../skill-share-logo.png";

export default function Navbar({
  credits,
  onOpenModal,
  onLogout,
}) {
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            How it works
          </NavLink>

          <NavLink
            to="/credits"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Credits
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
