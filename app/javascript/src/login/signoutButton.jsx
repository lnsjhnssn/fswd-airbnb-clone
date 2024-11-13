import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class SignoutButton extends React.Component {
  logout = (e) => {
    if (e) {
      e.preventDefault();
    }

    fetch(
      "/api/sessions/destroy",
      safeCredentials({
        method: "DELETE",
      })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success) {
          window.location = "/";
        }
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  render() {
    return (
      <button onClick={this.logout} className="btn btn-danger">
        Logout
      </button>
    );
  }
}

export default SignoutButton;
