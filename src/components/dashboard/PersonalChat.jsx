import React, { useState } from "react";
import { withStyles, Frame, Header, Highlight, Line } from "arwes";
import { FaUser } from "react-icons/fa6";

const styles = (theme) => ({
  chatItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
  },
  avatar: {
    marginRight: "16px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
  },
  primaryText: {
    fontWeight: "bold",
  },
});

const PersonalChat = ({ classes }) => {
  const [chats] = useState([
    {
      id: 1,
      colleagueName: "John Doe",
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
      id: 3,
      colleagueName: "Michael Johnson",
      lastMessage: "Could you send me the file?",
      unreadMessages: 5,
      avatar: "michael_avatar.png",
      timestamp: "Yesterday",
    },
    {
      id: 4,
      colleagueName: "Sophia Williams",
      lastMessage: "I'm going to be late for the meeting.",
      unreadMessages: 0,
      avatar: "sophia_avatar.png",
      timestamp: "3:40 PM",
    },
    {
      id: 5,
      colleagueName: "Lucas Brown",
      lastMessage: "Hello team, happy Monday!",
      unreadMessages: 3,
      avatar: "lucas_avatar.png",
      timestamp: "Monday, 8:00 AM",
    },
  ]);

  return (
    <Frame animate>
      {chats.map((chat) => (
        <Frame key={chat.id} className={classes.chatItem}>
          <div className={classes.primaryText}>
            <FaUser /> {chat.colleagueName}
          </div>
          <span className={classes.secondaryText}>{chat.lastMessage}</span>
          <br></br>
          <span>{chat.timestamp}</span>
        </Frame>
      ))}
    </Frame>
  );
};

export default withStyles(styles)(PersonalChat);
