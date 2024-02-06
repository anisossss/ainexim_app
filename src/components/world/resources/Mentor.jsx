import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { FaMicrophoneAlt } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";

const styles = () => ({
  frame: {
    margin: "auto",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "10vh",
    marginBottom: "10px",
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
});

const Mentor = (props) => {
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const recognition = useRef(new window.webkitSpeechRecognition());

  useEffect(() => {
    recognition.current.onstart = () => {
      setListening(true);
    };
    recognition.current.onerror = (event) => {
      console.log(`Speech recognition error: ${event.error}`);
    };
    recognition.current.onend = () => {
      setListening(false);
      if (voiceMode) {
        recognition.current.start(); // Continue listening if voiceMode is still on
      }
    };

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setAudioChunks([]);
    };

    // Clean up when component unmounts
    return () => {
      recognition.current.stop();
    };
  }, [voiceMode]);

  const toggleVoiceMode = () => {
    if (!voiceMode) {
      recognition.current.start();
    } else {
      recognition.current.stop();
      if (audioChunks.length > 0) {
        sendAudioToServer();
      }
    }
    setVoiceMode(!voiceMode);
  };

  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { content: inputMessage, type: "user" },
        { content: getRandomBotResponse(), type: "bot" },
      ]);
      setInputMessage("");
    }
  };
  const getRandomBotResponse = () => {
    const botResponses = [
      "I'm sorry, I didn't quite catch that.",
      "Interesting! Tell me more.",
      "That's a great point!",
      "I'm here to help. How can I assist you today?",
    ];
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };
  const sendAudioToServer = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" }); // Adjust the type accordingly
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.mp3"); // Adjust the filename and format accordingly

    fetch("http://localhost:3301/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([
          ...messages,
          { content: data.text, type: "user" },
          { content: getRandomBotResponse(), type: "bot" },
        ]);
      })
      .catch(console.error);
  };

  return (
    <Frame animate={true} corners={1} className={classes.frame}>
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
            {voiceMode ? <GiSoundWaves /> : <FaMicrophoneAlt />}
          </Button>

          <textarea
            id="message_input"
            className={classes.messageInput}
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></textarea>
          <Button onClick={handleSend} className={classes.sendButton}>
            Send
          </Button>
        </div>
        <Frame
          style={{ display: voiceMode ? "block" : "none", fontSize: "12px" }}
        >
          {voiceMode ? "Voice Mode ON" : "Voice Mode OFF"}
        </Frame>
        <div id="voice-indicator">Voice Mode ON</div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(Mentor);
