import { useState } from "react";

export default function Login({
  logoImg,
  fullName,
  setFullName,
  email,
  setEmail,
  handleAuth,
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function changeTab(loginTab) {
    setIsLogin(loginTab);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.toLowerCase().endsWith("@mail.edu.in")) {
      setError("Please enter a valid @mail.edu.in email ID.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!isLogin) {
      alert("Account created successfully! Please log in.");
      changeTab(true);
      setPassword("");
      return;
    }

    setError("");
    handleAuth();
  }

  return (
    <div className="app login-page">
      <div className="box">
        <img src={logoImg} alt="Skill Share logo" className="big-logo" />
        <p className="subtext">Connect, Learn, and Grow together.</p>

        <div className="tabs">
          <button
            className={isLogin ? "tab active" : "tab"}
            onClick={() => changeTab(true)}
          >
            Log In
          </button>
          <button
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => changeTab(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-box">
            <label>College Email</label>
            <input
              type="email"
              placeholder="student@mail.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">
            {isLogin ? "Access Dashboard" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
