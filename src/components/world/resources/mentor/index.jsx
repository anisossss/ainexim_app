import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from 'arwes'
import { Frame, Button, Words } from 'arwes'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { CONSTANTS } from '../../../../constants/api'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/Auth/authSelectors' // import the selector from the correct file

const styles = () => ({
  frame: {
    margin: 'auto',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: '10px',
  },
  voiceButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMessage: {
    alignSelf: 'flex-end',
    marginLeft: '10px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    fontSize: '16px',
    color: 'black',
  },

  botMessage: {
    alignSelf: 'flex-start',
    marginRight: '10px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    fontSize: '16px',
    color: 'black',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    marginBottom: '10px',
  },

  avatar: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  messageInput: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
  },
  chatContainer: {
    maxHeight: '72vh',
  },
})
const Typewriter = ({ text, onFinish }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 50)

      return () => clearTimeout(timer)
    } else {
      onFinish() // Invoke onFinish callback when typing animation finishes
    }
  }, [currentIndex, text, onFinish])

  return <>{displayText}</>
}
const Mentor = (props) => {
  const { classes } = props
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [voiceMode, setVoiceMode] = useState(false)
  const [audioChunks, setAudioChunks] = useState([])
  const [transcribedText, setTranscribedText] = useState('')
  const mediaRecorderRef = useRef(null)
  const userData = useSelector(selectUser)
  const user = userData ? userData.user : null

  const [isBotTyping, setIsBotTyping] = useState(false) // New state to track if bot is typing

  let mediaRecorder
  useEffect(() => {
    const welcomeMessage = `Hello, ${user.name}! How can I assist you today?`
    setMessages([{ type: 'bot', content: welcomeMessage }])
  }, [])
  useEffect(() => {
    if (voiceMode) {
      startRecording()
    } else {
      stopRecording()
    }
  }, [voiceMode])

  useEffect(() => {
    if (audioChunks.length > 0) {
      sendAudioToServer()
    }
  }, [audioChunks])

  const toggleVoiceMode = () => {
    setVoiceMode((prevVoiceMode) => !prevVoiceMode)
  }
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = (e) => {
          setAudioChunks((prevChunks) => [...prevChunks, e.data])
        }
        mediaRecorderRef.current.start()
        console.log(audioChunks)
        console.log('Recording stopped. MediaRecorder state:', mediaRecorderRef.current.state)
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error)
      })
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      console.log('Recording stopped. MediaRecorder state:', mediaRecorderRef.current.state)
    }
  }

  const sendAudioToServer = async () => {
    try {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' })
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.mp3')

      const response = await axios.post(`${CONSTANTS.API_URL}/utils/speech-to-text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setTranscribedText(response.data.text)
      setInputMessage(response.data.text)
      setAudioChunks([])
    } catch (error) {
      console.error('Error sending audio to server:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add the user message to the chat
    setMessages((prevMsgs) => [...prevMsgs, { type: 'user', content: inputMessage }])
    setIsBotTyping(true)

    try {
      const response = await axios.post(`${CONSTANTS.API_URL}/utils/mentor-message`, {
        message: inputMessage,
      })

      setInputMessage('')

      const typewrittenResponse = response.data.text
      const typingIndex = messages.findIndex(
        (message) =>
          message.type === 'bot' && typeof message.content === 'string' && message.content === '...'
      )
      if (typingIndex !== -1) {
        // Replace the typing indicator with the bot's response
        setMessages((prevMsgs) => [
          ...prevMsgs.slice(0, typingIndex),
          {
            type: 'bot',
            content: (
              <Typewriter text={typewrittenResponse} onFinish={() => setIsBotTyping(false)} />
            ),
          },
          ...prevMsgs.slice(typingIndex + 1),
        ])
      } else {
        // If there's no typing indicator, add the bot's response
        setMessages((prevMsgs) => [
          ...prevMsgs,
          {
            type: 'bot',
            content: (
              <Typewriter text={typewrittenResponse} onFinish={() => setIsBotTyping(false)} />
            ),
          },
        ])
      }

      const audioResponse = await axios.post(
        `${CONSTANTS.API_URL}/utils/text-to-speech`,
        { text: response.data.text },
        { responseType: 'arraybuffer' }
      )

      const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' })

      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (error) {
      console.error('Error sending message to mentor:', error)
    }
  }

  return (
    <Frame animate={true} className={classes.frame}>
      <Words animate style={{ padding: '1em' }}>
        AINEXIM Mentor
      </Words>
      <div id="chat-container" className={classes.chatContainer}>
        <div id="chat-box" className={classes.chatBox}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${classes.messageContainer} ${
                message.type === 'user' ? classes.userMessage : classes.botMessage
              }`}
            >
              {message.type === 'user' ? (
                <img src={user.avatar} alt="User Avatar" className={classes.avatar} />
              ) : (
                <img
                  src="https://icons.iconarchive.com/icons/iconarchive/robot-avatar/512/Blue-2-Robot-Avatar-icon.png"
                  alt="Mentor Avatar"
                  className={classes.avatar}
                />
              )}
              {message.content}
            </div>
          ))}
          {isBotTyping && (
            <div className={`${classes.messageContainer} ${classes.botMessage}`}>
              <img
                src="https://icons.iconarchive.com/icons/iconarchive/robot-avatar/512/Blue-2-Robot-Avatar-icon.png"
                alt="Mentor Avatar"
                className={classes.avatar}
              />
              <Typewriter text="..." onFinish={() => setIsBotTyping(false)} />
            </div>
          )}
        </div>
        <Frame
          style={{
            display: voiceMode ? 'block' : 'none',
            padding: '0.5em',
          }}
        >
          <Words animate style={{ fontSize: '7px' }}>
            {voiceMode ? 'Voice Mode ON' : 'Voice Mode OFF'}
          </Words>
        </Frame>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
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
            style={{ overflow: 'auto' }}
            id="message_input"
            className={classes.messageInput}
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></textarea>
          <Button className={classes.sendButton} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </Frame>
  )
}

export default withStyles(styles)(Mentor)
