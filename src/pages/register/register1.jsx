// import { useContext, useRef } from 'react'
import {
  Facebook,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import { Google, LinkedIn, GitHub } from "@mui/icons-material";
import logo from "./logo/logo.jpg";

import { Link, useNavigate } from "react-router-dom";

import "./style/register.css";
import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios"


function Register1() {

  const navigate = useNavigate();

  if (Cookies.get("reg1")) {
    Cookies.remove("reg1");
  }

  const registerEmail = useRef();
  const registerPassworrd = useRef();
  const registerPassworrdConfirm = useRef();

  const [register, setregister] = useState(false)

  const Default = () => {
    document.querySelector(".alert-danger").style.opacity = "0%";
      document.getElementById("registerAllFieldsRequired").style.opacity = "0%";
      document.querySelector("#registerEmailUsed").style.display = "none";
  };


  const HandleRegister = async (e) => {
    e.preventDefault();

    setregister(true)
    console.log("loading...")

    const res = await axios.post("/auth/verifyEmail",
      {
        email: registerEmail.current.value,
      })

    console.log(res)

    console.log(res.data.message);


    if (!registerEmail.current.value || !registerPassworrd.current.value || !registerPassworrdConfirm.current.value) {
      document.getElementById("registerAllFieldsRequired").style.opacity = "100%";
      setregister(false)
    }

    else if(!(String(registerEmail.current.value).includes('.' && '@'))){
      alert("Invalid Email\nan Email must contain a '.' and a '@'")
      setregister(false)
    }

    else if (String(res.data.message) === "invalid") {
      document.querySelector("#registerEmailUsed").style.opacity = "100%";
      document.querySelector("#registerEmailUsed").style.display = "flex";
      setregister(false)
    }

    else if (registerPassworrd.current.value !== registerPassworrdConfirm.current.value) {
      document.querySelector("#registerUnmarchedPassword").style.opacity = "100%";
      setregister(false)
    } else {
      await Cookies.set("reg1", "hfajjfjsdfnjsdf", { expires: 2, });
      
      await axios.post("/auth/register1",
      {
        email: registerEmail.current.value,
        password: registerPassworrd.current.value
      }).then(
        navigate("/register2")
      )
    }
  };




  const visibilityHandler = (e) => {
    e.preventDefault();

    var visible = document.getElementById("password");
    var visibleIconShow = document.getElementById("visibilityLI");
    var visibleIconUnShow = document.getElementById("visibilityOffLI");

    if (visible.type === "password") {
      visible.type = "text";
      visibleIconShow.style.display = "block";
      visibleIconUnShow.style.display = "none";
    } else {
      visible.type = "password";
      visibleIconShow.style.display = "none";
      visibleIconUnShow.style.display = "block";
    }
  };

  const visibilityHandler1 = (e) => {
    e.preventDefault();

    var visible = document.getElementById("passwordConfirmation");
    var visibleIconShow = document.getElementById("visibilityLI1");
    var visibleIconUnShow = document.getElementById("visibilityOffLI1");

    if (visible.type === "password") {
      visible.type = "text";
      visibleIconShow.style.display = "block";
      visibleIconUnShow.style.display = "none";
    } else {
      visible.type = "password";
      visibleIconShow.style.display = "none";
      visibleIconUnShow.style.display = "block";
    }
  };

  return (
    <div className="loginContainer">
      <div className="main_container">
        <div className="infos_container">
          <div className="logo">
            <div class="alert alert-primary logo-box" role="alert">
              <img src={logo} alt="L.social" width="200px" height="30px" />
            </div>
          </div>
          <div className="infos">
            <h1>Register</h1>
            <hr className="loginHr" />
            <div className="loginWithPlatform">
              <div class="alert alert-primary individualPlateform" role="alert">
                <span className="individualPlateformIcon">
                  <Google style={{ color: "#FFE47A" }} />
                </span>{" "}
                Google
              </div>
              <div
                className="alert alert-primary individualPlateform"
                role="alert"
              >
                <span className="individualPlateformIcon">
                  <GitHub style={{ color: "#FFE47A" }} />
                </span>{" "}
                GitHub
              </div>
              <div
                className="alert alert-primary individualPlateform"
                role="alert"
              >
                <span className="individualPlateformIcon">
                  <LinkedIn style={{ color: "#FFE47A" }} />
                </span>
                LinkIn
              </div>
              <div
                className="alert alert-primary individualPlateform"
                role="alert"
              >
                <span className="individualPlateformIcon">
                  {" "}
                  <Facebook style={{ color: "#FFE47A" }} />
                </span>
                Facebook
              </div>
            </div>

            <footer>
              I have an account
              <b>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <u
                    style={{
                      marginLeft: "5px",
                      color: "#FFE47A",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </u>
                </Link>
              </b>
            </footer>
          </div>
        </div>
        <div className="form_container">
          <div className="form_items">
            <div className="logoResponsive">
              <div className="alert alert-primary logo-box" role="alert">
                <img src={logo} alt="L.social" width="200px" height="30px" />
              </div>
            </div>
            <div className="loginResponsive">Register</div>
            <div className="loginWithPlatformResposive">
              <Google className="loginWithPlatformResposiveIcon" />
              <GitHub className="loginWithPlatformResposiveIcon" />
              <LinkedIn className="loginWithPlatformResposiveIcon" />
              <Facebook className="loginWithPlatformResposiveIcon" />
            </div>
            <div className="theOrline">
              <span className="orleft"></span>
              <span className="or"> OR </span>
              <span className="orRight"></span>
            </div>
            <div className="alert alert-danger" id="registerUnmarchedPassword" role="alert">
              Passwords doesn't marches
            </div>
            <div className="alert alert-warning" id="registerEmailUsed" role="alert">
              Sorry! This email has an Account
            </div>
            <div className="alert alert-danger" id="registerAllFieldsRequired" role="alert">
              Sorry! All fields are required
            </div>
            <form onSubmit={HandleRegister}>
              <label htmlFor="Email">
                Email <span className="requiredField">*</span>:
              </label>
              <input type="email" placeholder="Enter Email" id="EmailFalse" ref={registerEmail}
                onChange={Default}/>
              <br />
              <label htmlFor="password">
                Password <span className="requiredField">*</span>:
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="show"
                ref={registerPassworrd}
                onChange={Default}
              />
              <br />
              <label htmlFor="confirmPassword">
                Confirm Password <span className="requiredField">*</span>:
              </label>
              <input
                type="password"
                placeholder="Re-enter Password"
                id="passwordConfirmation"
                className="Confirmshow"
                ref={registerPassworrdConfirm}
                onChange={Default}
              />
              <VisibilityOutlined
                id="visibilityLI"
                className="visibilityIcon"
                onClick={visibilityHandler}
              />
              <VisibilityOffOutlined
                id="visibilityOffLI"
                className="visibilityIcon"
                onClick={visibilityHandler}
              />
              <VisibilityOutlined
                id="visibilityLI1"
                className="visibilityIcon"
                onClick={visibilityHandler1}
              />
              <VisibilityOffOutlined
                id="visibilityOffLI1"
                className="visibilityIcon"
                onClick={visibilityHandler1}
              />
              <button type="submit">
                {
                  register ? <CircularProgress style={{ cursor: "not-allowed" }} /> : "NEXT"
                }
              </button>
            </form>
            <div className="registerResponsive">
              <footer style={{ color: "black" }}>
                I have an account
                <b>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <u
                      style={{
                        marginLeft: "5px",
                        color: "#FFE47A",
                        cursor: "pointer",
                      }}
                    >
                      Login
                    </u>
                  </Link>
                </b>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <div className="privacy">Condition | About</div>
    </div>
  );
}

export default Register1;
