import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo/logo.jpg";
import Cookies from 'js-cookie'

import "./style/register.css";
import "./style/register3.css";
function Register3() {


  const navigate = useNavigate();

  if (Cookies.get("reg3")) {
    Cookies.remove("reg3");
  }

  const registerFirstName = useRef();
  const registerSecondName = useRef();
  const registerDate = useRef();
  const registerCountry = useRef();
  const registerGender = useRef();

  const [register, setregister] = useState(false)

  const Default = () => {
    document.getElementById("firstNameRequired").style.opacity = "0%";
    document.getElementById("secondNameRequired").style.opacity = "0%";
    document.getElementById("birthDayRequired").style.opacity = "0%";
    document.getElementById("countryRequired").style.opacity = "0%";
    document.getElementById("genderRequired").style.opacity = "0%";
  };


  const HandleRegister3 = async (e) => {
    e.preventDefault();

    setregister(true)
    console.log("loading...")


    if (!registerFirstName.current.value) {
      document.getElementById("firstNameRequired").style.opacity = "100%";
      setregister(false)
    }else if (!registerSecondName.current.value) {
      document.getElementById("secondNameRequired").style.opacity = "100%";
      setregister(false)
    }else if (!registerDate.current.value) {
      document.getElementById("birthDayRequired").style.opacity = "100%";
      setregister(false)
    }else if (!registerCountry.current.value) {
      document.getElementById("countryRequired").style.opacity = "100%";
      setregister(false)
    }else if (!registerGender.current.value) {
      document.getElementById("genderRequired").style.opacity = "100%";
      setregister(false)
    }
    else {
      await Cookies.set("reg3", "hfajjfjsdfnjsdf", { expires: 2, });

      await axios.post("/auth/register3",
        {
          firstName: registerFirstName.current.value,
          secondName: registerSecondName.current.value,
          birthday: registerDate.current.value,
          country: registerCountry.current.value,
          gender: registerGender.current.value,
        }).then(
          navigate("/registerFinal")
        )
    }
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
            <form style={{ marginTop: "60px" }} onSubmit={HandleRegister3}>
              <label htmlFor="firstName">
                First name <span className="requiredField">*</span> :
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                id="EmailFalse"
                style={{ marginBottom: "3px" }}
                ref={registerFirstName}
                onChange={Default}
              />
              <div className="required" id="firstNameRequired">
                Please your first name is required
              </div>
              <label htmlFor="secondName">
                Second name <span className="requiredField">*</span> :
              </label>
              <input
                type="text"
                placeholder="Enter second name"
                id="EmailFalse"
                style={{ marginBottom: "3px" }}
                ref={registerSecondName}
                onChange={Default}
              />
              <div className="required" id="secondNameRequired">
                Please your second name is required
              </div>
              <label htmlFor="dateOfBirth">
                Date of birth <span className="requiredField">*</span> :
              </label>
              <input
                type="date"
                placeholder="Enter your date of birth"
                id="EmailFalse"
                style={{ marginBottom: "3px" }}
                ref={registerDate}
                onChange={Default}
              />
              <div className="required" id="birthDayRequired">
                Please your birth of date is required
              </div>
              <label htmlFor="contry">
                Country <span className="requiredField">*</span> :
              </label>
              <select id="EmailFalse" style={{ marginBottom: "3px" }} ref={registerCountry}
                onChange={Default}>
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
                <option value="Bosnia & Herzegovina">
                  Bosnia & Herzegovina
                </option>
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
                <option value="Cameroon" selected>Cameroon</option>
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
                <option value="Netherlands">
                  Netherlands (Holland, Europe)
                </option>
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
                <option value="St Pierre & Miquelon">
                  St Pierre & Miquelon
                </option>
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
                <option value="United Arab Erimates">
                  United Arab Emirates
                </option>
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
                <option value="Virgin Islands (USA)">
                  Virgin Islands (USA)
                </option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              <div className="required" id="countryRequired">
                your country is required
              </div>
              <label htmlFor="gender">
                Gender <span className="requiredField">*</span> :
              </label>
              <select id="EmailFalse" style={{ marginBottom: "3px" }} ref={registerGender}
                onChange={Default}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">othert</option>
              </select>
              <div className="required" id="genderRequired">
                your gender is required
              </div>

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

export default Register3;
