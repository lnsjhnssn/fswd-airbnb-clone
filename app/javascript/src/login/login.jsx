// login.jsx
import React from "react";
import Layout from "@src/layout";
import LoginWidget from "./loginWidget";
import SignupWidget from "./signupWidget";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

import "../styles/main.scss";

class Login extends React.Component {
  state = {
    authenticated: false,
    username: "",
    show_login: true,
  };

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
          username: data.username,
        });
      });
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    });
  };

  render() {
    const { authenticated, show_login, username } = this.state;
    if (authenticated) {
      return (
        <Layout>
          <div>
            <p>
              You are already logged in as <b>{username}</b> 🙂
            </p>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div>
          {show_login ? (
            <LoginWidget toggle={this.toggle} />
          ) : (
            <SignupWidget toggle={this.toggle} />
          )}
        </div>
      </Layout>
    );
  }
}

export default Login;
