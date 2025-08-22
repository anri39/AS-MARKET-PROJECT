import { useState } from "react";
import "./LoginBox.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import type { LoginFormData } from "../validation/loginSchema";

const LoginBox = () => {
  const { user, loading } = useUser();
  if (loading) return <div className="spinner"></div>;
  if (user) return <Navigate to="/" replace />;

  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setFirebaseError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err: any) {
      let message = "Something went wrong. Please try again.";
      switch (err.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          message =
            "Too many failed attempts. Please wait and try again later.";
          break;
        default:
          message = "Invalid email or password.";
      }
      setFirebaseError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <p className="login-title">AS-MART</p>
      <p className="login-subtitle">Welcome Back</p>
      <p className="login-description">Sign in to continue to your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password")}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {firebaseError && (
          <p style={{ color: "red", marginTop: "10px" }}>{firebaseError}</p>
        )}

        <button type="submit" className="login-btn" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner"></span> : "Login"}
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
