import React from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../logo/logo.png";
import "./landingheader.css";
import Cookies from "js-cookie"

function Landingheader() {

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <div className="clickLogo">
          <img src={logo} alt="" className="headerLogo" />
        </div>
      </div>
      <div className="headerRight">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div className="LoginTexte">Login</div>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="btn btn-warning" id="headerRegister">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingheader;
