// signupWidget.jsx
import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";
import "../styles/main.scss";

class SignupWidget extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ error: "" });

    fetch(
      "/api/users",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.user) {
          this.login();
        }
      })
      .catch((error) => {
        this.setState({
          error: "Could not sign up.",
        });
      });
  };

  login = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ error: "" });

    fetch(
      "/api/sessions",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get("redirect_url") || "/";
          window.location = redirect_url;
        }
      })
      .catch((error) => {
        this.setState({
          error: "Could not log in.",
        });
      });
  };

  render() {
    const { email, password, username, error } = this.state;

    return (
      <div className="signup-container">
        <div className="signup-widget">
          <h2>Sign Up</h2>

          <form onSubmit={this.signup}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign up</button>
          </form>

          <div className="login-prompt">
            <p>
              Already have an account?{" "}
              <button className="link-button" onClick={this.props.toggle}>
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupWidget;
