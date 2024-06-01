import React, { useState, useEffect, useRef } from 'react'
import { withStyles, Frame, Words, Button, Highlight } from 'arwes'
import { FaUser } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { CONSTANTS } from '../../../../constants/api'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectToken } from '../../../../redux/Auth/authSelectors'
import moment from 'moment'
import { io } from 'socket.io-client'
import {
  activityStatus,
  fetchConversations,
  fetchConversation,
  postMessage,
  createNewConversation,
  fetchTeamConversations,
  fetchTeamConversation,
  postTeamMessage,
  createNewTeamConversation,
} from '../../../../redux/Chat/chatOperations'
import { MdAddIcCall, MdVideoCall } from 'react-icons/md'
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from 'react-icons/io5'

const styles = (theme) => ({
  chatList: {
    width: '40%',
    padding: '1em',
    height: '70vh',
    overflowY: 'scroll',
    marginRight: '2em',
    marginTop: '3em',
    marginBottom: '6em',
  },
  chatContainer: {
    width: '80%',
    maxHeight: '100vh',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: '20px',
    height: '500px',
    backgroundColor: '#121212',
    border: 'none',
    overflowY: 'scroll',
  },
  userMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    background: 'blue',
    flexDirection: 'row-reverse',
  },
  recieverMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '10px',
    background: 'red',
  },

  messageContainer: {
    alignItems: 'center',
    margin: '10px 0',
    width: '100%',
  },
  messageHeader: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    marginBottom: '4px',
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#222',
    color: '#0f0',
  },
  chatItemTime: {
    fontSize: '12px',
    color: '#999',
    marginTop: '5px',
    display: 'block',
  },
  chatHeaderImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  messageInputContainer: {
    alignItems: 'center',
  },
  messageInput: {
    flexGrow: 1,
    marginRight: '10px',
  },
  chatItem: {
    display: 'flex',
    cursor: 'pointer',
    width: '100%',
    padding: '10px',
    '&:hover': {
      backgroundColor: '#033',
    },
  },
  chatItemImage: {
    width: '20%',
    padding: '10px',
  },
  chatItemName: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  chatItemLastMessage: {
    fontSize: '14px',
  },

  navButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4em',
  },
  navSection: {
    marginBottom: '1em',
    position: 'fixed',
    zIndex: 999,
    top: 100,
    width: '23%',
  },
  activeButton: {
    background: '#4BF2F6',
  },
  activeChatItem: {
    background: '#4BF2F6',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '1em',
    position: 'fixed',
    width: '80%',
    top: 80,
    zIndex: 999,
  },

  chatHeaderDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeaderName: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#fff',
  },
  chatHeaderStatus: {
    fontSize: '1em',
    color: '#0f0',
    display: 'flex',
  },
  mediaBtns: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '40%',
  },
  seen: {
    display: 'flex',
    alignItems: 'center',
  },
  online: {},

  offline: {
    color: 'red',
  },
})

