// loginWidget.jsx
import React, { useState } from "react";
import { loginUser } from "../../utils/api";

const LoginWidget = ({ toggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setError("");

    try {
      const data = await loginUser(formData);
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
    <div className="login-container">
      <div className="login-widget card-container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div>
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
              className="link-with-background green btn-login"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="signup-prompt">
          <p>
            Don't have an account?{" "}
            <button className="link-button" onClick={toggle}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWidget;
