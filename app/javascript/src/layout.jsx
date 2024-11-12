import React from "react";
import "./styles/main.scss";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div className="app-layout">
        <nav className="navbar">
          <a className="navbar-brand" href="/">
            BearnB
          </a>
          <ul className="nav-links">
            <li>
              <a href="/add-property">
                <button className="btn-host">Become a host</button>
              </a>
            </li>
          </ul>
        </nav>
        {props.children}
        <footer className="footer">
          <p>Airbnb Clone</p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Layout;
