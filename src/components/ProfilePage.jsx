import { NavLink, Outlet } from "react-router-dom";

export default function ProfilePage({ user }) {
  const tabClass = ({ isActive }) => `sub-link ${isActive ? "active" : ""}`;

  return (
    <div>
      <section className="banner profile-head">
        <div className="icon big">{user.name.charAt(0)}</div>
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </section>
      <nav className="sub-nav">
        <NavLink to="/profile" end className={tabClass}>
          Overview
        </NavLink>
        <NavLink to="my-posts" className={tabClass}>
          My Posts
        </NavLink>
        <NavLink to="connections" className={tabClass}>
          Connections
        </NavLink>
        <NavLink to="saved" className={tabClass}>
          Saved
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
