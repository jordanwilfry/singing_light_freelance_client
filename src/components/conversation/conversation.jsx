import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import "./conversation.css"

function Conversation({conversation, userId, currentChart}) {

    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [messages, setMessages] = useState(null);
    const convId = Cookies.get('currentchartid')

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== userId);

        console.log(friendId)
    
        const getUser = async () => {
          try {
            const res = await axios.get("/user/" + friendId);
            const res2 = await axios.get("/project/" + conversation.productId);
            console.log(res2.data);
            setUser(res.data);
            setProduct(res2.data)
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [userId, conversation]);

      useMemo(() => {
        const getMessages =async() => {
            const res = await axios.get("/message/" + conversation._id);
            console.log(res.data);
            setMessages(res.data);
        }

        getMessages()
      }, [])
      
    return (
        <div>
            <div className={currentChart || convId === conversation._id ? "conversationCurrentContainer" : "conversationContainer"} onClick={()=>Cookies.remove("currentchartid")}>
                <div className="ConversationImage">
                   <img src={user && user.profilePicture} alt="" className="ConversationProfileImage"/>
                </div>
                <div className="conversationText">
                    <div className="conversationTop">
                        <span className="conversationUserName">
                            <b>{user?.firstName} - {product?.name}</b>
                        </span>
                        <span className="conversationTime">
                            2:35PM
                        </span>
                    </div>
                    <div className="conversationBottom">
                        <span className="ConversationLastMessage">{messages && messages[messages.length - 1].text}</span>
                        <span className="conversationUnReadMessage">3</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Conversation
