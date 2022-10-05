import React from "react";
import "./footer.css";
import logo from "../../logo/logo.png";
import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons";
import { LinkedIn} from "@mui/icons-material";

function footer() {
  return (
    <div className="footerContainer">
      <div className="footerLogo">
        <img src={logo} alt="Logo" width={"200px"}/>
      </div>
      <div className="footerMidle">
        <div className="footermidleGroups">
          <div className="footermidleGroupsTitle">Product</div>
          <div className="footermidleGroupsItems">About</div>
          <div className="footermidleGroupsItems">Developper</div>
          <div className="footermidleGroupsItems">career</div>
        </div>
        <div className="footermidleGroups">
          <div className="footermidleGroupsTitle">Category</div>
          <div className="footermidleGroupsItems">Design</div>
          <div className="footermidleGroupsItems">Programming and Technology</div>
          <div className="footermidleGroupsItems">Marketing</div>
        </div>
        <div className="footermidleGroups">
          <div className="footermidleGroupsTitle">Support</div>
          <div className="footermidleGroupsItems">Help center</div>
          <div className="footermidleGroupsItems">How it work</div>
          <div className="footermidleGroupsItems">Safety</div>
        </div>
      </div>
      <hr className="footerHr" />
      <div className="footerBottom">
        <div className="footerFollowing">
            <LinkedIn className="footerIcon"/>
            <Facebook className="footerIcon"/>
            <YouTube className="footerIcon"/>
            <Twitter className="footerIcon"/>
            <Instagram className="footerIcon"/>
        </div>
        <div className="footerCopyright">
            <div className="footerTerm">
                Terms
            </div>
            <div className="footerPrivacy">
                Privacy
            </div>
            <div className="footerCopRight">
                ©2022 <span>singning Light Freelance</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
