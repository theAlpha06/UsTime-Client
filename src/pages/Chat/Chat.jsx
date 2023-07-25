import React, { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import './Chat.css';
import AuthContext from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/api";
import axios from "axios";
import Contacts from "../../components/Contacts";
import Welcome from "../../components/Welcome";
import ChatContainer from "../../components/ChatContainer";

function Chat() {
  const socket = useRef();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!authContext.isUserLoggedIn) {
      navigate('/login');
    }
  }, [authContext.isUserLoggedIn, navigate])
  
  const getCurrentUser = async () => {
    if (!authContext.isUserLoggedIn) {
      console.log('first')
      navigate('/login');
    } else {
      await axios.get(`${baseUrl}/user/currentuser/${authContext.userId}`)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const getAllUsers = async () => {
    if (!authContext.isUserLoggedIn) {
      navigate('/login');
    } else {
      await axios.get(`${baseUrl}/user/getallusers/${authContext.userId}`)
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [])

  useEffect(() => {
    getAllUsers();
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(`${baseUrl}`);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])



  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  useEffect(() => {
    if (!authContext.isUserLoggedIn) {
      navigate('/login');
    }
    if (window.innerWidth < 640) {
      const chatContainer = document.querySelector('.chat_contacts');
      const chatMessages = document.querySelector('.chat_messages');
      chatContainer.setAttribute("style", "width: 100%");
      chatMessages.setAttribute("style", "display: none");
    }
  })


  const handleResponsive = (data) => {
    const chatContainer = document.querySelector('.chat_contacts');
    const chatMessages = document.querySelector('.chat_messages');

    if (data === 'contacts' && (window.innerWidth < 640)) {
      chatContainer.setAttribute("style", "display: none");
      chatMessages.setAttribute("style", "width: 100%");
    }
    if (data === "messages" && (window.innerWidth < 640)) {
      chatContainer.setAttribute("style", "width: 100%");
      chatMessages.setAttribute("style", "display: none");
    }
  }


  return (
    <div className="chat_container">
      <div className='chat_content'>
        <div className="chat_contacts">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
            handleResponsive={handleResponsive}
          />
        </div>
        <div className="chat_messages">
          {
            currentChat === undefined ?
              <Welcome
                currentUser={currentUser}
              />
              :
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
                handleResponsive={handleResponsive}
              />
          }
        </div>
      </div>
    </div>
  )
}


export default Chat
