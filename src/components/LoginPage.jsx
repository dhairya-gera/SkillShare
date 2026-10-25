import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../skill-share-logo.png";
import Footer from "./Footer";

const emptySignup = { name: "", email: "", password: "", confirm: "" };

function validateLogin(values) {
  const errors = {};
  const email = values.email.trim().toLowerCase();

  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.endsWith("@mail.edu.in")) {
    errors.email = "Please use your @mail.edu.in college email.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

function validateSignup(values) {
  const errors = validateLogin(values);
  const name = values.name.trim();

  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 3) {
    errors.name = "Full name is too short.";
  }

  if (values.confirm !== values.password) {
    errors.confirm = "Passwords do not match.";
  }

  return errors;
}

export default function LoginPage({ onLogin, onSignup }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState(emptySignup);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = isLogin ? validateLogin(values) : validateSignup(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!isLogin) {
      const result = onSignup(
        values.name.trim(),
        values.email.trim().toLowerCase(),
        values.password,
      );
      if (!result.ok) {
        setErrors({ form: result.error });
        return;
      }
      alert("Account created successfully! Please log in.");
      setIsLogin(true);
      setValues({ ...emptySignup, email: values.email });
      return;
    }

    const email = values.email.trim().toLowerCase();
    const result = onLogin(email, values.password);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    navigate("/");
  }

  return (
    <div className="app login-page">
      <div className="login-content">
        <div className="box">
          <img src={logoImg} alt="Skill Share logo" className="big-logo" />
          <p className="subtext">Connect, Learn, and Grow together.</p>
          <div className="tabs">
            <button
              className={`tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          {errors.form && <p className="error">{errors.form}</p>}
          <form onSubmit={handleSubmit} className="form" noValidate>
            {!isLogin && (
              <div className="input-box">
                <label>Full Name</label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            )}
            <div className="input-box">
              <label>College Email</label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="student@mail.edu.in"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-box">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {!isLogin && (
              <div className="input-box">
                <label>Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  value={values.confirm}
                  onChange={handleChange}
                  placeholder="Enter your password again"
                />
                {errors.confirm && <p className="error">{errors.confirm}</p>}
              </div>
            )}
            <button type="submit" className="btn">
              {isLogin ? "Access Dashboard" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
