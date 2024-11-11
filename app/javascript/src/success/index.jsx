import React from "react";
import ReactDOM from "react-dom";
import Success from "./success";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Success />,
    document.body.appendChild(document.createElement("div"))
  );
});
