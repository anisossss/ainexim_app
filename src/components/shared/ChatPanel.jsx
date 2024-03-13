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
    sender: "Intern Coordinator",
    text: "Welcome to your virtual work experience !",
    time: "09:00 am",
  },
  {
    sender: "Mentor",
    text: "Let's begin with the first task for today. Please check the task board.",
    time: "10:30 am",
  },
  {
    sender: "Teammate Anis",
    text: "Hi mate! If you need any help, feel free to ask. Meeting Code: AX_NEW",
    time: "02:45 pm",
  },
  {
    sender: "HR",
    text: "Don't forget to submit your onboarding documents by end of the day.",
    time: "03:00 pm",
  },
];

const ChatPanel = (props) => {
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

export default withStyles(styles)(ChatPanel);
