import logo from "./logo/logo.jpg";
import profile from "./background/background2.jpg";
import { CircularProgress } from "@material-ui/core";
import Cookies from "js-cookie";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import "./style/register.css";
import "./style/register3.css";
import "./style/register4.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { InfoOutlined, WarningOutlined } from "@material-ui/icons";

function Register4() {
  const navigate = useNavigate();

  if (Cookies.get("regF")) {
    Cookies.remove("regF");
  }

  const registerDescription = useRef();
  const registerSkills = useRef();
  const profileRef = useRef();

  const [file, setFile] = useState(null);
  const [descChar, setDescChar] = useState(0);
  const [Skills, setSkills] = useState(null);
  const [SkillsArr, setSkillsArr] = useState([]);
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(false);
  const [ProfilePicture, setProfilePicture] = useState("");

  const [register, setregister] = useState(false);

  const Default = () => {
    document.getElementById("descriptionRequired").style.opacity = "0%";
    document.getElementById("SkillRequired").style.opacity = "0%";
  };

  const HandleCount = (desc) => {
    setDescChar(String(registerDescription.current.value).length);
    if (descChar > 5000) {
      alert("the max numbers of character for description is 5000");
    }
  };

  const HandleUpload = () => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/profile pictures/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUpload(true);
          console.log(url);
          setProfilePicture(url);
        });
      }
    );
  };

  const HandleDocumentUpload = (e) => {
    e.preventDefault();
    console.log("loading...");

    if (String(registerDescription.current.value).length < 200) {
      document.getElementById("descriptionRequired").style.opacity = "100%";
      setregister(false);
    }
    if (String(registerDescription.current.value).length > 5000) {
      alert("the max numbers of character for description is 5000");
      setregister(false);
    } else if (!registerSkills.current.value) {
      document.getElementById("SkillRequired").style.opacity = "100%";
      setregister(false);
    } else if(file) {
      HandleUpload();
    }else{
      setUpload(true)
    }
  };

  const HandleRegisterFinal = async (e) => {
    e.preventDefault();
    setregister(true);

    // setSkillsArr(Skills.split(" "));
    console.log(SkillsArr);
    console.log(ProfilePicture);
    await axios
      .post("/auth/register4", {
        profilePicture: ProfilePicture,
        description: registerDescription.current.value,
        skills: SkillsArr,
      })
      .then((res) => {
        document.getElementById("registrationSuccessful").style.display = "flex";
        console.log(res);
        setregister(false);
        setTimeout(() => {
          navigateHome();
        }, 3000);
      })
      .catch((err) => {
        setregister(false);
        console.log("error reg")
        document.getElementById("registrationFailed").style.display = "flex";
      });

    const navigateHome = () => {
      navigate("/login");
    };
  };

  return (
    <div className="loginContainer">
      <div className="main_container">
        <div className="infos_container">
          <div className="logo">
            <div class="alert alert-primary logo-box" role="alert">
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
            <form style={{ marginTop: "60px" }} onSubmit={e=>{e.preventDefault()}}>
              <span className="upload">
                <input
                  type="file"
                  name="file"
                  id="profile"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={profileRef}
                />
                {file ? (
                  <label htmlFor="profile" id="profileImage">
                    <img src={URL.createObjectURL(file)} alt="" />
                    <span>
                      UPLOAD Profile <span className="requiredField">*</span>
                    </span>
                  </label>
                ) : (
                  <label htmlFor="profile" id="profileImage">
                    <img src={profile} alt="" />
                    <span>
                      UPLOAD Profile <span className="requiredField">*</span>
                    </span>
                  </label>
                )}
              </span>
              <div>
                {progress !== 0 && (
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      accept="application/pdf"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuemax="100"
                    >
                      {progress}%
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="description">
                Description<span className="requiredField">*</span> :
                <span className="descriptionCountChar">{descChar}/5000</span>
              </label>
              <textarea
                placeholder="write your description at least 200 character"
                rows={4}
                style={{ marginBottom: "3px" }}
                ref={registerDescription}
                onChange={Default}
                onKeyUp={HandleCount}
              ></textarea>
              <div className="required" id="descriptionRequired">
                Please your description should contain at least 200 Characters
              </div>
              <label htmlFor="skills">
                skill <span className="requiredField">*</span> (make sure your
                skills appears in the skills list):
              </label>
              <input
                type="text"
                placeholder="skill1 skill2 skill3 ..."
                id="EmailFalse"
                style={{ marginBottom: "3px" }}
                ref={registerSkills}
                value={Skills}
                  onChange={(e) => {
                    setSkills(e.target.value);
                    setSkillsArr(e.target.value.split(" "))
                    Default();
                  }}/>
              <div className="required" id="SkillRequired">
                Please your skills required
              </div>
              {upload ? (
                <button onClick={HandleRegisterFinal}>
                  {register ? (
                    <CircularProgress style={{ cursor: "not-allowed" }} />
                  ) : (
                    "NEXT"
                  )}
                </button>
              ) : (
                <button
                  className="studentRegistrationNavigationNext"
                  onClick={HandleDocumentUpload}
                >
                  Upload
                </button>
              )}
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
        {/* successful registration */}
        <div
          class="alert alert-success align-items-center"
          role="alert"
          id="registrationSuccessful"
        >
          <div>
            <InfoOutlined style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
            Your informations were successfully registered. Please check your
            mail
          </div>
        </div>

        {/* failed regiatration */}
        <div
          class="alert alert-danger align-items-center"
          role="alert"
          id="registrationFailed"
        >
          <div>
            <WarningOutlined style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
            Your Sorry but your information could not be registered. Please
            check your connection or try later
          </div>
        </div>
      </div>
      <div className="privacy">Condition | About</div>
    </div>
  );
}

export default Register4;
