import React, { useState } from "react";
import { withStyles, Frame, Header as ArwesHeader } from "arwes";
import { FaUsers } from "react-icons/fa6";

const styles = (theme) => ({});

const PersonalChat = (props) => {
  const { classes } = props;

  const [chats] = useState([
    {
      id: 1,
      colleagueName: "John Doe",
      lastMessage: "Hey there!",
      unreadMessages: 2,
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      colleagueName: "Jane Smith",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
      timestamp: "11:45 AM",
    },
    {
      id: 2,
      colleagueName: "Jane Smith",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
      timestamp: "11:45 AM",
    },
    {
      id: 2,
      colleagueName: "Jane Smith",
      lastMessage: "How are you doing?",
      unreadMessages: 0,
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

export default withStyles(styles)(PersonalChat);
