import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { io } from "socket.io-client";
import { TbDoorExit } from "react-icons/tb";
import { CONSTANTS } from "../../../constants/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";

const styles = () => ({
  voiceButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    margin: "auto",
    height: "60vh",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  userMessageContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: "10px",
  },
  recieverMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
    borderRadius: "50%",
    marginLeft: "10px", // Adjusted margin
  },
  username: {
    fontSize: "17px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "16px",
    borderRadius: "10px",
    width: "20em !important",
    border: "1px solid #000",
    backgroundColor: "#f0f0f0",
    color: "black",
    marginTop: "4px",
    padding: "10px",
  },
  chatContainer: {
    overflow: "scroll",
    height: "60vh",
    paddingBottom: "80px",
  },
  login: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    padding: "0 10px",
    backgroundColor: "#000",
  },
  send: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: "0 10px",
    backgroundColor: "#000",
  },
  sendBtn: {
    padding: "10px",
    alignItems: "center",
  },
  content: {
    padding: "1em",
  },
});

const ConferenceRoom = (props) => {
  const history = useHistory();
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  const [subject, setSubject] = useState(
    "This subject encourages the team leaders to engage in  discussions about improving the checkout process and payment  integration for their booking platform. It prompts them to  interact, share insights, and brainstorm solutions to enhance  user experience and streamline payment transactions."
  );
  const [voiceMode, setVoiceMode] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorderRef = useRef(null);

  let mediaRecorder;

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
  useEffect(() => {
    const client = io(`${CONSTANTS.SOCKET_URL}`);
    setSocket(client);

    client.on("send", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const joinRoom = () => {
    socket.emit("joined", { userName });
    setIsLoggedIn(true);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const message = {
      name: userName,
      message: inputMessage,
    };

    socket.emit("send", message);

    setInputMessage("");
  };
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  const exitMeeting = async () => {
    const userAResponses = [];
    const userBResponses = [];

    messages.forEach((message) => {
      if (message.name === userName) {
        userAResponses.push(message.message);
      } else {
        userBResponses.push(message.message);
      }
    });

    try {
      const response = await axios.post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-meeting`,
        {
          userAResponses,
          userBResponses,
          subject,
        }
      );
      console.log(response.data);
      history.push(
        `/world/departments/meeting-evaluation/${response.data.meetingChatEvaluation._id}`
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Frame animate={true} className={classes.frame}>
      <div id="chat-container" className={classes.chatContainer}>
        {isLoggedIn ? (
          <>
            <div
              style={{
                padding: "1em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>Welcome, {userName}!</p>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "red",
                  justifyContent: "center",
                }}
                onClick={exitMeeting}
              >
                Quit Meeting <TbDoorExit />
              </Button>
            </div>
            <div className={classes.content}>
              <h2>
                Streamlining Checkout Process and Payment Integration for Our
                Online Booking Platform
              </h2>
              <p style={{ fontSize: "14px" }}>{subject}</p>
            </div>
            <div className="Messages">
              {messages.map((m, index) => {
                const isCurrentUser = m.name === userName;
                return (
                  <div
                    key={index}
                    className={
                      isCurrentUser
                        ? classes.userMessageContainer
                        : classes.recieverMessageContainer
                    }
                  >
                    {!isCurrentUser && (
                      <img
                        src={"/img/avatars/avatar.svg"}
                        alt=" "
                        className={classes.avatar}
                      />
                    )}
                    {isCurrentUser && (
                      <img
                        src={"/img/avatars/me.jpeg"}
                        alt=" "
                        className={classes.avatar}
                      />
                    )}
                    <div>
                      <span className={classes.username}>{m.name}</span>
                      <br />
                      <span className={classes.message}>{m.message}</span>
                    </div>
                  </div>
                );
              })}
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
                    <div class="lds-ripple">
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
                    borderRadius: "5px",
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
          </>
        ) : (
          <div className={classes.login}>
            <input
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  joinRoom();
                }
              }}
            />
            <div className={classes.sendBtn}>
              <Button onClick={joinRoom}>Login</Button>
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ConferenceRoom);
