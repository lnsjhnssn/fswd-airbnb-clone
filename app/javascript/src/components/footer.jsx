import React from "react";
import SignoutButton from "../login/signoutButton";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Airbnb Clone</p>
      <ul>
        <li>
          <SignoutButton />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
