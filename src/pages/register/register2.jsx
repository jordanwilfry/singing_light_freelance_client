import { useEffect, useRef, useState } from "react";
import logo from "./logo/logo.jpg";
import { CircularProgress } from "@material-ui/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./style/register.css";
import "./style/register3.css";
import "./style/register2.css";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";

function Register2() {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const otp = useRef();
  const navigate = useNavigate();

  const RegiterNumber = async () => {
    await axios.post("/auth/register2", { phoneNumber: value });
  };

  const Default = () => {
    document.getElementById("numberRequired").style.opacity = "0%";
    document.getElementById("codeRequired").style.opacity = "0%";
    document.getElementById("CodeSend").style.display = "none";
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCIK8S31AT2iZfk1Oy_5qgqaEXCK5-Me0Y",
    authDomain: "signinglightfreelance-a4aad.firebaseapp.com",
    projectId: "signinglightfreelance-a4aad",
    storageBucket: "signinglightfreelance-a4aad.appspot.com",
    messagingSenderId: "54187287590",
    appId: "1:54187287590:web:192768cf7308d31c1ab2e7",
    measurementId: "G-DGCYSBEPC7",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  const setUpRecaptCha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
      },
      auth
    );
  };

  const handleClick = (e) => {
    if (!value) {
      document.getElementById("numberRequired").style.opacity = "100%";
    } else {
      setUpRecaptCha();
      const phoneNumber = value;
      const appVerifier = window.recaptchaVerifier;

      const auth = getAuth();
      signInWithPhoneNumber(auth, phoneNumber, appVerifier).then(
        async (confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("code send");
          document.getElementById("CodeSend").style.display = "block";
        }
      );
    }
  };

  const verifyOTP = async (e) => {
    setLoading(true);
    e.preventDefault();
    let code = otp.current.value;
    let confirmationResult = window.confirmationResult;

    if (!code) {
      document.getElementById("codeRequired").style.opacity = "100%";
    } else {
      confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          RegiterNumber();
          const user = result.user;
          console.log(user);
          navigate("/register3");
        })
        .catch((error) => {
          console.log(error);
          alert("ivalid code please refresh this page and start again");
        });
    }
  };

  return (
    <div className="loginContainer">
      <div className="main_container">
        <div className="infos_container">
          <div className="logo">
            <div className="alert alert-primary logo-box" role="alert">
              <img
                src={logo}
                alt="Signing light freelance"
                width="200px"
                height="30px"
              />
            </div>
          </div>
          <div className="infos">
            <h1>Register</h1>
            <hr className="loginHr" />
            <div className="loginWithPlatform">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus explicabo quaerat, eveniet aut quae molestias nemo
              quasi quos, inventore architecto fugit non id voluptates
              aspernatur eligendi error cum. Ipsam saepe earum aspernatur totam
              iusto sed cumque impedit consequatur libero itaque, ipsa fuga unde
              veritatis.
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
            <form style={{ marginTop: "60px" }} onSubmit={verifyOTP}>
              <div
                id="recaptcha-container"
                style={{ position: "absolute", bottom: "0px", right: "0px" }}
              ></div>
              <label htmlFor="firstName">
                Phone number <span className="requiredField">*</span> :
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                className="countryCode"
                style={{ marginBottom: "3px" }}
                value={value}
                onChange={setValue}
                onFocus={Default}
              />
              <div className="required" id="numberRequired">
                Please your phone number is required
              </div>
              <div
                className="sumbitNumber"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                Send OTP
              </div>
              <br />
              <br />
              <label htmlFor="secondName">
                Confirmation code <span className="requiredField">*</span> :
              </label>
              <input
                type="text"
                placeholder="Enter code you recieve"
                id="EmailFalse"
                style={{ marginBottom: "3px" }}
                ref={otp}
                onChange={Default}
              />
              <div className="required" id="codeRequired">
                Please the validation code is required
              </div>

              <button type="submit">
                {loading ? (
                  <CircularProgress style={{ cursor: "not-allowed" }} />
                ) : (
                  "Confirm Code"
                )}
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
          {/* all field are required */}
      <div
        class="alert alert-success alert-dismissible fade show"
        id="CodeSend"
        role="alert"
      >
        Code<strong> Send !</strong>
        <button
          type="button"
          class="btn-close"
          onClick={Default}
        ></button>
      </div>
        </div>
      </div>
      <div className="privacy">Condition | About</div>
    </div>
  );
}

export default Register2;
