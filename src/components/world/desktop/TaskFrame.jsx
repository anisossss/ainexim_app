import React, { useState } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { Link } from "react-router-dom";

const styles = () => ({
  chatBox: {
    display: "flex",
    flexDirection: "column",
  },
  chatContainer: {},
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
  textArea: {
    border: "1px solid white",
    color: "#fff",
  },
});

const TaskFrame = (props) => {
  const { classes } = props;

  const [inputMessage, setInputMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleInputResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleVerifyClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmClick = () => {
    // Add your confirmation logic here
    setModalOpen(false);
  };

  return (
    <div className="isModalOpen">
      <Frame animate={true} corners={1}>
        <div style={{ padding: "1em" }}>
          <Words animate>Task #AX_01</Words>
          <br></br>
          <Words>Create homepage layout components</Words>
          <br></br>
          <br></br>
          <div id="chatContainer">
            <textarea
              id="task_input"
              className={classes.textArea}
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={handleInputChange}
              onInput={handleInputResize}
            />
            <br></br>
            <br></br>
            <Button className={classes.sendButton} onClick={handleVerifyClick}>
              Validate
            </Button>
          </div>
        </div>
      </Frame>

      {isModalOpen && (
        <>
          <div
            className={classes.modalBackdrop}
            onClick={handleCloseModal}
          ></div>
          <Frame className={classes.modalFrame} animate={true} corners={1}>
            <div style={{ padding: "1em" }}>
              <Words>Are you sure you want to Validate the task?</Words>
              <br />
              <br />
              <div className="btns_confirm">
                <Link to="/world/desktop/task/verification">
                  <Button>Confirm</Button>
                </Link>

                <Button onClick={handleCloseModal}>Cancel</Button>
              </div>
            </div>
          </Frame>
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(TaskFrame);
