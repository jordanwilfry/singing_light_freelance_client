import {
  AttachFile,
  EmojiEmotions,
  ForumOutlined,
  Image,
  PictureAsPdf,
  Telegram,
} from "@material-ui/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { format } from "timeago.js";
import Conversation from "../../components/conversation/conversation";
import Header from "../../components/header/header";
import storage from "../../firebase";

import "./Messages.css";
import { Download } from "@mui/icons-material";
import { CircularProgress } from "@material-ui/core";

function Messages() {
  const userId = Cookies.get("SLF_id");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [files, setFiles] = useState(null);
  const socket = useRef();
  const [upload, setUpload] = useState(null);
  const [progress, setProgress] = useState(null);
  const [FilesURL, setFilesURL] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const scrollRef = useRef();

  var fileUrl = [];

  // upload files
  const HandleUpload = (file) => {
    console.log("op");
    setUpload(false);
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
        .get(`/conversation/${userId}`)
        .then((result) => {
          console.log(result.data);
          setConversations(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProduct();
  }, [userId]);

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
  }, [userId]);

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

  return (
    <>
      <Header />
      <div className="messengerContainer">
        <div className="messengerContainerLeft">
          <div className="messengerContainerLeftHeader">
            <ForumOutlined style={{ fontSize: "30px" }} />
            <div className="messengerContainerLeftTitle">CHATS</div>
          </div>
          {conversations.map((conv) => (
            <div onClick={() => setCurrentChat(conv)}>
              <Conversation
                key={conv._id}
                conversation={conv}
                userId={userId}
                currentChart={conv === currentChat}
              />
            </div>
          ))}
        </div>
        <div className="messengerContainerRight">
          {currentChat ? (
            <>
              <div className="messengerCenterButtom">
                {
                  <>
                    <div className="messageCenter">
                      {messages.map((message) => (
                        <div
                          ref={scrollRef}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            className={
                              message?.senderId === userId
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
                            {message?.text}
                            <div className="chartModelMainContainerMessageTime">
                              {format(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                }
                <div className="messageFooter">
                  <div className="messagesContainer">
                    <textarea
                      placeholder="white something..."
                      className="userMessage"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="messageFooterFooter">
                    <div>
                      <label htmlFor="chartModelMainContainerFooterAttachedFile">
                        <AttachFile className="attach" />
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
                      <EmojiEmotions className="emoji2" />
                    </div>
                    {files && (
                      <div style={{width: "88%"}}>
                        <div className="messengerContainerFiles">
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
                        </div>
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
                    <div className="sending" onClick={handleSubmit}>
                      <Telegram className="send" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <span className="noCurrentConversation">
              Open a conversation so that you can start a chat
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;
