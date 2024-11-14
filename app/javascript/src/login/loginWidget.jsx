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
      <div className="login-widget">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log in</button>
        </form>

        <div className="signup-prompt">
          <p>
            Don't have an account? <button onClick={toggle}>Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWidget;
