import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { FaMicrophoneAlt } from "react-icons/fa";
import { CONSTANTS } from "../../../../constants/api";
import axios from "axios";

const styles = () => ({
  frame: {
    margin: "auto",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  voiceButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userMessage: {
    alignSelf: "flex-end",
    marginLeft: "10px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    fontSize: "16px",
    color: "black",
  },

  botMessage: {
    alignSelf: "flex-start",
    marginRight: "10px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    fontSize: "16px",
    color: "black",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  avatar: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
    borderRadius: "50%",
  },
  messageInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
  },
  chatContainer: {
    maxHeight: "72vh",
  },
});

const Mentor = (props) => {
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
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
  return (
    <Frame animate={true} className={classes.frame}>
      <Words animate style={{ padding: "1em" }}>
        AINEXIM Mentor
      </Words>
      <div id="chat-container" className={classes.chatContainer}>
        <div id="chat-box" className={classes.chatBox}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${classes.messageContainer} ${
                message.type === "user"
                  ? classes.userMessage
                  : classes.botMessage
              }`}
            >
              {message.type === "user" ? (
                <img
                  src="/img/avatars/me.jpeg"
                  alt="User Avatar"
                  className={classes.avatar}
                />
              ) : (
                <img
                  src="/img/avatars/avatar.svg"
                  alt="Mentor Avatar"
                  className={classes.avatar}
                />
              )}
              {message.content}
            </div>
          ))}
        </div>
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

          <textarea
            style={{ overflow: "auto" }}
            id="message_input"
            className={classes.messageInput}
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></textarea>
          <Button className={classes.sendButton}>Send</Button>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(Mentor);
