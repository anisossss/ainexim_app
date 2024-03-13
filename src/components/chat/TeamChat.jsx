import {
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
  Frame,
  Appear,
  Table,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "../publicComp/Clickable";
import Centered from "../publicComp/Centered";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa6";

const styles = (theme) => ({});

const TeamChat = (props) => {
  const { classes } = props;
  const [chats] = useState([
    {
      id: 1,
      colleagueName: "Alex Mbewe",
      lastMessage: "Hey there!",
      unreadMessages: 2,
      avatar: "john_avatar.png",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      colleagueName: "Jane Smith",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
      avatar: "jane_avatar.png",
      timestamp: "11:45 AM",
    },
    {
      id: 2,
      colleagueName: "Anis Khalef",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
      avatar: "jane_avatar.png",
      timestamp: "11:45 AM",
    },
    {
      id: 2,
      colleagueName: "Jane Smith",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
      avatar: "jane_avatar.png",
      timestamp: "11:45 AM",
    },
  ]);

  return (
    <Frame className="chat_container" animate>
      {chats.map((chat) => (
        <Frame key={chat.id} style={{ marginBottom: "1em" }}>
          <ArwesHeader>
            <div className="chat_item">
              <div className="chat_name">
                <FaUsers />
                <span className="header">{chat.colleagueName}</span>
              </div>
              <span className="timestamp">{chat.timestamp}</span>
            </div>
          </ArwesHeader>
          <span className="last">{chat.lastMessage}</span>
        </Frame>
      ))}
    </Frame>
  );
};

export default withStyles(styles)(TeamChat);
