import React from "react";
import "./poster.css";
import image1 from "../background/tn-hero-banner-learning.jpg";
import image2 from "../background/showcase.jpg";
import { useNavigate } from "react-router-dom";

function Poster({ company, home }) {
  const navigate = useNavigate()

  const navigatePostRequest = () => { 
    navigate("/register")
 }

 const navigateCreateProject = () => { 
  navigate("/create_project")
}

const navigateRegister = () => { 
  navigate("/register")
}


  return (
    <div
      className="posterContainer"
      style={{ backgroundColor: company ? "#d2edf8" : "#FFFAE8" }}
    >
      <div className="posterInfo">
        <>
          {company ? (
            <>
              <p className="posterInfoP1C">accomplish every thing</p>
              <p className="posterInfoP2" style={{ margin: "5px" }}>
                widely used by many companies{" "}
                <span className="posterInfoP2S">and </span> individuals
              </p>
            </>
          ) : (
            <>
              <p className="posterInfoP1">Freelance</p>
              <p className="posterInfoP2">
                you have some free time and{" "}
                <span className="posterInfoP2S">skill</span>
              </p>
              <>
                {home ? (
                  <>
                    <p className="posterInfoP3">
                    Tell us what you are good at by creating a gig and dive into the world of freelancer
                    </p>
                  </>
                ) : (
                  <>
                    <p className="posterInfoP3">
                      connect to us find and area where you are skilled and earn
                      something
                    </p>
                  </>
                )}
              </>
              <p className="posterInfoP4">
                don't be wasting your time doing nothing
              </p>
            </>
          )}
        </>
        <button className="btn btn-warning join" onClick={company ? navigatePostRequest : home ? navigateCreateProject : navigateRegister }>
          {company ? "post an offer" :  home ? "Crete a Project" : "Join our freelancer"}
        </button>
      </div>
      <img src={company ? image1 : image2} alt="" className="posterPicture" />
    </div>
  );
}

export default Poster;
