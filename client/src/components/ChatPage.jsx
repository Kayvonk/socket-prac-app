import { useEffect, useState } from "react";
import "../styles/ChatPage.css";
// import socketIO from "socket.io-client";
import OnlineUsers from "./OnlineUsers";
import OpenChats from "./OpenChats";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [roomSelected, setRoomSelected] = useState(false);
  const [rooms, setRooms] = useState([])
  // const [openChats, setOpenChats] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
    socket.on("newUserResponse", (data) => setUsers(data));
    console.log("users:", users);
  }, [socket, users]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    console.log("messages:", messages);
  }, [socket, messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    //sends the username and socket ID to the Node.js server
    try {
      socket.emit("newUser", { userName, socketID: socket.id });
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
    }
  };

  const handleRoomForm = (e) => {
    e.preventDefault();
    //sends the username and socket ID to the Node.js server
    try {
      socket.emit("newRoom", { roomName});
      setRooms([...rooms, roomName])
      setRoomSelected(true);
    } catch (err) {
      setRoomSelected(false);
    }
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    //sends the username and socket ID to the Node.js server
    try {
      socket.emit("message", {
        text: messageInput,
        name: userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessageInput("")
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleRoomName = (e) => {
    const { value } = e.target;
    setRoomName(value);
  };

  const handleMessageInput = (e) => {
    const { value } = e.target;
    setMessageInput(value);
  };

  return (
    <main>
      <aside>
        <OnlineUsers users={users} />
      </aside>
      <section id="chatPageContainer">
        <div id="chatForms">
          {!loggedIn ? (
            <form id="loginForm" onSubmit={handleLogin}>
              <label htmlFor="userName">Select your name:</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleUserName}
              ></input>
              <button type="submit">Enter</button>
            </form>
          ) : roomSelected ? (
            <div id="chatBoxContainer">
              <div id="chatTextArea">
                {messages.map((message) => {return <div className="chatMessage" key={message.id}> {`${message.name}: ${message.text}`} </div>})}
              </div>
              <form id="messageForm" onSubmit={handleMessageSend}>
                <div id="messageText">
                  <input
                    type="text"
                    name="messageInput"
                    value={messageInput}
                    onChange={handleMessageInput}
                  ></input>
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
          ):
          <form id="roomForm" onSubmit={handleRoomForm}>
              <label htmlFor="roomName">Select your room name:</label>
              <input
                type="text"
                name="roomName"
                value={roomName}
                onChange={handleRoomName}
              ></input>
              <button type="submit">Enter</button>
            </form>
        
        
        }
        </div>
      </section>
      <aside>
        <OpenChats rooms={rooms}/>
      </aside>
    </main>
  );
}
