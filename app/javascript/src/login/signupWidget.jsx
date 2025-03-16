// signupWidget.jsx
import React, { useState } from "react";
import { signupUser, loginUser } from "../../utils/api";

const SignupWidget = ({ toggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setError("");

    try {
      const data = await signupUser(formData);
      if (data.user) {
        handleLogin();
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.json?.error || error.message || "Could not sign up.";
      setError(errorMessage);
    }
  };

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setError("");

    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get("redirect_url") || "/";
        window.location = redirect_url;
      }
    } catch (error) {
      setError("Could not log in.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-widget card-container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="link-with-background green btn-signup"
          >
            Sign up
          </button>
        </form>

        <div className="login-prompt">
          <p>
            Already have an account?{" "}
            <button className="link-button" onClick={toggle}>
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupWidget;
