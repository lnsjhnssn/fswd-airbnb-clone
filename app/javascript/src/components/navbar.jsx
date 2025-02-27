import React, { useState, useEffect } from "react";
import { checkAuth } from "../../utils/api";
import SignoutButton from "../login/signoutButton";

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
      <button
        className="navbar-brand"
        onClick={() => (window.location.href = "/")}
      >
        Airbnb
      </button>
      <ul className="nav-links">
        {authenticated ? (
          <>
            <li>
              <button
                onClick={() => (window.location.href = "/hosting")}
                className="btn-nav"
              >
                My Properties
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/trips")}
                className="btn-nav"
              >
                My Trips
              </button>
            </li>
            <li>
              <SignoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={() => (window.location.href = "/become-a-host")}
                className="btn-host"
              >
                Become a host
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/login")}
                className="btn-login"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="btn-signup"
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
