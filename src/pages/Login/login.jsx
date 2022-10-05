// import { useContext, useRef } from 'react'
import {
  Facebook,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import { Google, LinkedIn, GitHub } from "@mui/icons-material";
import logo from "./logo/logo.jpg";

import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios"
import { CircularProgress } from "@mui/material";

function Login() {

  const navigate = useNavigate();

  const LoginEmail = useRef();
  const LoginPassworrd = useRef();

  const [login, setLogin] = useState(false)

  const Default = () => {
    document.querySelector(".alert-danger").style.opacity = "0%";
    document.getElementById("allFieldRequired").style.display = "none";
  };

  const HandleLogin = async (e) => {
    e.preventDefault();

    setLogin(true)

    const res = await axios.post("/auth/login",
      {
        email: LoginEmail.current.value,
        password: LoginPassworrd.current.value
      })

    console.log(res)

    console.log(res.data.message);

    if (!LoginEmail.current.value || !LoginPassworrd.current.value) {
      document.getElementById("allFieldRequired").style.display = "block";
      setLogin(false)
    }

    else if (String(res.data.message) === "invalid") {
      document.querySelector(".alert-danger").style.opacity = "100%";
      setLogin(false)
    } else if (String(res.data.message) === "valid") {
      await Cookies.set("SLF_login", "hfajjfjsdfnjsdf sdjfkjsdfjkja djfklasfjdkjadjfklajkl fkajsd kfkasdjfkjasdkl fjkljafjklsdf asd fadf jaksdjfkajsdfjakfk ajdfkd sjfkjasdkfjka jfkdasfk jdkjfkdsjfkjakfjdsjfk jasdfakljfklakfjkaj", { expires: 2 });
      await Cookies.set("SLF_id", res.data.userEmail._id,  { expires: 2 })


      const navigation = () => {
        navigate("/"); 
      }
      

      setTimeout(navigation, 3000);
    }
  };

  const visibilityHandler = (e) => {
    e.preventDefault();


    var visible = document.getElementById("show");
    var visibleIconShow = document.getElementById("loginVisibilityLI");
    var visibleIconUnShow = document.getElementById("loginVisibilityOffLI");

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
      <div
        className="alert"
        id="allFieldRequired"
        role="alert"
        style={{
          position: "absolute",
          display: "none",
          top: "5px",
          right: "5px",
          backgroundColor: "rgba(255, 0, 0, 0.4)",
        }}
      >
        All field Are required
      </div>
      <div className="main_container">
        <div className="infos_container">
          <div className="logo">
            <div className="alert alert-primary logo-box" role="alert">
              <img src={logo} alt="L.social" width="200px" height="30px" />
            </div>
          </div>
          <div className="infos">
            <h1>Login</h1>
            <hr className="loginHr" />
            <div className="loginWithPlatform">
              <div
                className="alert alert-primary individualPlateform"
                role="alert"
              >
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
              I don't have an account
              <b>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <u
                    style={{
                      marginLeft: "5px",
                      color: "#FFE47A",
                      cursor: "pointer",
                    }}
                  >
                    Register
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
            <div className="loginResponsive">Login</div>
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
            <div className="alert alert-danger" id="ivalidPass" role="alert">
              Invalid password or Email
            </div>
            <form onSubmit={HandleLogin}>
              <label htmlFor="number/Email">Email:</label>
              <br className="responsiveBr" />
              <input
                type="email"
                placeholder="Enter Email"
                id="EmailFalse"
                ref={LoginEmail}
                onChange={Default}
              />
              <br />
              <br className="responsiveBr" />
              <label htmlFor="password">Password:</label>
              <br className="responsiveBr" />
              <input
                type="password"
                placeholder="Password"
                id="show"
                className="show"
                ref={LoginPassworrd}
                onChange={Default}
              />
              <VisibilityOutlined
                id="loginVisibilityLI"
                className="visibilityIcon"
                onClick={visibilityHandler}
              />
              <VisibilityOffOutlined
                id="loginVisibilityOffLI"
                className="visibilityIcon"
                onClick={visibilityHandler}
              />
              <p className="forgotPassword">Fogot password</p>
              <button type="submit" >
                {
                  login ? <CircularProgress style = {{cursor: "not-allowed"}}/> : "LOGIN"
                }
              </button>
            </form>
            <div className="registerResponsive">
              <footer style={{ color: "black" }}>
                I don't have an account
                <b>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <u
                      style={{
                        marginLeft: "5px",
                        color: "#FFE47A",
                        cursor: "pointer",
                      }}
                    >
                      Register
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

export default Login;
