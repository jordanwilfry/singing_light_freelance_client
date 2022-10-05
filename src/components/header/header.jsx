import React, { useEffect, useState, useRef } from "react";
import logo from "../../logo/logo.jpg";
import "./header.css";
import {
  ComputerOutlined,
  CreateNewFolder,
  Favorite,
  ListAltOutlined,
  LockOutlined,
  Mail,
  Notifications,
  Person,
  Search,
} from "@material-ui/icons";
import { Avatar, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Header() {
  const userId = Cookies.get("SLF_id");
  const isLogin = Cookies.get("SLF_login");

  const navigate = useNavigate();

  if (!userId || !isLogin) {
    Cookies.remove("SLF_login");
    Cookies.remove("SLF_id");
    window.location.reload();
  }

  const handleLogout = () => {
    if (window.confirm("are you sure you want to log out")) {
      Cookies.remove("SLF_login");
      Cookies.remove("SLF_id");
      window.location.reload();
    }
  };

  const navigateToFav = () => {
    navigate("/favorite");
  };

  const [user, setUser] = useState(null);
  const searchString = useRef();
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/${userId}`);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  const handleModal = () => {
    document.querySelector("#exampleModalDefault").style.display = "flex";
  };

  const HandleClose = () => {
    document.querySelector("#exampleModalDefault").style.display = "none";
  };

  const HandleSearch = async (e) => {
    e.preventDefault();
    const Search = searchString.current.value;

    const res = await axios.get(`/search/${Search}`);
    console.log(res.data);
    setSearchResult(res.data);
  };

  return (
    <>
      <div className="headerContainer">
        <div className="headerLeft">
          <div className="clickLogo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} alt="" className="headerLogo" />
            </Link>
          </div>
        </div>

        <div className="searchingFormH" onClick={handleModal}>
          <div id="theSearchButton">search...</div>
          <button>
            <Search />
          </button>
        </div>

        <div className="headerRight">
          <div className="navIcon responsiveSearch">
            <Search className="navIconIcon" onClick={handleModal} />
          </div>
          <div className="navIcon">
            <Favorite className="navIconIcon" onClick={navigateToFav} />
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButtonSM"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
            <div className="navIcon">
              <Badge badgeContent={1} color="error">
                <Mail className="navIconIcon" />
              </Badge>
            </div>
            </button>
            <ul
              className="dropdown-menu Notification-Chart-Header-Modal"
              aria-labelledby="dropdownMenuButtonSM"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                transform: "translate3d(0px 33px 0px)",
                zIndex: "9",
              }}
              data-popper-placement="bottom-start"
            >
              <div className="headerMessagesHeader">

              </div>
              <div className="headerMessagesBody">

              </div>
              <div className="headerMessagesFooter">
                <span></span>
                <Link to = "/Messenger" style={{ textDecoration: "none"}}> 
                <span className="headerMessagesFooterAllChat">All Chat</span>
                </Link>
              </div>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButtonSM"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <div className="navIcon">
                <Badge badgeContent={1} color="error">
                  <Notifications className="navIconIcon" />
                </Badge>
              </div>
            </button>
            <ul
              className="dropdown-menu Notification-Chart-Header-Modal"
              aria-labelledby="dropdownMenuButtonSM"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                transform: "translate3d(0px 33px 0px)",
                zIndex: "9",
              }}
              data-popper-placement="bottom-start"
            >
             
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButtonSM"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <div className="navAvatar">
                <Avatar
                  alt="User Name"
                  src={
                    user ? user.profilePicture : "/assets/persons/avatar.jpg"
                  }
                  sx={{ width: 32, height: 32, marginLeft: 2 }}
                />
              </div>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButtonSM"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: "5px",
                transform: "translate3d(0px 33px 0px)",
                zIndex: "9",
              }}
              data-popper-placement="bottom-start"
            >
              <li>
                <Link
                  to={`/profile/${userId}`}
                  style={{ textDecoration: "none", color: "black" }}
                  className="dropdown-item"
                >
                  <ListAltOutlined /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/freelancer"
                  style={{ textDecoration: "none", color: "black" }}
                  className="dropdown-item"
                >
                  <ComputerOutlined /> Freelance?
                </Link>
              </li>
              <hr />
              <li
                className="dropdown-item"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <LockOutlined /> Log out
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="modal fade show align-items-center"
        id="exampleModalDefault"
        style={{ display: "none" }}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel">
                <button id="modalSearchButton">
                  <Search />
                </button>
                <input
                  id="modalSearchInput"
                  placeholder="try 'technology'"
                  autoComplete="none"
                  ref={searchString}
                  onChange={HandleSearch}
                />
                <button onClick={HandleClose} id="modalExitButton">
                  esc
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal_body_user">
                <div className="modal_body_user_title">
                  <Person /> User
                </div>
                <div className="modal_body_user_body">
                  {searchResult && searchResult.user.length !== 0 ? (
                    searchResult.user.map((user) => (
                      <div className="searchItem">
                        <img
                          src={user.profilePicture}
                          alt=""
                          className="searchImage"
                        />
                        <div className="searchInfos">
                          {user.firstName} {user.secondName}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      class="alert alert-info alert-dismissible fade show"
                      role="alert"
                    >
                      sorry no User found !
                    </div>
                  )}
                </div>
              </div>
              <div className="modal_body_gig">
                <div className="modal_body_gig_title">
                  <CreateNewFolder /> Gig
                </div>
                <div className="modal_body_gig_body">
                  {searchResult && searchResult.project.length !== 0 ? (
                    searchResult.project.map((project) => (
                      <div className="searchItem">
                        <img
                          src={project.image}
                          alt=""
                          className="searchImage"
                        />
                        <div className="searchInfos">{project.name}</div>
                      </div>
                    ))
                  ) : (
                    <div
                      class="alert alert-info alert-dismissible fade show"
                      role="alert"
                    >
                      sorry no Project found !
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
