export default function Navbar({ logoImg, credits, onOpenModal, onLogout }) {
  return (
    <header className="nav">
      <div className="logo-box">
        <img src={logoImg} alt="Skill Share logo" className="nav-logo" />
      </div>
      <div className="nav-btns">
        <span className="badge">💰 {credits} Credits</span>
        <button className="btn-border" onClick={onOpenModal}>
          + Post a Request
        </button>
        <button className="btn-red" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
