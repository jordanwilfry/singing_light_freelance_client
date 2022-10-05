import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Footer from "../../components/footer/footer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./updateProfile.css";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import {
  CameraAltOutlined,
  Cancel,
  InfoOutlined,
  WarningOutlined,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";

function UpdateProfile() {
  const CurrentpassDiv = document.getElementById("updatePasswordCurrent");
  const newpassDiv = document.getElementById("updatePasswordNew");
  const telDiv = document.getElementById("updateTel");
  const emailDiv = document.getElementById("updateEmail");

  const CurrentPassModal = () => {
    document.getElementById("updatePasswordNew").style.display = "flex";
  };
  const TelModal = () => {
    document.getElementById("updateTel").style.display = "flex";
  };
  const EmailModal = () => {
    document.getElementById("updateEmail").style.display = "flex";
  };

  const CurrentPassModalCancel = () => {
    document.getElementById("updatePasswordCurrent").style.display = "none";
  };
  const NewPassModalCancel = () => {
    document.getElementById("updatePasswordNew").style.display = "none";
  };
  const TelModalCancel = () => {
    document.getElementById("updateTel").style.display = "none";
  };
  const EmailModalCancel = () => {
    document.getElementById("updateEmail").style.display = "none";
  };

  const userId = Cookies.get("SLF_id");

  const [user, setUser] = useState(null);
  const [Skills, setSkills] = useState(null);
  const [skillsArr, setSkillsArr] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [languagesArr, setLanguagesArr] = useState(null);
  const [desChar, setDesChar] = useState(0);
  const [firstName, setFirstName] = useState(null);
  const [secondName, setSecondName] = useState(null);
  const [country, setCountry] = useState(null);
  const [description, setDescription] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate()

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
        console.log("error");
        document.getElementById("registrationSuccessful").style.display =
          "flex";
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setProfilePicture(url);
          HandleCompletion();
        });
      }
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/user/${userId}`).then((res) => {
        console.log(res.data);
        setUser(res.data);
        setFirstName(res.data.firstName);
        setSecondName(res.data.secondName);
        setCountry(res.data.country);
        setDescription(res.data.description);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setSkillsArr(res.data.skills);
        setLanguagesArr(res.data.languages);
        setProfilePicture(res.data.profilePicture);
      });
    };

    fetchUser();
  }, [userId]);

  const [value, setValue] = useState();

  const HandleCount = (desc) => {
    setDesChar(description.length);
    if (desChar > 5000) {
      alert("the max numbers of character for description is 5000");
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault();

    if (description.length < 200) {
      document.getElementById("descriptionRequired").style.display = "block";
      document.getElementById("descriptionRequired").style.opacity = "1";
    } else if (
      !firstName ||
      !secondName ||
      !country ||
      !languagesArr ||
      !skillsArr
    ) {
      alert("please any modify field can't be empty");
    } else if (file) {
      HandleUpload();
    } else {
      HandleCompletion();
    }
  };

  const HandleCompletion = async (e) => {
    await axios
      .put(`/user/${userId}`, {
        userId : userId,
        firstName: firstName,
        secondName: secondName,
        country: country,
        description: description,
        profilePicture: profilePicture,
        skills: skillsArr,
        languages: languagesArr,
      })
      .then((res) => {
        document.getElementById("registrationSuccessful").style.display =
          "flex";
        console.log(res);
        setTimeout(() => {
          navigate("/profile/"+userId);
        }, 2000);
        
      })
      .catch((err) => {
        console.log("error reg");
        document.getElementById("registrationFailed").style.display = "flex";
      });
  };

  return (
    <>
      <Header />
      <ItemsNav />
      <div className="updateProfile">
        <div className="updateProfilePhoto">
          <Avatar
            alt="User Name"
            src={file ? URL.createObjectURL(file) : user?.profilePicture}
            sx={{ width: 100, height: 100 }}
          ></Avatar>
          <label htmlFor="UpdateCamera" className="UpdateCamera">
            <CameraAltOutlined />
          </label>
          <input
            type="file"
            name="updatePhote"
            id="UpdateCamera"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="updateProfileContainer">
          <div className="updateProfileTitle">Update Profile</div>

          <form className="updateProfileForm">
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              className="updateFormInput"
              placeholder={user?.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="firstName">Second name:</label>
            <input
              type="text"
              className="updateFormInput"
              placeholder={user?.secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
            />
            <label htmlFor="contry">
              Country <span className="requiredField">*</span> :
            </label>
            <select
              id="EmailFalse"
              className="updateFormInput"
              style={{ marginBottom: "3px" }}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <option value="Afganistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antigua & Barbuda">Antigua & Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire">Bonaire</option>
              <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Ter">
                British Indian Ocean Ter
              </option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Canary Islands">Canary Islands</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Chad">Chad</option>
              <option value="Channel Islands">Channel Islands</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos Island">Cocos Island</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote DIvoire">Cote DIvoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Curaco">Curacao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="East Timor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands">Falkland Islands</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern Ter">French Southern Ter</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Great Britain">Great Britain</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="Indonesia">Indonesia</option>
              <option value="India">India</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea North">Korea North</option>
              <option value="Korea Sout">Korea South</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macau">Macau</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Malawi">Malawi</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Midway Islands">Midway Islands</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Nambia">Nambia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherland Antilles">Netherland Antilles</option>
              <option value="Netherlands">Netherlands (Holland, Europe)</option>
              <option value="Nevis">Nevis</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau Island">Palau Island</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Phillipines">Philippines</option>
              <option value="Pitcairn Island">Pitcairn Island</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Republic of Montenegro">
                Republic of Montenegro
              </option>
              <option value="Republic of Serbia">Republic of Serbia</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="St Barthelemy">St Barthelemy</option>
              <option value="St Eustatius">St Eustatius</option>
              <option value="St Helena">St Helena</option>
              <option value="St Kitts-Nevis">St Kitts-Nevis</option>
              <option value="St Lucia">St Lucia</option>
              <option value="St Maarten">St Maarten</option>
              <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
              <option value="St Vincent & Grenadines">
                St Vincent & Grenadines
              </option>
              <option value="Saipan">Saipan</option>
              <option value="Samoa">Samoa</option>
              <option value="Samoa American">Samoa American</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome & Principe">Sao Tome & Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Tahiti">Tahiti</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad & Tobago">Trinidad & Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks & Caicos Is">Turks & Caicos Is</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Erimates">United Arab Emirates</option>
              <option value="United States of America">
                United States of America
              </option>
              <option value="Uraguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City State">Vatican City State</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Virgin Islands (Brit)">
                Virgin Islands (Brit)
              </option>
              <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
              <option value="Wake Island">Wake Island</option>
              <option value="Wallis & Futana Is">Wallis & Futana Is</option>
              <option value="Yemen">Yemen</option>
              <option value="Zaire">Zaire</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
            <label htmlFor="firstName">Language(s):</label>
            <input
              type="text"
              className="updateFormInput"
              placeholder="language1 language2 etc"
              value={languages}
              onChange={(e) => {
                setLanguages(e.target.value);
                setLanguagesArr(e.target.value.split(" "));
              }}
            />
            <label htmlFor="skills">
              skill <span className="requiredField">*</span> (make sure your
              skills appears in the skills list):
            </label>
            <input
              type="text"
              placeholder="skill1 skill2 skill3 ..."
              id="EmailFalse"
              style={{ marginBottom: "3px" }}
              value={Skills}
              onChange={(e) => {
                setSkills(e.target.value);
                setSkillsArr(e.target.value.split(" "));
              }}
            />
            <label htmlFor="description">
              Description<span className="requiredField">*</span> :
              <span className="descriptionCountChar">{desChar}/5000</span>
            </label>
            <textarea
              rows={4}
              style={{ marginBottom: "3px" }}
              onKeyUp={HandleCount}
              placeholder={user?.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="required" id="descriptionRequired">
              Please your description should contain at least 200 Characters
            </div>
            <br />
            <hr />
            <br />
            <div className="updateProfilePopUpDiv">
              <div className="updateProfilePopUp" onClick={CurrentPassModal}>
                Change Password
              </div>
              <div className="updateProfilePopUp" onClick={TelModal}>
                Change number
              </div>
              <div className="updateProfilePopUp" onClick={EmailModal}>
                Change Email
              </div>
            </div>
            <br />
            <hr />
            <br />
            <button className="updateProfileSubmit" onClick={HandelSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>

      <div id="updatePasswordCurrent">
        <form className="updatePasswordCurrentContainer">
          <div id="updatePasswordCurrentCancle">
            <Cancel
              style={{ fontSize: "40px", cursor: "pointer" }}
              onClick={CurrentPassModalCancel}
            />
          </div>
          <div className="updatePasswordCurrentTitle">Current Password</div>
          <label htmlFor="currentPassword">Enter current password:</label>
          <input type="password" className="UpdateCurrentPasswordInput" />
          <div className="required" id="updatePasswordCurrentInvalid">
            Invalid password
          </div>
          <button type="submit" className="updatePasswordCurrentSubmit">
            Submit
          </button>
        </form>
      </div>
      <div id="updatePasswordNew">
        <form className="updatePasswordNewContainer">
          <div id="updatePasswordNewCancle">
            <Cancel
              style={{ fontSize: "40px", cursor: "pointer" }}
              onClick={NewPassModalCancel}
            />
          </div>
          <div className="updatePasswordCurrentTitle">current Password</div>
          <label htmlFor="currentPassword">Enter new password:</label>
          <input type="password" className="UpdateCurrentPasswordInput" />
          {currentPassword && (
            <>
              {" "}
              <div className="updatePasswordCurrentTitle">New Password</div>
              <label htmlFor="currentPassword">Enter new password:</label>
              <input type="password" className="UpdateCurrentPasswordInput" />
              <label htmlFor="currentPassword">confirm password:</label>
              <input type="password" className="UpdateCurrentPasswordInput" />
              <div className="required" id="updatePasswordCurrentInvalid">
                Invalid password
              </div>
              <button type="submit" className="updatePasswordCurrentSubmit">
                Submit
              </button>
            </>
          )}
          <button type="submit" className="updatePasswordCurrentSubmit">
            Check
          </button>
        </form>
      </div>
      <div id="updateTel">
        <div id="updateTelCancle">
          <Cancel
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={TelModalCancel}
          />
        </div>
        <form style={{ marginTop: "60px" }} className="updateTelContainer">
          <label htmlFor="firstName">Phone number :</label>
          <PhoneInput
            placeholder="Enter phone number"
            className="countryCode"
            style={{ marginBottom: "3px" }}
            value={value}
            onChange={setValue}
          />
          <div className="required" id="numberRequired">
            Please your phone number is required
          </div>
          <div type="submit" className="sendOTP">
            Send OTP
          </div>
          <br />
          <br />
          <label htmlFor="secondName">Confirmation code :</label>
          <input
            type="text"
            placeholder="Enter code you recieve"
            id="EmailFalse"
            style={{ marginBottom: "3px" }}
          />
          <div className="required" id="codeRequired">
            Please the validation code is required
          </div>

          <button
            type="submit"
            style={{ border: "none", backgroundColor: "orange" }}
          >
            <Link
              to="/register3"
              style={{ textDecoration: "none", color: "black", margin: "5px" }}
            >
              Confirm Code
            </Link>
          </button>
        </form>
      </div>
      <div id="updateEmail">
        <form className="updateEmailContainer">
          <div id="updateEmailCancle">
            <Cancel
              style={{ fontSize: "40px", cursor: "pointer" }}
              onClick={EmailModalCancel}
            />
          </div>
          <div className="updatePasswordCurrentTitle">Email</div>
          <label htmlFor="currentPassword">Enter New email:</label>
          <input type="email" className="UpdateCurrentPasswordInput" />
          <button type="submit" className="updatePasswordCurrentSubmit">
            Submit
          </button>
        </form>
      </div>

      {/* successful registration */}
      <div
        class="alert alert-success align-items-center"
        role="alert"
        id="registrationSuccessful"
      >
        <div>
          <InfoOutlined style={{ fontSize: "20px", marginRight: "5px" }} /> Your
          informations were successfully updated.
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
          Your Sorry but your information could not be updated. Please check
          your connection or try later
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProfile;
