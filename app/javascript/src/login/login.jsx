// login.jsx
import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import LoginWidget from "./loginWidget";
import SignupWidget from "./signupWidget";
import { checkAuthStatus } from "../../utils/api";
import "../styles/main.scss";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("show") === "signup") {
      setShowLogin(false);
    }

    const checkAuth = async () => {
      try {
        const data = await checkAuthStatus();
        setAuthenticated(data.authenticated);
        setUsername(data.username);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []); // Empty dependency array means this runs once on mount

  const toggle = () => {
    setShowLogin(!showLogin);
  };

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
        {showLogin ? (
          <LoginWidget toggle={toggle} />
        ) : (
          <SignupWidget toggle={toggle} />
        )}
      </div>
    </Layout>
  );
};

export default Login;
