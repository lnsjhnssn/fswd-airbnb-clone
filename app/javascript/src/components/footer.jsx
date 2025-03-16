import React from "react";
import SignoutButton from "../login/signoutButton";

const Footer = () => {
  return (
    <footer>
      <small>
        <p>Farmbnb</p>
        <p>Made by Linus Johansson 2025</p>
        <ul>
          <li>
            <a href="">Email</a>
          </li>
          <li>
            <a href="">GitHub</a>
          </li>
          <li>
            <a href="">Website</a>
          </li>
        </ul>
        <p>
          As part of{" "}
          <a href="https://www.altcademy.com/programs/fswd">
            Altcademy Full-stack Program
          </a>
        </p>
        <SignoutButton />
      </small>
    </footer>
  );
};

export default Footer;
