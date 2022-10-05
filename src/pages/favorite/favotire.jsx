import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Product from "../../components/products/product";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../components/loader/loader";

import "./favorite.css";
import { FavoriteBorderOutlined } from "@material-ui/icons";

function Favotire() {
  const currentUser = Cookies.get("SLF_id");
  const [favouriteProduct, setFavouriteProduct] = useState(null);

  useEffect(() => {
    const fetchFavProducts = async () => {
      const res = await axios.get(`/project/stared/${currentUser}`);
      setFavouriteProduct(res.data);
    };
    fetchFavProducts();
  }, [currentUser]);

  return (
    <>
      <Header />
      <ItemsNav />

      {favouriteProduct ? (
        <div className="favoriteContainer">
          <div className="favoriteTite">
            <FavoriteBorderOutlined
              style={{ color: "red", fontSize: "30px" }}
            />{" "}
            My List
          </div>
          <div className="titleHr">
            <div className="idivitualTitle">
              Content ({favouriteProduct.length})
            </div>
          </div>

          {favouriteProduct.length === 0 ? (
            <div className="noFavorite">
              <div className="noFavoriteContain">No item yet</div>
              <br />
              <div className="noFavoriteMore">More</div>
            </div>
          ) : (
            <div className="favoriteItems">
              {favouriteProduct.map((item) => (
                <Product
                  key={item._id}
                  productId={item._id}
                  product={item}
                />
              ))}
            </div>
          )}
          <br />
          <hr />
          <br />
          <br />
          <div className="recomendedTitle">You may also like</div>
          <div className="favoriteRecomended">
            {/* <Product/>
                <Product/>
                <Product/> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default Favotire;
