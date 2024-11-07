import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import axios from "axios";
import { useStateValue } from "../ContextApi/StateProvider";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [updatedAt, setUpdatedAt] = useState(""); // Corrected variable name
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      axios
        .get(`http://localhost:5000/room/${roomId}`)
        .then((response) => {
          setRoomName(response.data.name);
          setUpdatedAt(response.data.updatedAt); // Ensure this field exists in your schema
        })
        .catch((error) => console.error(error)); // Handle errors

      axios
        .get(`http://localhost:5000/messages/${roomId}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => console.error(error)); // Handle errors
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    await axios
      .post("http://localhost:5000/messages/new", {
        message: input,
        name: user.displayName,
        timestamp: new Date().toISOString(), // Store timestamp as ISO string
        uid: user.uid,
        roomId: roomId,
      })
      .catch((error) => console.error(error)); // Handle errors
    setInput("");
  };

  useEffect(() => {
    const pusher = new Pusher("1c7718a423bea8feb6c1", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
<div className="chat">
  <div className="chat__header">
    <Avatar
      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`}
      alt="Avatar"
    />
    <div className="chat__headerInfo">
      <h3>{roomName ? roomName : "WELCOME TO WHATSAPP"}</h3>
      <p>
        {updatedAt
          ? `Last update at ${new Date(updatedAt).toLocaleString()}`
          : "Click on any Group"}
      </p>
    </div>
    <div className="chat__headerRight">
      <IconButton>
        <SearchOutlined />
      </IconButton>
      <IconButton>
        <AttachFile />
      </IconButton>
      <IconButton>
        <MoreVert />
      </IconButton>
    </div>
  </div>
  <div className="chat__body">
    {messages.map((message, index) => (
      <p
        className={`chat__message ${
          message.uid === user.uid && "chat__receiver"
        }`}
        key={index}
      >
        <span className="chat__name">{message.name}</span>
        {message.message}
        <span className="chat__timestamp">
          {new Date(message.timestamp).toLocaleString()}
        </span>
      </p>
    ))}
  </div>
  <div className="chat__footer">
    <InsertEmoticon />
    <form onSubmit={sendMessage}>
      <input
        placeholder="Type a message"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button type="submit">Send</button>
    </form>
  </div>
</div>

  );
};

export default Chat;
