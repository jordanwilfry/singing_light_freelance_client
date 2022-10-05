import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import CategoryItem from "../../components/categoryItem/categoryItem";

import "./caterory.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/loader";

function Category() {
  const navigate = useNavigate();

  const [categorie, setCategorie] = useState(null);
  const Cat = useParams().category;
  let cate = "Undefined";
  console.log(Cat);

  useEffect(() => {
    const fetchCategorie = async () => {
      const res = await axios.get(`/project/AllCat/${Cat}`);
      console.log(res.data);
      setCategorie(res.data);
    };
    fetchCategorie();
  }, [Cat]);

  if (String(Cat).includes("programing")) {
    cate = "Programming and Technology";
  } else if (String(Cat).includes("design")) {
    cate = "Design and Graphic";
  } else if (String(Cat).includes("marketing")) {
    cate = "Marketing";
  } else {
    navigate("udefined");
  }

  return (
    <>
      <Header />
      <ItemsNav />
      {categorie ? (
        <div className="categoryContainer">
          <div className="categoryContainerTop">
            <div className="categoryContainerTopTitle">
              {categorie ? `Category ~ ${cate}` : "undefined"}
            </div>
            <div className="categoryContainerTopContainer">{cate}</div>
          </div>
          <div className="categoryContainerMidle">
            <div className="categoryContainerMidleNav">
              <div className="categoryContainerMidleNavTitle">
                <Link
                  to="/category/design"
                  style={{
                    textDecoration: "none",
                    color: `${
                      String(Cat).includes("design") ? "orange" : "black"
                    }`,
                  }}
                >
                  Graphic and design
                </Link>
              </div>
              <div className="categoryContainerMidleNavSub">
                <span>html</span>
                <br />
                <span>javaScript</span> <br />
                <span>javaScript</span> <br />
              </div>
              <br />

              <div className="categoryContainerMidleNavTitle">
                <Link
                  to="/category/programing"
                  style={{
                    textDecoration: "none",
                    color: `${
                      String(Cat).includes("programing") ? "orange" : "black"
                    }`,
                  }}
                >
                  Technology and programming
                </Link>
              </div>
              <div className="categoryContainerMidleNavSub">
                <span>html</span>
                <br />
                <span>javaScript</span> <br />
                <span>javaScript</span> <br />
              </div>
              <br />

              <div className="categoryContainerMidleNavTitle">
                <Link
                  to="/category/marketing"
                  style={{
                    textDecoration: "none",
                    color: `${
                      String(Cat).includes("marketing") ? "orange" : "black"
                    }`,
                  }}
                >
                  Marketing
                </Link>
              </div>
              <div className="categoryContainerMidleNavSub">
                <span>html</span>
                <br />
                <span>javaScript</span> <br />
                <span>javaScript</span> <br />
              </div>
            </div>
            <br />

            <div className="categoryContainerMidleContainer">
              {categorie &&
                categorie.map((item) => (
                  <CategoryItem key={item._id} category={item} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default Category;
