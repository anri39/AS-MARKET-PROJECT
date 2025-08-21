import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/registerSchema";
import type { RegisterFormData } from "../validation/registerSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./RegisterBox.css";

const RegisterBox: React.FC = () => {
  const { user, loading } = useUser();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.username,
      });

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        username: data.username,
        email: data.email,
        role: "user",
      });

      reset();
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("email", { type: "server", message: "Email already in use" });
      } else if (err.code === "auth/weak-password") {
        setError("password", {
          type: "server",
          message: "Password is too weak",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <p className="register-title">AS-MART</p>
      <p className="create-account">Create Account</p>
      <p className="create-description">Sign up to get started with AS-MART</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username")}
            className={errors.username ? "error" : ""}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className={errors.email ? "error" : ""}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={errors.password ? "error" : ""}
              placeholder="Create a password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "error" : ""}
              placeholder="Confirm your password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="checkbox-field">
          <label className="checkbox-label" htmlFor="acceptTerms">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              id="acceptTerms"
            />
            <span>I agree to the Terms Of Service and Privacy Policy</span>
          </label>
          {errors.acceptTerms && (
            <p className="error-text">{errors.acceptTerms.message}</p>
          )}
        </div>
        <button type="submit" className="register-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
        <p className="signin-text">
          Already have an account?{" "}
          <Link className="link" to="/auth/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterBox;
