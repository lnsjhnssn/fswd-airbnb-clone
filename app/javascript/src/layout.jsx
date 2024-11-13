import React from "react";
import "./styles/main.scss";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div className="app-layout">
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
