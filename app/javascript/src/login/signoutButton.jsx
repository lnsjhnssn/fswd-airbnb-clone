import React from "react";
import { logoutUser } from "../../utils/api";

class SignoutButton extends React.Component {
  logout = (e) => {
    if (e) {
      e.preventDefault();
    }

    logoutUser()
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
