import React from "react";
import { Link } from "react-router-dom";
import "./categoryItem.css";

function categoryItem( {category} ) {
  return (
    <div
      className="mainCategoryItemContainer"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      <Link to={`/subCategory/${category.subCategorie}`} style={{ textDecoration: "none" }}>
        <div className="categoryItemContainer">
          <div className="categoryItemContainerText">{`${category.subCategorie}`}</div>
        </div>
      </Link>
    </div>
  );
}

export default categoryItem;
