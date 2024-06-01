import { Frame, Highlight, withStyles, Button } from 'arwes'
import React from 'react'
import { Link } from 'react-router-dom'
const styles = () => ({
  root: {
    position: 'absolute',
    top: '50px',
    right: 1,
    zIndex: 1000,
    width: '600px',
  },
  frame: {
    padding: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
  },
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
  text: {
    fontWeight: 'bold',
  },
})

const messages = [
  {
    sender: 'Intern Coordinator',
    text: 'Welcome to your virtual work experience !',
    time: '09:00 am',
  },
  {
    sender: 'Mentor',
    text: "Let's begin with the first task for today. Please check the task board.",
    time: '10:30 am',
  },
  {
    sender: 'Teammate Anis',
    text: 'Hi mate! If you need any help, feel free to ask. Meeting Code: AX_NEW',
    time: '02:45 pm',
  },
  {
    sender: 'HR',
    text: "Don't forget to submit your onboarding documents by end of the day.",
    time: '03:00 pm',
  },
]

const ChatPanel = (props) => {
  const { classes, className } = props
  return (
    <div className={classes.root}>
      {messages.map((message, index) => (
        <Frame key={index} animate>
          <Highlight className={classes.frame}>
            <span className={classes.text}>{message.sender}</span>
            <br></br>
            <span>{message.text}</span>
            <br></br>
            <span>{message.time}</span>
          </Highlight>
        </Frame>
      ))}
      <Button
        animate
        layer="success"
        style={{
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Link to="/chat" style={{ textDecoration: 'none' }}>
          <div>Show More</div>
        </Link>
      </Button>
    </div>
  )
}

export default withStyles(styles)(ChatPanel)
