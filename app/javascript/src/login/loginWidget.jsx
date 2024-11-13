// loginWidget.jsx
import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";
import "../styles/main.scss";

class LoginWidget extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
    const { email, password, error } = this.state;

    return (
      <div className="login-container">
        <div className="login-widget">
          <h2>Log In</h2>

          <form onSubmit={this.login}>
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
            <button type="submit">Log in</button>
          </form>

          <div className="signup-prompt">
            <p>
              Don't have an account?{" "}
              <button className="link-button" onClick={this.props.toggle}>
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginWidget;
