import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { io } from "socket.io-client";
import { TbDoorExit } from "react-icons/tb";
import { CONSTANTS } from "../../../../../constants/api";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/Auth/authSelectors";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
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
    marginBottom: "20px",
    marginRight: "10px",
  },
  receiverMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    marginRight: "10px",
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
  messages: {
    padding: "12em",
  },
  modalFrame: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    zIndex: 1000,
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
});
const MeetingRoom = (props) => {
  const [meetingData, setMeetingData] = useState([]);
  const [webMeetingID, setWebMeetingID] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const name = user ? user.name : null;
  const userId = user ? user._id : null;
  const location = useLocation();

  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const webMeetingId = location.pathname.split("/").pop();

  const fetchWebMeetingAssignment = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-meeting-assignment/${webMeetingId}/?userId=${userId}`
      );
      setMeetingData(response.data.assignment);
      setWebMeetingID(response.data.assignment.webMeeting._id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching web meeting assignment:", error);
      toast.error("Error fetching web meeting assignment");
    }
  };
  useEffect(() => {
    if (userId && webMeetingId) {
      fetchWebMeetingAssignment();
    }
  }, []);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorderRef = useRef(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

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

    client.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) return;
    socket.emit("joinRoom", roomId);
    setStep(2);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      conversationId: roomId,
      text: inputMessage,
      sender: name,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);

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
    console.log(meetingData.webMeeting);

    // Extract user IDs from meetingData
    const userIdA = meetingData.webMeeting.userA;
    const userIdB = meetingData.webMeeting.userB;
    const webMeetingId = meetingData.webMeeting._id;
    console.log(userIdA);
    console.log(messages);
    messages.forEach((message) => {
      if (message.sender === user.name) {
        userAResponses.push(message.text);
      } else {
        userBResponses.push(message.text);
      }
    });
    setIsEvaluating(true);

    try {
      const response = await axios.post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-web-meeting/${webMeetingId}/?userId=${userId}`,
        {
          userAResponses,
          userBResponses,
          subject: meetingData.webMeeting.content,
          userIdA,
          userIdB,
          webMeetingId,
        }
      );
      const meetingResult = response.data;

      if (userId === userIdA) {
        navigate(
          `/world/departments/meeting-evaluation/${meetingResult.updatedUserAAssignment.evaluation}/${userId}`
        );
      } else {
        navigate(
          `/world/departments/meeting-evaluation/${meetingResult.updatedUserBAssignment.evaluation}/${userId}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleVerifyClick = () => {
    setModalOpen(true);
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("ID Copied");
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000); // Adjust delay as needed
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy ID");
      });
  };
  return (
    <Frame animate={true} className={classes.frame}>
      {step === 1 && (
        <div
          id="welcome-container"
          style={{ padding: "2em", height: "59.6dvh" }}
        >
          <div style={{ height: "80%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>
                COPY ROOM ID:{" "}
                <span style={{ color: "#23CAEA" }}>{webMeetingID}</span>
              </p>
              <FaCopy
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => copyToClipboard(webMeetingID)}
              />
            </div>
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
                onClick={handleVerifyClick}
              >
                Quit Meeting <TbDoorExit />
              </Button>
            </div>
            <div className={classes.content}>
              <h2>{meetingData.webMeeting.title}</h2>
              <p style={{ fontSize: "14px" }}>
                {meetingData.webMeeting.description}
              </p>
              <p style={{ fontSize: "14px" }}>
                {meetingData.webMeeting.content}
              </p>
            </div>
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === user.name
                      ? classes.userMessageContainer
                      : classes.receiverMessageContainer
                  }
                >
                  <div>
                    {message.sender !== user.name && (
                      <img
                        src={"/img/avatars/avatar.svg"}
                        alt=""
                        className={classes.avatar}
                      />
                    )}
                    {message.sender === user.name && (
                      <img
                        src={user.avatar}
                        alt=""
                        className={classes.avatar}
                      />
                    )}
                  </div>
                  <div>
                    <span className={classes.username}>{message.sender}</span>
                    <br></br>
                    <span className={classes.message}>{message.text}</span>
                  </div>
                </div>
              ))}
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
      {isModalOpen && (
        <>
          <div className={classes.modalBackdrop}></div>

          <Frame className={classes.modalFrame} animate={true} corners={1}>
            <div style={{ padding: "1em" }}>
              <Words>Are you sure you want to Validate the Quiz?</Words>
              <br />
              <br />
              <br />

              <div className="btns_confirm">
                <Button onClick={exitMeeting} layer="success">
                  Confirm
                </Button>

                <Button layer="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </div>
            {isEvaluating && (
              <div style={{ height: "4em", marginLeft: "1.1em" }}>
                <div className="loadingio">
                  <div className="loading">
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </Frame>
        </>
      )}
    </Frame>
  );
};

export default withStyles(styles)(MeetingRoom);
