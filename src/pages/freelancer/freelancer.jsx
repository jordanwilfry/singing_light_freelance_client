import React from "react";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import SomeFreelancer from "../../components/someFreelancer/someFreelancer";
import SomeBuyers from "../../components/someBuyers/someBuyers";
import Footer from "../../components/footer/footer";

import {CreateNewFolder, LocalShipping} from "@material-ui/icons"
import { Paid } from "@mui/icons-material";

import "./freelancer.css";

function freelancer() {
  return (
    <>
      <div className="freelancerContainer">
        <div className="freelancerContainerTop">
          <Header />
          <ItemsNav />
          <div className="freelancerContainerTopText">
            <div className="freelancerContainerTopTextTop">
              Work from anywhere
            </div>
            <div className="freelancerContainerTopTextmidle">
              Tell us want you do and earn
            </div>
            <div className="btn btn-warning">Create a Gig</div>
          </div>
          <div className="freelancerContainerTopInformations">
            <div className="freelancerContainerTopInformationsitem">
              <div>Freelancer</div>
              <div>50M</div>
            </div>
            <div className="freelancerContainerTopInformationsitem">
              <div>Transaction</div>
              <div>50M+</div>
            </div>
            <div className="freelancerContainerTopInformationsitem">
              <div>Pricing</div>
              <div>$5 - $10000</div>
            </div>
          </div>
        </div>
        <div className="someFreelancerContainer">
          <div className="someFreelancerTitle">Our Freelancers</div>
          <div className="someFreelancerContainerContain">
            <SomeFreelancer />
            <SomeFreelancer />
            <SomeFreelancer />
            <SomeFreelancer />
          </div>
        </div>
        <div className="howItWorkContainer">
          <div className="howItWorkTitle">How it works</div>
          <div className="howItWorkContainerContain">
            <div className="howItWorkContainerContainItem">
              <CreateNewFolder  className="howItWorkContainerContainItemIcon"/>
              <div style={{fontSize: "25px", marginBottom: "5px"}}>create your Gig</div>
              <div style={{textAlign: "center"}}>here you should descript your skills</div>
            </div>
            <div className="howItWorkContainerContainItem">
              <LocalShipping  className="howItWorkContainerContainItemIcon"/>
              <div style={{fontSize: "25px", marginBottom: "5px"}}>Deliver your work</div>
              <div style={{textAlign: "center"}}>your will notice any time you have a project</div>
            </div>
            <div className="howItWorkContainerContainItem">
              <Paid  className="howItWorkContainerContainItemIcon"/>
              <div style={{fontSize: "25px", marginBottom: "5px"}}>Get Paid</div>
              <div style={{textAlign: "center"}}>you will no more be aguering for your money get paid inidialy after you deliver you will keep 85% of all transaction</div>
            </div>
          </div>
        </div>
        <div className="someFreelancerContainer">
          <div className="someFreelancerTitle">Buyers Stories</div>
          <div className="someFreelancerContainerContain">
            <SomeBuyers />
            <SomeBuyers />
            <SomeBuyers />
            <SomeBuyers />
          </div>
        </div>
        <div className="someFreelancerContainer">
          <div className="someFreelancerTitle">Question and anwser</div>
          <div className="QandAContainerContain">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
      

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
        

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
      

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
        

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default freelancer;
