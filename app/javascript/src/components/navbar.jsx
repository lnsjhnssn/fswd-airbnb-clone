import React, { useState, useEffect } from "react";
import { handleErrors } from "../../utils/fetchHelper";
import SignoutButton from "../login/signoutButton";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        setAuthenticated(data.authenticated);
      });
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
          // Buttons for authenticated users
          <>
            <li>
              <button
                onClick={() => (window.location.href = "/hosting")}
                className="btn-nav"
              >
                Switch to hosting
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/upcoming-trips")}
                className="btn-nav"
              >
                Upcoming trips
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
