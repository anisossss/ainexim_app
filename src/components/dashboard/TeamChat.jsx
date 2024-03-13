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
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa6";

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
const TeamChat = (props) => {
  const { classes } = props;
  const [chats] = useState([
    {
      id: 1,
      teamName: "Frontend Team",
      lastMessage: "Completed the new user dashboard views",
      unreadMessages: 2,
      avatar: "frontend_team_avatar.png",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      teamName: "Backend Team",
      lastMessage: "API endpoints for user registration completed",
      unreadMessages: 5,
      avatar: "backend_team_avatar.png",
      timestamp: "Yesterday, 11:45 AM",
    },
    {
      id: 3,
      teamName: "QA Team",
      lastMessage: "Started testing on the new updates",
      unreadMessages: 3,
      avatar: "qa_team_avatar.png",
      timestamp: "Yesterday, 9:00 PM",
    },
    {
      id: 4,
      teamName: "DevOps Team",
      lastMessage: "Set up new CI/CD pipeline for the project",
      unreadMessages: 0,
      avatar: "devops_team_avatar.png",
      timestamp: "Today, 1:00 PM",
    },
    {
      id: 5,
      teamName: "Mobile Team",
      lastMessage: "Finished integration of new chat feature on app",
      unreadMessages: 3,
      avatar: "mobile_team_avatar.png",
      timestamp: "Today, 1:15 PM",
    },
  ]);
  return (
    <Frame animate>
      {chats.map((chat) => (
        <Frame key={chat.id} className={classes.chatItem}>
          <div className={classes.primaryText}>
            <FaUsers /> {chat.teamName}
          </div>
          <span className={classes.secondaryText}>{chat.lastMessage}</span>
          <br></br>
          <span>{chat.timestamp}</span>
        </Frame>
      ))}
    </Frame>
  );
};

export default withStyles(styles)(TeamChat);
