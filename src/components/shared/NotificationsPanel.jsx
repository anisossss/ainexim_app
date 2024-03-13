import { Frame, Highlight, withStyles, Button } from "arwes";

const styles = () => ({
  root: {
    position: "absolute",
    top: "50px",
    right: "10px",
    zIndex: 1000,
  },
  frame: {
    padding: "10px",
    background: "rgba(0, 0, 0, 0.8)",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  text: {
    fontWeight: "bold",
  },
});

const messages = [
  {
    sender: "Platform Assistant",
    text: "Welcome, Dev! Your virtual software development work experience begins now.",
    time: "09:00 am",
  },

  {
    sender: "Lead Developer",
    text: "Our daily standup begins in 30 minutes. Join in with Meeting Code: COD_DAILY.",
    time: "10:00 am",
  },

  {
    sender: "Team Member Alex",
    text: "Need your help regarding the cart feature. Can we connect at 2pm?",
    time: "12:30 pm",
  },
];
const NotificationsPanel = (props) => {
  const { classes, className } = props;
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Button
          animate
          style={{ width: "100%", textAlign: "center" }}
          layer="success"
          onClick={() => {
            window.location.href = "YOUR-PAGE-URL-HERE";
          }}
        >
          Show More
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NotificationsPanel);
