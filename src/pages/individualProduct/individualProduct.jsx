import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import {
  Star,
  ThumbUp,
  ThumbDown,
  Chat,
  Cancel,
  AttachFile,
  Telegram,
  PictureAsPdf,
  Image,
} from "@material-ui/icons";
import { Avatar } from "@mui/material";

import { PayUnit } from "payunitjs";
import { format } from "timeago.js";
import "./individualProduct.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/loader";
import Cookies from "js-cookie";
import { Badge, CircularProgress } from "@material-ui/core";
import { io } from "socket.io-client";
import { Download } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";

function IndividualProduct() {
  const productId = useParams().productId;
  const userId = Cookies.get("SLF_id");
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState(null);
  const [ChatModel, setChatModel] = useState(false);
  const [files, setFiles] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [upload, setUpload] = useState(null);
  const [progress, setProgress] = useState(null);
  const [FilesURL, setFilesURL] = useState(null);
  
  const socket = useRef();
  var fileUrl = [];

  const scrollRef = useRef();

 // upload files
 const HandleUpload = (file) => {
  for (var i = 0; i < file.length; i++) {
    setProgress(0);
    const fileName = new Date().getTime() + file[i].name;
    const storageRef = ref(storage, `/course material/${fileName}`);

    console.log("uploading");
    const uploadTask = uploadBytesResumable(storageRef, file[i]);

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
          console.log(url);
          fileUrl.push(url);
        });
      }
    );
  }
  setFilesURL(fileUrl);
  finalization();
  console.log(fileUrl);
};



  useEffect(() => {
    const fetchProduct = async () => {
      await axios
        .get(`/project/${productId}`)
        .then((result) => {
          fetchUser(result.data.userId);
          fetchResponse(result.data._id);
          console.log(result.data);
          setProduct(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchUser = async (id) => {
      await axios.get(`/user/${id}`).then((res) => {
        console.log(res.data);
        setUser(res.data);
        fetchConversation(id);
      });
    };

    const fetchResponse = async (id) => {
      const res2 = await axios.get(`/project/response/${id}`);
      console.log(res2.data);
      setResponse(res2.data);
    };

    const fetchConversation = async (id) => {
      const res2 = await axios.get(
        `/conversation/find/${id}/${userId}/${productId}`
      );

      setCurrentChat(res2.data);
    };

    fetchProduct();
  }, [productId, userId]);

  // creating new conversation
  const CreatingNewConversation = async () => {
    await axios
      .post("/conversation", {
        currentUser: userId,
        otherUser: user._id,
        productId: productId,
      })
      .then((res) => {
        console.log(res.data);
        setCurrentChat(res.data);
      });
  };

  // messages
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  console.log(socket);

  useEffect(() => {
    if (arrivalMessage) {
      currentChat?.members.includes(arrivalMessage.senderId) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  console.log(arrivalMessage);

  useEffect(() => {
    socket.current.emit("addUserConect", userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files) {
      HandleUpload(files);
    }
    else if (!message) {
      alert("you can't send and empty message");
    } else {
      finalization()
    }
  };

  const finalization = async ()=>{
    const newMessage = {
      senderId: userId,
      text: message,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userId
    );

    console.log(receiverId);

    console.log(receiverId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: receiverId,
      text: message,
    });

    try {
      const res = await axios.post("/message/", newMessage);
      setMessages([...messages, res.data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let box = document.querySelector("body");
  let largeur = box.offsetWidth;

  return (
    <>
      <Header />
      <ItemsNav />
      {ChatModel && (
        <div className="chartModelContainer">
          <div className="chartModelMainContainer">
            <div className="chartModelMainContainerHeader">
              <Cancel
                className="chartModelMainContainerHeaderClose"
                onClick={() => {
                  setChatModel(false);
                }}
              />
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={2}
                color="warning"
              >
                <Avatar
                  alt="img"
                  src={user && user.profilePicture}
                  sx={{ width: 45, height: 45 }}
                />
              </Badge>
              <div className="chartModelMainContainerHeaderUserInfos">
                {user && user.firstName} {user && user.secondName}
              </div>
            </div>
            <div className="chartModelMainContainerMessages" ref={scrollRef}>
              {messages.map((message) => (
                <div
                  ref={scrollRef}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    className={
                      message.senderId === userId
                        ? "chartModelMainContainerMessage chartModelMainContainerMessageOwner"
                        : "chartModelMainContainerMessage"
                    }
                    id = {message.attachedFiles?.length > 0 && "chartModelMainContainerMessage"}
                    >
                      {message.attachedFiles?.length > 0 && (
                        <div className="attachFiles">
                          <div className="download" onClick={() => {setDownloading(!downloading)}}>
                           {!downloading ? <Download style={{fontSize: "30px"}}/>
                            :<CircularProgress  style={{fontSize: "30px", color: "white"}}/>}
                          </div>
                        </div>
                      )}
                    {message.text}
                    <div className="chartModelMainContainerMessageTime">
                      {format(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {files && (
                <div className="chartModelMainContainerFiles">
                  {files.length > 0 &&
                    Array.from(files).map((file) => (
                      <div className="chartModelMainContainerFile">
                        {file.type.includes("image") ? (
                          <Image />
                        ) : file.type === "application/pdf" ? (
                          <PictureAsPdf />
                        ) : (
                          <AttachFile />
                        )}
                      </div>
                    ))}
                  <div class="progress chartModelMainContainerProgress">
                    <div
                      class="progress-bar bg-primary"
                      accept="application/pdf"
                      role="progressbar"
                      style={{ width: `10%` }}
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="chartModelMainContainerFooter">
              <label
                htmlFor="chartModelMainContainerFooterAttachedFile"
                className="chartModelMainContainerFooterAttachedFiles"
              >
                <AttachFile />
              </label>
              <input
                type="file"
                id="chartModelMainContainerFooterAttachedFile"
                multiple="true"
                onChange={(e) => {
                  setFiles(e.target.files);
                  console.log(e.target.files);
                }}
              />
              <textarea
                className="chartModelMainContainerFooterInput"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <div className="chartModelMainContainerFooterSendButton">
                <Telegram onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}

      {product ? (
        <div className="individualProductContainer">
          <div className="individualProductContainerLeft">
            <img
              src={product.image}
              alt=""
              className="individualProductContainerLeftImage"
            />
            <div className="individualProductContainerLeftSmallDescription">
              {product.smallDesc}
            </div>
            <div className="individualProductContainerLeftAbout">
              <div className="individualProductContainerLeftAboutTitle">
                About the Gig
              </div>
              <div className="individualProductContainerLeftAboutDescription">
                {product.about}
              </div>
              <ul className="individualProductContainerLeftAboutDetail">
                {product.detail.map((detail) => (
                  <li>
                    <b>{detail}</b>
                  </li>
                ))}
              </ul>
              <div
                className="individualProductContainerRight"
                id="individualProductContainerRightResponsive"
              >
                <div className="individualProductContainerRightPrice">
                  ${product.price}
                </div>
                <div className="individualProductContainerRightDetail">
                  <div className="individualProductContainerRightDetailItem">
                    <div>
                      <b>Deliver in</b>
                    </div>
                    <div> {product.deliveryTime} day(s)</div>
                  </div>
                  <div className="individualProductContainerRightDetailItem">
                    <div>
                      <b>Rating</b>
                    </div>
                    <div>
                      <Star style={{ color: "orange" }} /> 5
                    </div>
                  </div>
                  <div className="individualProductContainerRightDetailItem">
                    <div>
                      <b>Respond time</b>
                    </div>
                    <div>5 minutes</div>
                  </div>
                </div>
                <div className="individualProductContainerRightUserDescription">
                  {user && user.description}
                </div>
                <div className="btn btn-warning">
                  <button
                    id={800 > largeur && "payunit-pay"}
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    Buy now
                  </button>
                </div>
                <div
                  className="btn btn-primary"
                  style={{
                    width: "80%",
                    marginTop: "8px",
                  }}
                  onClick={() => {
                    setChatModel(true);
                    CreatingNewConversation();
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      width: "80%",
                      color: "white",
                    }}
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>

            <div className="individualProductContainerLeftReview">
              <div className="individualProductContainerLeftReviewTitle">
                Review
              </div>
              {response && response.length !== 0 ? (
                response.map((response) => (
                  <>
                    <div className="individualProductContainerLeftReviewContainer">
                      <div className="individualProductContainerLeftReviewContainerTop">
                        <Avatar
                          alt="User Name"
                          src="/assets/persons/avatar.jpg"
                          sx={{ width: 25, height: 25, marginRight: 1 }}
                        />
                        ~john Doe
                      </div>
                      <div className="individualProductContainerLeftReviewContainerMessage">
                        {response && response.text}
                      </div>
                      <div className="individualProductContainerLeftReviewContainerBottom">
                        <div className="individualProductContainerLeftReviewContainerBottomLeft">
                          <ThumbUp style={{ marginRight: "15px" }} />
                          <ThumbDown />
                        </div>
                        <div className="individualProductContainerLeftReviewContainerBottomRight">
                          {user && user._id !== userId && <Chat />}
                        </div>
                      </div>
                    </div>
                    {response.response && (
                      <div className="individualProductContainerLeftReviewContainerResponse">
                        <div className="individualProductContainerLeftReviewContainerResponseTop">
                          <Avatar
                            alt="User Name"
                            src="/assets/persons/avatar.jpg"
                            sx={{ width: 25, height: 25, marginRight: 1 }}
                          />
                          ~john Doe
                        </div>
                        <div className="individualProductContainerLeftReviewContainerResponseMessage">
                          {response.response}
                        </div>
                      </div>
                    )}
                  </>
                ))
              ) : (
                <div
                  class="alert alert-info "
                  role="alert"
                  style={{ margin: "20vh 20px 10px" }}
                >
                  You have no review at this moment, Please check later...
                </div>
              )}
            </div>
          </div>
          <div className="individualProductContainerRight">
            <div className="individualProductContainerRightPrice">
              ${product.price}
            </div>
            <div className="individualProductContainerRightDetail">
              <div className="individualProductContainerRightDetailItem">
                <div>
                  <b>Deliver in</b>
                </div>
                <div> {product.deliveryTime} days</div>
              </div>
              <div className="individualProductContainerRightDetailItem">
                <div>
                  <b>Rating</b>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Star style={{ color: "orange" }} /> 5
                </div>
              </div>
              <div className="individualProductContainerRightDetailItem">
                <div>
                  <b>Respond time</b>
                </div>
                <div>5 minutes</div>
              </div>
            </div>
            <div className="individualProductContainerRightUserDescription">
              {user && user.description}
            </div>
            <div className="btn btn-warning">
              <button
                id={800 < largeur && "payunit-pay"}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                Buy now
              </button>
            </div>
            <div
              className="btn btn-primary"
              style={{
                width: "80%",
                marginTop: "8px",
              }}
              onClick={() => {
                setChatModel(true);
                CreatingNewConversation();
              }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  width: "80%",
                  color: "white",
                }}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default IndividualProduct;
