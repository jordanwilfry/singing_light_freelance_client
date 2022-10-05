import { Link } from "react-router-dom";
import { Avatar, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";

import "./product.css";
import { Star } from "@material-ui/icons";
import axios from "axios";
import Cookies from "js-cookie"

function Product({ HL, product, productId }) {
  const currentUser = Cookies.get("SLF_id")
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false)

    useEffect(()=>{
        if (product.star.includes(currentUser)){
          setIsLiked(true)
        }
    }, [currentUser])
  
  console.log(product);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/${product.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [product.userId]);

  const HandleStar = () =>{
    try{
        axios.put(`/project/${productId}/star`, {userId:currentUser})
        setIsLiked(!isLiked)
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div className={HL ? "HLProductContainer" : "ProductContainer"}>
      <div style={{ color: "black" }}>
        <Link to={`/product/${productId}`} style={{ textDecoration: "none" }}>
          <div className="productImageDiv">
            <img src={product.image} alt="" className="productImage" />
          </div>
        </Link>
        <div className="allDescriptions">
          <div className="userSmallDescription">
            <Link to={`/profile/${user && user._id}`}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={2}
              color="warning"
              >
              <Avatar
                alt="User Name"
                src={user && user.profilePicture}
                sx={{ width: 35, height: 35 }}
                />
            </Badge>
                </Link>
            <span className="userSmallDescriptionUserName">
              ~{user && user.firstName}
            </span>
          </div>
          <div className="productDescription ">{product.smallDesc}</div>
          <div className="productFooter">
            <span className="productPrice">
              From <b> ${product.price}</b>
            </span>
            <span className="productFavStar">
              {isLiked ?<span
                className="productFav"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="add this on favorite list"
                data-bs-original-title="Tooltip on top"
                onClick={HandleStar}
              >
                <Favorite className="favIcon icon stared" />
              </span>:<span
                className="productFav"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="remove this on favorite list"
                data-bs-original-title="Tooltip on top"
                onClick={HandleStar}
              >
                <FavoriteBorderOutlined className="favIcon icon" />
              </span>}
              <span
                className="productStar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-html="true"
                title="this Gig is cool I recommand it"
                data-bs-original-title="Tooltip on top"
              >
                <Star className="starIcon icon stared" />
                (4)
              </span>
            </span>
          </div>
          <div className="deliverTime">
            deliver in about {product.deliveryTime} day(s)
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
