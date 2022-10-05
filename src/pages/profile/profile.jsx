import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Product from "../../components/products/product";
import Footer from "../../components/footer/footer";
import { Add, Edit, EditAttributes, Note, TabletAndroid, Update } from "@material-ui/icons";

import "./profile.css";
import { ModeEdit, Upcoming } from "@mui/icons-material";
import Cookies from 'js-cookie'
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";

function Profile() {

  const userId = useParams().userId
  const Id = Cookies.get("SLF_id")
  const navigate = useNavigate()

  const navigateEditProfile = () => { 
    navigate("/updateProfile/:Id")
   }


  const [user, setUser] = useState(null);
  const [ProjectProfiles, setProjectProfiles] = useState(null);
  const [experience, setExperience] = useState(null);
  const [education, setEducation] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/myProfile/${userId}`)
      const projectsPS = await axios.get(`/project/profile/${userId}`)
      const experiencePS = await axios.get(`/user/experience/${userId}`)
      const educationPS = await axios.get(`/user/education/${userId}`)
      const portfolioPS = await axios.get(`/user/portfolio/${userId}`)
      setUser(res.data)
      setProjectProfiles(projectsPS.data)
      setExperience(experiencePS.data)
      setEducation(educationPS.data)
      setPortfolio(portfolioPS.data)
    }
    fetchUser()

  }, [userId])
  return (
    <>
      <Header />
      <ItemsNav />
      {
        user ?
      
      <div className="profileContainer">
        <div className="profileContainerLeft">
          <div className="profileContainerLeftTop">
            <div
              className="profileContainerLeftTopTop"
              style={{ width: "80px" }}
            >
              <span className="profileOnline"></span> <div>Online</div>
            </div>
            <div className="profileContainerLeftTopItem">
              Name:{"  "}
              <span className="profileContainerLeftTopItemContainer">
                {user ? user.firstName + " " + user.secondName : "Loading..."}
              </span>
            </div>
            <div className="profileContainerLeftTopItem">
              Country:{"  "}
              <span className="profileContainerLeftTopItemContainer">
                {user ? user.country : "Loading..."}
              </span>
            </div>
            <div className="profileContainerLeftTopItem">
              Member Since:{"  "}
              <span className="profileContainerLeftTopItemContainer">
                {user ? dateFormat(user.createdAt, "dS mmmm, yyyy") : "Loading..."}
              </span>
            </div>
            <div className="profileContainerLeftTopItem">
              Gender:{"  "}
              <span className="profileContainerLeftTopItemContainer">
                {user ? user.gender : "Loading..."}
              </span>
            </div>
            <div className="profileContainerLeftTopItem">
              Languages:{"  "}
              <span className="profileContainerLeftTopItemContainer languages">
                {user ? user.languages.map((lang) => (
                  <span className="language" key={Math.random(100)}>- {lang}</span>
                ))
                  : "Loading..."}
              </span>
            </div>
          </div>
          <Link to={{ pathname: portfolio ? portfolio.link : "http://localhost:3000/" }} target="_blank" className="profileContainerLeftPortfolio">
            <div className="profileContainerLeftPortfolioTitle">Portfolio</div>
            {user && Id == user._id
              &&
              <div className="profileContainerLeftPortfolioUpdate">
                <ModeEdit />
              </div>
            }
          </Link>
          <div className="profileContainerLeftBottom">
            <div className="profileContainerLeftBottomTitle">More Infos</div>
            <div className="profileContainerLeftBottomGroup">
              <div className="profileContainerLeftBottomGroupTitle">
                Link Accounts:
              </div>
              <div className="profileContainerLeftBottomGroupItem socialLink socialLinkNoactive">
                Gmail
              </div>
              <div className="profileContainerLeftBottomGroupItem socialLink">
                Facebook
              </div>
              <div className="profileContainerLeftBottomGroupItem socialLink">
                LinkIn
              </div>
              <div className="profileContainerLeftBottomGroupItem socialLink">
                Twitter
              </div>
              <div className="profileContainerLeftBottomGroupItem socialLink">
                Instagram
              </div>
            </div>
            <div className="profileContainerLeftBottomGroup">
              <div className="profileContainerLeftBottomGroupTitle">
                <div>Education:</div>
                {user && Id == user._id
                  &&
                  <div className="profileContainerLeftBottomGroupAdd"><Add /></div>
                }
              </div>
              {education ? education.map((educ) => (
                <div className="profileContainerLeftBottomGroupItem">
                  <div>{educ.school}</div>
                  <div>{dateFormat(educ.started, "mmmm yyyy") + " - " + dateFormat(educ.ended, "mmmm yyyy")}</div>
                </div>
              )) : "Loading..."
              }
            </div>
            <div className="profileContainerLeftBottomGroup">
              <div className="profileContainerLeftBottomGroupTitle">
                Skills:
              </div>
              <div className="profileContainerLeftBottomGroupSkill">

                {user ? user.skills.map((skill) => (
                  <div className="profileContainerLeftBottomGroupItemSkills">
                    {skill}
                  </div>
                )) : "Loading..."}
              </div>
            </div>
            <div className="profileContainerLeftBottomGroup">
              <div className="profileContainerLeftBottomGroupTitle_">
                Description:
                <div className="profileContainerLeftBottomGroupItem">
                  {user ? user.description : "Loading..."}
                </div>
              </div>
            </div>
            <div className="profileContainerLeftBottomGroup">
              <div className="profileContainerLeftBottomGroupTitle">
                <div>Eperience:</div>
                {user && Id == user._id
                  &&
                  <div className="profileContainerLeftBottomGroupAdd"><Add /></div>
                }
              </div>
              {experience ? experience.map((exp) => (
                <div className="profileContainerLeftBottomGroupItem">
                  <div>{exp.company}</div>
                  <div>{dateFormat(exp.started, "mmmm yyyy") + " - " + dateFormat(exp.ended, "mmmm yyyy")}</div>
                </div>
              )) : "Loading..."
              }
              <div className="profileContainerLeftBottomGroupItem"></div>
            </div>
          </div>
        </div>
        <div className="profileContainerRight">
          <div className="profileContainerRightTop">
            <img
              src="/assets/logo/BG-SLFreelance.png"
              alt=""
              className="profileContainerRightCoverPicture"
            />
            <img
              src={user.profilePicture}
              alt="A"
              className="profileContainerRightProfilePicture"
            />
            {user && Id == user._id
              &&
              <div className="profileEdit" onClick={navigateEditProfile}>
                <Edit className="profileEditIcon" />
              </div>
            }

          </div>

          <div className="profileContainerLeft profileContainerLeftResponsive">
            <div className="profileContainerLeftTop">
              <div
                className="profileContainerLeftTopTop"
                style={{ width: "80px" }}
              >
                <span className="profileOnline"></span> <div>Online</div>
              </div>
              <div className="profileContainerLeftTopItem">
                Name:{"  "}
                <span className="profileContainerLeftTopItemContainer">
                  {user ? user.firstName + " " + user.secondName : "Loading..."}
                </span>
              </div>
              <div className="profileContainerLeftTopItem">
                Country:{"  "}
                <span className="profileContainerLeftTopItemContainer">
                  {user ? user.country : "Loading..."}
                </span>
              </div>
              <div className="profileContainerLeftTopItem">
                Member Since:{"  "}
                <span className="profileContainerLeftTopItemContainer">
                  {user ? dateFormat(user.createdAt, "dS mmmm, yyyy") : "Loading..."}
                </span>
              </div>
              <div className="profileContainerLeftTopItem">
                Gender:{"  "}
                <span className="profileContainerLeftTopItemContainer">
                  {user ? user.gender : "Loading..."}
                </span>
              </div>
              <div className="profileContainerLeftTopItem">
                Languages:{"  "}
                <span className="profileContainerLeftTopItemContainer languages">
                  {user ? user.languages.map((lang) => (
                    <span className="language" key={Math.random(100)}>- {lang}</span>
                  ))
                    : "Loading..."}
                </span>
              </div>
            </div>
            <Link to={{ pathname: portfolio ? "/" : "http://localhost:3000/" }} target="_blank" className="profileContainerLeftPortfolio">
              <div className="profileContainerLeftPortfolioTitle">Portfolio</div>
              {user && Id == user._id
                &&
                <div className="profileContainerLeftPortfolioUpdate">
                  <ModeEdit />
                </div>
              }

            </Link>
            <div className="profileContainerLeftBottom">
              <div className="profileContainerLeftBottomTitle">More Infos</div>
              <div className="profileContainerLeftBottomGroup">
                <div className="profileContainerLeftBottomGroupTitle">
                  Link Accounts:
                </div>
                <div className="profileContainerLeftBottomGroupItem socialLink socialLinkNoactive">
                  Gmail
                </div>
                <div className="profileContainerLeftBottomGroupItem socialLink">
                  Facebook
                </div>
                <div className="profileContainerLeftBottomGroupItem socialLink">
                  LinkIn
                </div>
                <div className="profileContainerLeftBottomGroupItem socialLink">
                  Twitter
                </div>
                <div className="profileContainerLeftBottomGroupItem socialLink">
                  Instagram
                </div>
              </div>
              <div className="profileContainerLeftBottomGroup">
                <div className="profileContainerLeftBottomGroupTitle">
                  <div>Education:</div>
                  {user && Id == user._id
                    &&
                    <div className="profileContainerLeftBottomGroupAdd"><Add /></div>
                  }
                </div>
                {education ? education.map((educ) => (
                  <div className="profileContainerLeftBottomGroupItem">
                    <div>{educ.school}</div>
                    <div>{dateFormat(educ.started, "mmmm yyyy") + " - " + dateFormat(educ.ended, "mmmm yyyy")}</div>
                  </div>
                )) : "Loading..."
                }
              </div>
              <div className="profileContainerLeftBottomGroup">
                <div className="profileContainerLeftBottomGroupTitle">
                  Skills:
                </div>
                <div className="profileContainerLeftBottomGroupSkill">

                  {user ? user.skills.map((skill) => (
                    <div className="profileContainerLeftBottomGroupItemSkills">
                      {skill}
                    </div>
                  )) : "Loading..."}
                </div>
              </div>
              <div className="profileContainerLeftBottomGroup">
                <div className="profileContainerLeftBottomGroupTitle_">
                  Description:
                  <div className="profileContainerLeftBottomGroupItem">
                    {user ? user.description : "Loading..."}
                  </div>
                </div>
              </div>
              <div className="profileContainerLeftBottomGroup">
                <div className="profileContainerLeftBottomGroupTitle">
                  <div>Eperience:</div>
                  {user && Id == user._id
                    &&
                    <div className="profileContainerLeftBottomGroupAdd"><Add /></div>
                  }
                </div>
                {experience ? experience.map((exp) => (
                  <div className="profileContainerLeftBottomGroupItem">
                    <div>{exp.company}</div>
                    <div>{dateFormat(exp.started, "mmmm yyyy") + " - " + dateFormat(exp.ended, "mmmm yyyy")}</div>
                  </div>
                )) : "Loading..."
                }
                <div className="profileContainerLeftBottomGroupItem"></div>
              </div>
            </div>
          </div>

          <div className="profileContainerRightprojet">
            <div className="profileContainerRightprojetGig" style={{ fontSize: "20px" }}>~user's Gig</div>

            {
              ProjectProfiles && ProjectProfiles.lenght !== 0 ?
                <div className="profileContainerRightprojetContainer">
                  {ProjectProfiles.map((project) => (
                    <Product key={project._id} productId={project._id} product={project} />
                  ))}
                </div>

                : <div className="profileContainerRightprojetContainerNoproject">
                  <div className="profileContainerRightprojetContainerNoprojectText"> No Gig Yet </div>
                  <div className="btn btn-warning">Create a Gig</div>
                </div>
            }
          </div>
        </div>
      </div>

      : <Loader/>

          }
      <Footer />
    </>
  );
}

export default Profile;
