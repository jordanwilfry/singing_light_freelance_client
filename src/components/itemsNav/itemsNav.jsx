import React from "react";
import { Link } from "react-router-dom";
import "./itemsNav.css";
function ItemsNav() {
  return (
    <div className="itemsNavContainer">
      <div className="itemsNavItems">
        <Link to="/category/design" style={{ textDecoration: "none", color: "black" }}>
          Graphic & Design
        </Link>
      </div>
      <div className="itemsNavItems">
        <Link to="/category/programing" style={{ textDecoration: "none", color: "black" }}>
          Programming & Technology
        </Link>
      </div>
      <div className="itemsNavItems">
        <Link to="/category/marketing" style={{ textDecoration: "none", color: "black" }}>
          Marketing
        </Link>
      </div>
    </div>
  );
}

export default ItemsNav;
