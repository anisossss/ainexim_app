import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { io } from "socket.io-client";
import { TbDoorExit } from "react-icons/tb";
import { CONSTANTS } from "../../../../constants/api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/Auth/authSelectors";

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
    marginLeft: "10px",
  },
  username: {
    fontSize: "17px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "16px",
    backgroundColor: "#f0f0f0",
    color: "black",
    marginTop: "16px",
    padding: "6px ",
    borderRadius: "5px",
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
const MeetingRoom = (props) => {
  const [meetingData, setMeetingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const level = user ? user.level : null;
  const name = user ? user.name : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL}/generation/get-web-meeting/6617597df907b1371839e8bc`
        );
        setMeetingData(response.data.meeting);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting task data from backend:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level]);
  const [step, setStep] = useState(1);
  const history = useLocation();
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
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
  }, []); // Empty dependency array ensures this useEffect runs only once, when the component mounts

  const joinRoom = () => {
    if (!roomId.trim()) return;
    setStep(2); // Move to step 2 (Chat Interface)
    socket.emit("joined", {
      userName: user.name,
      userId: user._id,
      roomId: roomId,
    });
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const message = {
      userId: user._id,
      name: user.name,
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
    const userIdA = meetingData.userA;
    const userIdB = meetingData.userB;

    messages.forEach((message) => {
      if (message.userId === userIdA) {
        userAResponses.push(message.message);
      } else if (message.userId === userIdB) {
        userBResponses.push(message.message);
      }
    });

    try {
      const response = await axios.post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-meeting`,
        {
          userAResponses,
          userBResponses,
          subject: meetingData.subject,
          userIdA,
          userIdB,
          webMeetingId: meetingData._id,
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
      {step === 1 && (
        <div
          id="welcome-container"
          style={{ padding: "2em", height: "59.6dvh" }}
        >
          <div style={{ height: "80%" }}>
            <p>
              Welcome <span style={{ color: "#23CAEA" }}>{name}</span>! Check
              your last task for room ID
            </p>
            <span
              style={{ marginTop: "1em", lineHeight: "2em", fontSize: "14px" }}
            >
              Before joining the meeting, please ensure you understand the task
              at hand and the objective of your contributions:
              <br />
              - This meeting is designed for task collaboration and
              contribution.
              <br />
              - Your active participation and input during the meeting are
              crucial for achieving the task objectives.
              <br />- Upon exiting the meeting, your contributions will be
              evaluated in relation to the task's goals and requirements.
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60em" }}>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
                type="text"
                placeholder="Enter room ID"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    joinRoom();
                  }
                }}
              />
            </div>

            <div className={classes.sendBtn}>
              <Button onClick={joinRoom}>Join</Button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div id="chat-container" className={classes.chatContainer}>
          <>
            <div
              style={{
                padding: "1em",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
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
              <h2>{meetingData.title}</h2>
              <p style={{ fontSize: "14px" }}>{meetingData.description}</p>
            </div>
            <div className="Messages">
              {messages.map((m, index) => {
                const isCurrentUser = m.name === user.name;
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
                        src={user.avatar}
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
        </div>
      )}
    </Frame>
  );
};

export default withStyles(styles)(MeetingRoom);
