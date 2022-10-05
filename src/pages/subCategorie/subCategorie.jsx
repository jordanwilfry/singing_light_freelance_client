import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Product from "../../components/products/product";
import Loader from "../../components/loader/loader";

import ReactPaginate from "react-paginate";

import "./subCategorie.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SubCategorie( ) {
  const userId = Cookies.get("SLF_id");
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [subCategory, setSubCategory] = useState(null)
  const [category, setCategory] = useState(null)

  const subCat = useParams().subCategory
  console.log(subCat)

  useEffect(() => {
    const fetchSubCategory = async () => {
      const res = await axios.get(`/project/in/sub/${subCat}`)
      const res2 = await axios.get(`/project/AllSubCat/${subCat}`);
      console.log(res.data)
      console.log(res2.data)
      setSubCategory(res.data)
      setCategory(res2.data)
    }
    fetchSubCategory()
  }, [subCat])

  useEffect(() => {
    const endOffset = itemOffset + 16;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(subCategory?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(subCategory?.length / 16))
  }, [itemOffset]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 16) % subCategory.length
    console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
    document.querySelector("body").scroll(0, 0)
  }

  

  return (
    <>
      <Header />
      <ItemsNav />
      { subCategory ? subCategory.length === 0 ?

        (
          <div class="alert alert-info " role="alert" style = {{margin : "20vh 20px 10px"}}>
          There is nothing to see here at this moment, Please check later!! 
        </div>
        )

    :
      <div className="subCategoryContainer">
        <div className="subCategoryContainerTop">
          <div className="subCategoryContainerTopTitle">
            Category ~ {category && category[0].categorie} ~ {subCat}
          </div>
          <div className="subCategoryContainerTopContainer">
          {category && category[0].categorie} ~ {subCat}
          </div>
        </div>
        <div className="subCategoryContainerMidle">
          <div className="subCategoryContainerMidleContainer" currentItems = {currentItems}>
            {subCategory?.map((product) => (
              product.userId !== userId &&
              <Product key = {product._id} product = {product} productId = {product._id}/>
            ))} 

          </div>
        </div>
        {subCategory.length > 16 &&
            <ReactPaginate 
              breakLabel = "..."
              nextLabel = "▶"
              onPageChange={handlePageClick}
              pageRangeDisplayed = {1}
              pageCount = {pageCount}
              previousLabel = "◀"
              renderOnZeroPageCount={null}
            />
        }
      </div>
      : <Loader/>
}
      <Footer />
    </>
  );
}

export default SubCategorie;
