import React, { useState } from "react";
import "./LoginBox.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useUser } from "../context/UserContext";

const LoginBox = () => {
  // checks if user is logged in before accessing this page
  const { user, loading } = useUser();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login-container">
      <p className="login-title">AS-MART</p>
      <p className="login-subtitle">Welcome Back</p>
      <p className="login-description">Sign in to continue to your account</p>

      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link className="link" to="/auth/register">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginBox;
