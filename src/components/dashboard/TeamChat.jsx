import React, { useState, useEffect } from "react";
import { withStyles, Frame, Header, Highlight, Line } from "arwes";
import { FaUsers } from "react-icons/fa6";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "../../redux/Auth/authSelectors";
import moment from "moment";
import { io } from "socket.io-client";
import { fetchTeamConversations } from "../../redux/Chat/chatOperations";
import { Link } from "react-router-dom";
const styles = (theme) => ({
  chatItem: {
    textDecoration: "none",
  },
  chatFrame: {
    alignItems: "center",
    display: "flex",
    padding: "8px",
    textDecoration: "none",
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
  unseenMessage: {
    backgroundColor: "yellow",
  },
});

const PersonalChat = ({ classes }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamConversations()).then((response) => {
      if (response.payload) {
        setTeamChats(response.payload);
      }
    });
  }, [dispatch]);
  const [teamChats, setTeamChats] = useState([]);

  const formatTime = (time) => {
    const now = moment();
    const messageTime = moment(time);
    if (now.isSame(messageTime, "day")) {
      return messageTime.format("HH:mm");
    } else {
      return messageTime.format("D/M/Y");
    }
  };

  return (
    <Frame animate>
      {teamChats?.map((chat) => (
        <Link to={`/chat`} className={classes.chatItem}>
          <Frame key={chat.id} className={classes.chatFrame}>
            <div className={classes.chatItem}>
              <div className={classes.chatItemContent}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaUsers />
                  &nbsp;
                  <div className={classes.chatItemName}>{chat.name}</div>
                </div>
                <div className={classes.chatItemLastMessage}>
                  {chat.lastMessage.sentByCurrentUser ? "You: " : ""}
                  {chat.lastMessage.text}
                </div>
                <div className={classes.chatItemTime}>
                  {formatTime(chat.lastMessage.timestamp)}
                </div>
                <div className={classes.chatItemTime}>
                  {chat.lastMessage.seen ? 1 : ""}
                </div>
              </div>
            </div>
          </Frame>
        </Link>
      ))}
    </Frame>
  );
};

export default withStyles(styles)(PersonalChat);