const ChatPanel = (props) => {
  const [currentView, setCurrentView] = useState('personal')
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const user = userData ? userData.user : null
  const { classes } = props
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [personalChats, setPersonalChats] = useState([])
  const [teamChats, setTeamChats] = useState([])
  const [conversation, setConversation] = useState(null)
  const [teamConversation, setTeamConversation] = useState()
  const [onlineUser, setOnlineUser] = useState(false)
  const [otherUserName, setOtherUserName] = useState('')
  const [voiceMode, setVoiceMode] = useState(false)
  const [audioChunks, setAudioChunks] = useState([])
  const [transcribedText, setTranscribedText] = useState('')
  const mediaRecorderRef = useRef(null)
  const [socket, setSocket] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const token = useSelector(selectToken)

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
  useEffect(() => {
    dispatch(fetchConversations()).then((response) => {
      if (response.payload) {
        setPersonalChats(response.payload)
      }
    })
    dispatch(fetchTeamConversations()).then((response) => {
      if (response.payload) {
        setTeamChats(response.payload)
      }
    })
  }, [dispatch])

  useEffect(() => {
    if (token) {
      const client = io(`${CONSTANTS.SOCKET_URL}`, {
        auth: { token },
      })
      setSocket(client)
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [token])

  useEffect(() => {
    if (selectedChat && socket) {
      socket.emit('joinRoom', selectedChat.id)
    }
  }, [selectedChat, socket])

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        const updateChatList = (chats, setChats) => {
          setChats(
            chats.map((chat) => {
              if (chat.id === message.conversationId) {
                return {
                  ...chat,
                  lastMessage: {
                    text: message.text,
                    timestamp: message.timestamp,
                    sentByCurrentUser: message.sender === user._id,
                  },
                }
              }
              return chat
            })
          )
        }
        setMessages((prevMessages) => [...prevMessages, message])
        updateChatList(personalChats, setPersonalChats)
      })
    }

    return () => {
      if (socket) {
        socket.off('receiveMessage')
      }
    }
  }, [socket, personalChats, teamChats, user._id])

  useEffect(() => {
    dispatch(fetchConversations())
  }, [dispatch])

  const handleChatSelection = async (chat) => {
    setSelectedChat(chat)
    if (currentView === 'personal') {
      try {
        const response = await dispatch(fetchConversation(chat.id))
        if (response.payload && response.payload.conversation) {
          setConversation(response.payload.conversation)
          setMessages(response.payload.messages)
          setOnlineUser(response.payload.otherUserOnlineStatus)
          setOtherUserName(response.payload.otherUserName)
        }
      } catch (error) {
        console.error('Error fetching conversation:', error)
      }
    } else if (currentView === 'team') {
      try {
        const response = await dispatch(fetchTeamConversation(chat.id))
        if (response.payload && response.payload.conversation) {
          setTeamConversation(response.payload.conversation)
          setMessages(response.payload.messages)
        }
      } catch (error) {
        console.error('Error fetching team conversation:', error)
      }
    }
  }
  const sendMessage = async () => {
    if (inputMessage.trim() && selectedChat && user && user._id && user.name) {
      try {
        const messageData = {
          conversationId: selectedChat.id,
          text: inputMessage,
        }
        const response = await dispatch(postMessage(messageData))
        const newMessage = {
          ...response.payload,
          sender: {
            _id: user._id,
            name: user.name,
          },
        }
        socket.emit('sendMessage', newMessage)
        setInputMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    } else {
      console.error('Missing required data for sending message')
    }
  }
  const formatTime = (time) => {
    const now = moment()
    const messageTime = moment(time)
    if (now.isSame(messageTime, 'day')) {
      return messageTime.format('HH:mm')
    } else {
      return messageTime.format('D/M/Y')
    }
  }
  const chatEndRef = useRef(null)
  const chatBoxRef = useRef(null)
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [messages])

  const renderChatItems = (chats) => {
    if (!Array.isArray(chats)) {
      return null
    }

    return chats.map((chat) => (
      <Frame
        key={chat._id}
        onClick={() => handleChatSelection(chat)}
        className={
          selectedChat && selectedChat.id === (chat.id || chat._id) ? classes.activeChatItem : ''
        }
      >
        <Highlight>
          <div className={classes.chatItem}>
            <div className={classes.chatItemSender}>{chat.senderName}</div>{' '}
            <img src={'/img/avatars/avatar.svg'} alt="Avatar" className={classes.chatItemImage} />
            <div className={classes.chatItemContent}>
              <div>
                <div className={classes.chatItemName}>{chat.name}</div>
                <div className={classes.chatItemLastMessage}>
                  {chat.lastMessage.sentByCurrentUser ? 'You: ' : ''}
                  {chat.lastMessage.text}
                </div>
              </div>
              <div className={classes.chatItemTime}>{formatTime(chat.lastMessage.timestamp)}</div>
            </div>
          </div>
        </Highlight>
      </Frame>
    ))
  }
  const renderMessages = () => {
    if (!messages || messages.length === 0) {
      return <div>No messages</div>
    }

    return messages.map((m, index) => {
      const isCurrentUser = m.sender && user && m.sender._id === user._id

      return (
        <div key={index}>
          <div
            className={
              isCurrentUser ? classes.userMessageContainer : classes.recieverMessageContainer
            }
          >
            <div className={classes.messageHeader}>
              <img
                src={'/img/avatars/avatar.svg'}
                alt="Avatar"
                className={classes.chatHeaderImage}
              />
              <span>{isCurrentUser ? user.name : otherUserName}</span>
            </div>
            <div className={classes.messageContainer}>
              <div className={classes.message}>
                {m.text}
                <span className={classes.chatItemTime}>{formatTime(m.timestamp)}</span>
                <div className={classes.seen}>
                  <span>
                    {m.seen ? (
                      <>
                        <Words animate>Seen</Words>
                        <IoCheckmarkDoneSharp />
                      </>
                    ) : (
                      <>
                        <Words animate>Delivered</Words>
                        <IoCheckmarkSharp />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', maxHeight: '80vh' }}>
      <div className={classes.chatList}>
        <div className={classes.navSection}>
          <div className={classes.navButtons}>
            <Button
              className={currentView === 'personal' ? classes.activeButton : ''}
              onClick={() => setCurrentView('personal')}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <FaUser />
              &nbsp;Personal
            </Button>
            <Button
              className={currentView === 'team' ? classes.activeButton : ''}
              onClick={() => setCurrentView('team')}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <FaUsers />
              &nbsp; Team
            </Button>
          </div>
        </div>
        {currentView === 'personal' ? renderChatItems(personalChats) : renderChatItems(teamChats)}
      </div>
      <div className={classes.chatContainer} ref={chatBoxRef}>
        {selectedChat && (
          <div className={classes.chatHeader}>
            <img src={'/img/avatars/avatar.svg'} alt="Avatar" className={classes.chatHeaderImage} />
            <div className={classes.chatHeaderDetails}>
              <div className={classes.chatHeaderName}>{selectedChat.name}</div>
              <div
                className={`${classes.chatHeaderStatus} ${
                  onlineUser ? classes.online : classes.offline
                }`}
              >
                {onlineUser ? 'Online' : 'Offline'}
                <div className={classes.mediaBtns}>
                  <MdAddIcCall size={24} style={{ cursor: 'pointer' }} />
                  <MdVideoCall size={30} style={{ cursor: 'pointer' }} />
                </div>
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
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
              }}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
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
  )
}

export default withStyles(styles)(ChatPanel)
