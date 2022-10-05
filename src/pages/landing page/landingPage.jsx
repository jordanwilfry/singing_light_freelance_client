import React, {useState, useEffect} from "react";
import Landingheader from "../../components/landingheader/landingheader";
import Product from "../../components/products/product";
import Poster from "../../components/poster/poster";
import SlidePresentation from "../../components/slidePresentation/slidePresentation";
import Footer from "../../components/footer/footer";
import "./landingPage.css";
import { CreateNewFolder, Person, Search } from "@material-ui/icons";
import slide1 from "./image/showcase.jpg";
import slide2 from "./image/dribbble-shot_6.gif";
import slide3 from "./image/apple.jpg";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Cookies from "js-cookie";
import axios from "axios"

function LandingPage() {
  const [catMaketing, setcatMaketing] = useState(null);
  const [catProTech, setcatProTech] = useState(null);
  const [catDesign, setcatDesign] = useState(null);

  useEffect(() => {
    const fetProduct = async () => {
      const Maketingres = await axios.get(`/project/in/marketing`);
      const ProTechres = await axios.get(`/project/in/programing`);
      const Designres = await axios.get(`/project/in/design`);
      setcatMaketing(Maketingres.data);
      setcatProTech(ProTechres.data);
      setcatDesign(Designres.data);
    };
    fetProduct();
  }, []);

  const NavigateHome = async () => {
    await Cookies.get("SLF_id").then(window.location.reload());
  };

  NavigateHome();

  const handleModal = () => {
    document.querySelector("#exampleModalDefault").style.display = "flex";
  };

  const HandleClose = () => {
    document.querySelector("#exampleModalDefault").style.display = "none";
  };

  const slider = [slide1, slide2, slide3];
  let n = 0;

  setInterval(() => {
    document.getElementById(
      "carouselItem"
    ).style.backgroundImage = `url(${slider[n]})`;
    document.getElementById("carouselItem").style.transition =
      "all 2s ease-out 2s";
    n += 1;
    if (n >= 3) {
      n = 0;
    }
  }, 10000);

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
      <Landingheader />
      <div className="mostTopLandingPageDiv">
        <div id="carouselItem">
          <div className="container slideContainer">
            <p className="findBestServices">Find Best services</p>
            <p className="makeYourIdeaComeTrue">
              Make your idea come true and grow your{" "}
              <span className="business">Business</span>
            </p>
            <p className="bestFrelancingServices">
              find the best freelancing services here
            </p>
            <div className="LPsearchingForm" onClick={handleModal}>
              <input
                id="LPtheSearchButton"
                placeholder="try 'technology'"
                autoComplete="none"
              />
              <button>
                <Search />
              </button>
            </div>
            {/* seaching  */}
            <div
              className="modal fade show align-items-center"
              id="exampleModalDefault"
              style={{ display: "none" }}
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-modal="true"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-title" id="exampleModalLabel">
                      <button id="modalSearchButton">
                        <Search />
                      </button>
                      <input
                        id="modalSearchInput"
                        placeholder="try 'technology'"
                        autoComplete="none"
                      />
                      <button onClick={HandleClose} id="modalExitButton">
                        esc
                      </button>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="modal_body_user">
                      <div className="modal_body_user_title">
                        <Person /> User
                      </div>
                      <div className="modal_body_user_body">...</div>
                    </div>
                    <div className="modal_body_gig">
                      <div className="modal_body_gig_title">
                        <CreateNewFolder /> Gig
                      </div>
                      <div className="modal_body_gig_body">...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="popularContainer">
              <span className="popular">popular: </span>
              <span className="popularItems">technology</span>
              <span className="popularItems">marketing</span>
              <span className="popularItems">programming</span>
              <span className="popularItems">design</span>
            </div>
          </div>
        </div>
      </div>
      <div className="buidlWith">
        <div className="buildWithTitle">Lorem, ipsum.</div>
        <div className="buildWithComponent">Lorem ipsum dolor sit amet.</div>
      </div>
      <div className="topServices">
        <div className="topServicesTitle">Top Services</div>
        <hr />
        <div className="topServicessub">
          <div className="topServicessubTitle">Design</div>
          <div id="scroolLeft" className="directionIcon" onClick={scroolLeft}>
            <KeyboardArrowLeftIcon />
          </div>
          <div id="scroolRight" className="directionIcon" onClick={scroolRight}>
            <ChevronRightIcon />
          </div>
          <div className="topServicessubItems">
            {catDesign &&
              catDesign.map((item) => (
                <Product
                  key={item._id}
                  productId={item._id}
                  product={item}
                  HL={true}
                />
              ))}
          </div>
        </div>

        <div className="topServicessub" style={{ marginTop: "20px" }}>
          <div className="topServicessubTitle">Programming and technololgy</div>
          <div id="scroolLeft" className="directionIcon" onClick={scroolLeft1}>
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
                <Product
                  key={item._id}
                  productId={item._id}
                  product={item}
                  HL={true}
                />
              ))}
          </div>
        </div>

        <div className="topServicessub" style={{ marginTop: "20px" }}>
          <div className="topServicessubTitle">Marketing</div>
          <div id="scroolLeft" className="directionIcon" onClick={scroolLeft2}>
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
                <Product
                  key={item._id}
                  productId={item._id}
                  product={item}
                  HL={true}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="topServices">
        <div className="topServicesTitle">Companies and particulars</div>
        <hr />
        <Poster company={true} />
        <SlidePresentation />
        <Poster />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
