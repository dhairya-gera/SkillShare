import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>SkillShare</h3>
        <p>Learn together. Help each other.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <Link to="/credits">Credits</Link>
        <Link to="/how-it-works">How it works</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <p className="footer-copy">© {new Date().getFullYear()} SkillShare</p>
    </footer>
  );
}
