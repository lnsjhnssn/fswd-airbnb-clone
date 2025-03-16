import React, { useState, useEffect } from "react";
import { checkAuth } from "../../utils/api";
import SignoutButton from "../login/signoutButton";
import logo from "../assets/farmbnb.png";
const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await checkAuth();
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <nav className="navbar">
      <h1 className="bnb-logo" onClick={() => (window.location.href = "/")}>
        <img src={logo} alt="bnb-logo" />
      </h1>
      <ul className="nav-links">
        {authenticated ? (
          <>
            <li>
              <a
                onClick={() => (window.location.href = "/hosting")}
                className="link-with-background transparent"
              >
                My Properties
              </a>
            </li>
            <li>
              <a
                onClick={() => (window.location.href = "/trips")}
                className="link-with-background transparent"
              >
                My Trips
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a
                onClick={() => (window.location.href = "/login")}
                className="link-with-background transparent"
              >
                Login
              </a>
            </li>
            <li>
              <a
                onClick={() => (window.location.href = "/login?show=signup")}
                className="link-with-background transparent"
              >
                Sign up
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
