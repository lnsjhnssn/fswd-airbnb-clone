import React from "react";
import ReactDOM from "react-dom";
import Hosting from "./hosting";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Hosting />,
    document.body.appendChild(document.createElement("div"))
  );
});
