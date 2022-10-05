import React, { useEffect, useState } from "react";
// import Landingheader from "../../components/landingheader/landingheader";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Product from "../../components/products/product";
import Poster from "../../components/poster/poster";
import SlidePresentation from "../../components/slidePresentation/slidePresentation";
import Footer from "../../components/footer/footer";
import "./home.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";

function Home() {
  const userId = Cookies.get("SLF_id");

  const [user, setUser] = useState(null);
  const [catMaketing, setcatMaketing] = useState(null);
  const [catProTech, setcatProTech] = useState(null);
  const [catDesign, setcatDesign] = useState(null);
  const navigate = useNavigate();

  const navigatePostRequest = () => {
    navigate("/post_request");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/${userId}`);
      const Maketingres = await axios.get(`/project/in/marketing`);
      const ProTechres = await axios.get(`/project/in/programing`);
      const Designres = await axios.get(`/project/in/design`);
      console.log(res.data);
      setUser(res.data);
      setcatMaketing(Maketingres.data);
      setcatProTech(ProTechres.data);
      setcatDesign(Designres.data);
    };
    fetchUser();
  }, [userId]);

  const scroolLeft = () => {
    let left = document.querySelector(".topServicessubItems");
    left.scrollBy(-left.offsetWidth + 10, 0);
    console.log("clicked l");
  };

  const scroolRight = () => {
    let right = document.querySelector(".topServicessubItems");
    right.scrollBy(right.offsetWidth - 10, 0);
    console.log("clicked R");
  };

  const scroolLeft1 = () => {
    let left = document.querySelector(".topServicessubItems1");
    left.scrollBy(-left.offsetWidth + 10, 0);
    console.log("clicked l");
  };

  const scroolRight1 = () => {
    let right = document.querySelector(".topServicessubItems1");
    right.scrollBy(right.offsetWidth - 10, 0);
    console.log("clicked R");
  };

  const scroolLeft2 = () => {
    let left = document.querySelector(".topServicessubItems2");
    left.scrollBy(-left.offsetWidth + 10, 0);
    console.log("clicked l");
  };

  const scroolRight2 = () => {
    let right = document.querySelector(".topServicessubItems2");
    right.scrollBy(right.offsetWidth - 10, 0);
    console.log("clicked R");
  };

  return (
    <>
      <Header />
      <ItemsNav />
      {user ? (
        <>
          <div className="homeTopPageContainer">
            <div className="homeTopPageWelcome">
              Hello, {user ? user.firstName : "User_Name"}
            </div>
            <div className="homeTopPageBody">
              discover evry thing you need for your company or as an Individual
            </div>
            <div className="homeTopPagePost" onClick={navigatePostRequest}>
              Post a Request
            </div>
          </div>
          <div className="howThisWork">
            How does signing light freelance works?
          </div>
          <div className="topServices">
            <div className="topServicesTitle">Top Services</div>
            <hr />
            <div className="topServicessub">
              <div className="topServicessubTitle">Design</div>
              <div
                id="scroolLeft"
                className="directionIcon"
                onClick={scroolLeft}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                id="scroolRight"
                className="directionIcon"
                onClick={scroolRight}
              >
                <ChevronRightIcon />
              </div>
              <div className="topServicessubItems">
                {catDesign &&
                  catDesign.map((item) => (
                    item.userId !== userId &&
                    <Product key={item._id} productId={item._id} product={item} HL={true} />
                  ))}
              </div>
            </div>

            <div className="topServicessub" style={{ marginTop: "20px" }}>
              <div className="topServicessubTitle">
                Programming and technololgy
              </div>
              <div
                id="scroolLeft"
                className="directionIcon"
                onClick={scroolLeft1}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                id="scroolRight"
                className="directionIcon"
                onClick={scroolRight1}
              >
                <ChevronRightIcon />
              </div>
              <div className="topServicessubItems1">
                {catProTech &&
                  catProTech.map((item) => (
                    item.userId !== userId &&
                    <Product key={item._id} productId={item._id} product={item} HL={true} />
                  ))}
              </div>
            </div>

            <div className="topServicessub" style={{ marginTop: "20px" }}>
              <div className="topServicessubTitle">Marketing</div>
              <div
                id="scroolLeft"
                className="directionIcon"
                onClick={scroolLeft2}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                id="scroolRight"
                className="directionIcon"
                onClick={scroolRight2}
              >
                <ChevronRightIcon />
              </div>
              <div className="topServicessubItems2">
                {catMaketing &&
                  catMaketing.map((item) => (
                    item.userId !== userId &&
                    <Product key={item._id} productId={item._id} product={item} HL={true} />
                  ))}
              </div>
            </div>
          </div>
          <div className="topServices">
            {/* <div className="topServicesTitle verifiedServicesContainerResponsive">
              Verified and Certified Services
            </div>
            <hr className="verifiedServicesContainerResponsive" />
            <div className="verifiedServicesContainer verifiedServicesContainerResponsive">
              <div className="verifiedServicesContainerTitle">
                Marketing | Programming/Technology | Design
              </div>
              <div className="verifiedServicesContainerProduct">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
              </div>
              <div className="verifiedServicesContainerMore">
                More <ChevronRightIcon />
              </div>
            </div> */}
            <SlidePresentation />
            <Poster home={true} />
          </div>
        </>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default Home;
