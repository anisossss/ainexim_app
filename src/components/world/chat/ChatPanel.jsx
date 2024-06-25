import React, { useState, useEffect, useRef } from "react";
import { withStyles, Frame, Words, Button, Highlight } from "arwes";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { CONSTANTS } from "../../../constants/api";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "../../../redux/Auth/authSelectors";
import moment from "moment";
import { io } from "socket.io-client";
import {
  activityStatus,
  // createNewConversation,
  // createNewTeamConversation,
  fetchConversations,
  fetchConversation,
  postMessage,
  fetchTeamConversations,
  fetchTeamConversation,
} from "../../../redux/Chat/chatOperations";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from "react-icons/io5";

const styles = (theme) => ({
  chatList: {
    width: "40%",
    padding: "1em",
    height: "70vh",
    overflowY: "scroll",
    marginRight: "2em",
    marginTop: "3em",
    marginBottom: "6em",
  },
  chatContainer: {
    width: "80%",
    maxHeight: "100vh",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    backgroundColor: "#121212",
    overflowY: "scroll",
    height: "500px",
    marginBottom: "20px",
    paddingTop: "5em",
  },
  userMessageContainer: {
    display: "grid",
    justifyContent: "flex-end",
    marginBottom: "30px",
  },
  receiverMessageContainer: {
    display: "grid",
    justifyContent: "flex-start",
    marginBottom: "30px",
  },
  messageContainer: {
    width: "100%",
  },
  messageHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  message: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "#0f0",
    wordWrap: "break-word",
  },
  userMessage: {
    backgroundColor: "#1a1a1a",
    alignItems: "center",
  },
  receiverMessage: {
    backgroundColor: "#333",
  },
  chatItemTime: {
    fontSize: "12px",
    color: "#999",
  },
  chatHeaderImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },

  messageInputContainer: {
    alignItems: "center",
  },
  messageInput: {
    flexGrow: 1,
    marginRight: "10px",
  },
  chatItem: {
    display: "flex",
    cursor: "pointer",
    width: "100%",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#033",
    },
  },
  chatItemImage: {
    width: "20%",
    padding: "10px",
  },
  chatItemName: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  chatItemLastMessage: {
    fontSize: "14px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "4em",
  },
  navSection: {
    marginBottom: "1em",
    position: "fixed",
    zIndex: 999,
    top: 100,
    width: "23%",
  },
  activeButton: {
    background: "#4BF2F6",
  },
  activeChatItem: {
    background: "#4BF2F6",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    padding: "1em",
    position: "fixed",
    width: "41.3em",
    top: 84,
    zIndex: 999,
    backgroundColor: "rgb(75,242,246, 0.1)",
    backdropFilter: "blur(10px) brightness(110%)",
    marginBottom: "4em",
  },

  chatHeaderDetails: {
    display: "flex",
    flexDirection: "column",
  },
  chatHeaderName: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#fff",
  },
  chatHeaderStatus: {
    fontSize: "1em",
    color: "#0f0",
    display: "flex",
  },
  mediaBtns: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "40%",
  },
  seen: {
    display: "flex !important",
    alignItems: "center !important",
  },
  online: {},

  offline: {
    color: "red",
  },
});
const ChatPanel = (props) => {
  const [currentView, setCurrentView] = useState("personal");
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const { classes } = props;
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [personalChats, setPersonalChats] = useState([]);
  const [teamChats, setTeamChats] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [teamConversation, setTeamConversation] = useState();
  const [onlineUser, setOnlineUser] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorderRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const token = useSelector(selectToken);

  /*//////////////////////////////*/

  useEffect(() => {
    if (voiceMode) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [voiceMode]);

  useEffect(() => {
    if (audioChunks.length > 0) {
      sendAudioToServer();
    }
  }, [audioChunks]);

  const toggleVoiceMode = () => {
    setVoiceMode((prevVoiceMode) => !prevVoiceMode);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          setAudioChunks((prevChunks) => [...prevChunks, e.data]);
        };
        mediaRecorderRef.current.start();
        console.log(audioChunks);
        console.log(
          "Recording stopped. MediaRecorder state:",
          mediaRecorderRef.current.state
        );
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      console.log(
        "Recording stopped. MediaRecorder state:",
        mediaRecorderRef.current.state
      );
    }
  };

  const sendAudioToServer = async () => {
    try {
      const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.mp3");

      const response = await axios.post(
        `${CONSTANTS.API_URL}/utils/speech-to-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscribedText(response.data.text);
      setInputMessage(response.data.text);
      setAudioChunks([]);
    } catch (error) {
      console.error("Error sending audio to server:", error);
    }
  };
  /*//////////////////////////////*/

  useEffect(() => {
    dispatch(fetchConversations()).then((response) => {
      if (response.payload) {
        setPersonalChats(response.payload);
      }
    });
    dispatch(fetchTeamConversations()).then((response) => {
      if (response.payload) {
        setTeamChats(response.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const client = io(`${CONSTANTS.SOCKET_URL}`, {
        auth: { token },
      });
      setSocket(client);

      client.on("connect", () => {
        if (selectedChat) {
          client.emit("joinRoom", selectedChat.id);
          console.log("Connected and joined room: ", selectedChat.id);
        }
      });

      client.on("disconnect", () => {
        console.log("Disconnected from socket");
        setSocket(null);
      });

      return () => {
        if (client) {
          client.disconnect();
        }
      };
    }
  }, [token, selectedChat]);

  useEffect(() => {
    if (selectedChat && socket) {
      socket.emit("joinRoom", selectedChat._id);
      console.log("Joined room: ", selectedChat._id);

      socket.on("receiveMessage", (message) => {
        console.log("Received message: ", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveRoom", selectedChat._id);
        socket.off("receiveMessage");
      };
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleChatSelection = async (chat) => {
    setSelectedChat(chat);
    if (currentView === "personal") {
      try {
        const response = await dispatch(fetchConversation(chat.id));
        if (response.payload && response.payload.conversation) {
          setConversation(response.payload.conversation);
          setMessages(response.payload.messages);
          setOnlineUser(response.payload.otherUserOnlineStatus);
          setOtherUserName(response.payload.otherUserName);
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    } else if (currentView === "team") {
      try {
        const response = await dispatch(fetchTeamConversation(chat._id));
        if (response.payload && response.payload.conversation) {
          console.log(response);
          setTeamConversation(response.payload.conversation);
          setMessages(response.payload.messages);
        }
      } catch (error) {
        console.error("Error fetching team conversation:", error);
      }
    }
  };
  const sendMessage = async () => {
    if (inputMessage.trim() && selectedChat && user && user._id && user.name) {
      try {
        let messageData = {};
        if (currentView === "personal") {
          messageData = {
            conversationId: selectedChat.id,
            text: inputMessage,
          };
        } else if (currentView === "team") {
          messageData = {
            conversationId: selectedChat._id,
            text: inputMessage,
          };
        }

        const response = await dispatch(postMessage(messageData));

        if (socket) {
          const newMessage = {
            ...response.payload,
            sender: {
              _id: user._id,
              name: user.name,
            },
            timestamp: new Date().toISOString(),
          };
          socket.emit("sendMessage", newMessage);
          console.log("Sent message: ", newMessage);
        }

        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("Missing required data for sending message");
    }
  };

  const formatTime = (time) => {
    const now = moment();
    const messageTime = moment(time);
    if (now.isSame(messageTime, "day")) {
      return messageTime.format("HH:mm");
    } else {
      return messageTime.format("D/M/Y");
    }
  };

  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const renderChatItems = (chats) => {
    if (!Array.isArray(chats)) {
      return null;
    }

    return chats.map((chat) => (
      <Frame
        key={chat._id}
        onClick={() => handleChatSelection(chat)}
        className={
          selectedChat && selectedChat.id === (chat.id || chat._id)
            ? classes.activeChatItem
            : ""
        }
      >
        <Highlight>
          <div className={classes.chatItem}>
            <div className={classes.chatItemSender}>{chat.senderName}</div>{" "}
            <img
              src={"/img/avatars/avatar.svg"}
              alt="Avatar"
              className={classes.chatItemImage}
            />
            <div className={classes.chatItemContent}>
              <div>
                <div className={classes.chatItemName}>{chat.name}</div>
                <div className={classes.chatItemLastMessage}>
                  {chat.lastMessage.sentByCurrentUser ? "You: " : ""}
                  {chat.lastMessage.text}
                </div>
              </div>
              <div className={classes.chatItemTime}>
                {formatTime(chat.lastMessage.timestamp)}
              </div>
            </div>
          </div>
        </Highlight>
      </Frame>
    ));
  };

  const renderMessages = () => {
    if (!messages || messages.length === 0) {
      return <div>No messages</div>;
    }

    return messages.map((m, index) => {
      const isCurrentUser = m.sender && user && m.sender._id === user._id;

      return (
        <div key={index}>
          <div
            className={
              isCurrentUser
                ? classes.userMessageContainer
                : classes.receiverMessageContainer
            }
          >
            {!isCurrentUser && (
              <div className={classes.messageHeader}>
                <img
                  src={"/img/avatars/avatar.svg"}
                  alt="Avatar"
                  className={classes.chatHeaderImage}
                />
                <span>{m.sender.name}</span>
              </div>
            )}
            <div className={classes.messageContainer}>
              <div
                className={`${classes.message} ${
                  isCurrentUser ? classes.userMessage : classes.receiverMessage
                }`}
              >
                {m.text}
                <br></br>

                <div className={classes.seen}>
                  <span className={classes.chatItemTime}>
                    {formatTime(m.timestamp)}
                  </span>
                  &nbsp;
                  <span>
                    {m.seen ? (
                      <IoCheckmarkDoneSharp stroke="#4BF2F6" />
                    ) : (
                      <IoCheckmarkSharp />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        maxHeight: "80vh",
      }}
    >
      <div className={classes.chatList}>
        <div className={classes.navSection}>
          <div className={classes.navButtons}>
            <Button
              className={currentView === "personal" ? classes.activeButton : ""}
              onClick={() => setCurrentView("personal")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <FaUser />
              &nbsp;Personal
            </Button>
            <Button
              className={currentView === "team" ? classes.activeButton : ""}
              onClick={() => setCurrentView("team")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <FaUsers />
              &nbsp; Team
            </Button>
          </div>
        </div>
        {currentView === "personal"
          ? renderChatItems(personalChats)
          : renderChatItems(teamChats)}
      </div>
      <div className={classes.chatContainer} ref={chatBoxRef}>
        {selectedChat && (
          <div className={classes.chatHeader}>
            <img
              src={"/img/avatars/avatar.svg"}
              alt="Avatar"
              className={classes.chatHeaderImage}
            />
            <div className={classes.chatHeaderDetails}>
              <div className={classes.chatHeaderName}>{selectedChat.name}</div>
              <div
                className={`${classes.chatHeaderStatus} ${
                  onlineUser ? classes.online : classes.offline
                }`}
              >
                {onlineUser ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        )}
        <div className={classes.chatBox} id="chat-container">
          {renderMessages()}

          <div ref={chatEndRef} />
        </div>
        <div className={classes.send}>
          <Frame
            style={{
              display: voiceMode ? "block" : "none",
              padding: "0.5em",
            }}
          >
            <Words animate style={{ fontSize: "7px" }}>
              {voiceMode ? "Voice Mode ON" : "Voice Mode OFF"}
            </Words>
          </Frame>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              type="button"
              id="voice-button"
              className={classes.voiceButton}
              onClick={toggleVoiceMode}
            >
              {voiceMode ? (
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <FaMicrophoneAlt />
              )}
            </Button>
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
              }}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <div className={classes.sendBtn}>
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ChatPanel);
