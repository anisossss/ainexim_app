import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../../constants/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
    height: "100px",
  },
});

const GithubTaskFrame = (props) => {
  const { classes } = props;

  const [taskData, setTaskData] = useState({
    title: "Create GitHub Repository and Push Code Task",
    description:
      "This task requires you to create a GitHub repository and push your code to it.",
    content:
      "Instructions:\n1. Create a new GitHub repository.\n2. Initialize it with a README file.\n3. Push your code to the repository.\n4. Provide the repository link as the response.",
    resources: [
      "https://docs.github.com/en/get-started/quickstart/create-a-repo",
    ],
  });

  useEffect(() => {
    const fetchTask = () => {
      // No need to fetch data since we're using static data
    };
    fetchTask();
  }, []);

  const history = useHistory();
  const [clickCount, setClickCount] = useState(0);
  const [tabActivityCount, setTabActivityCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Set to false since we're using static data
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleTabActivityChange = () => {
      if (document.hidden) {
        setTabActivityCount((prevCount) => prevCount + 1);
      }
    };

    const handleClick = () => {
      setClickCount((prevCount) => prevCount + 1);
    };

    document.addEventListener("visibilitychange", handleTabActivityChange);
    document.body.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("visibilitychange", handleTabActivityChange);
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const handleConfirmClick = () => {
    setIsLoadingConfirmation(true);
    setModalOpen(false);
    // Simulate API call
    setTimeout(() => {
      setIsLoadingConfirmation(false);
      toast.success("Task validated successfully");
      history.push("/world/desktop/github-activity");
    }, 2000);
  };

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

  return (
    <div className="isModalOpen">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Frame animate={true}>
        {!isLoading ? (
          <div style={{ padding: "1em", fontSize: "smaller" }}>
            <Words animate style={{ fontWeight: "bold" }}>
              Task 2 Title
            </Words>
            <br></br>
            <br></br>
            <Words animate>{taskData.title}</Words>
            <br></br>
            <br></br>
            <Words animate>{taskData.description}</Words>

            <br></br>
            <br></br>
            <span>{taskData.content}</span>

            <br></br>
            <br></br>
            <Words animate style={{ fontWeight: "bold" }}>
              Helpful Resources
            </Words>
            <br></br>
            {taskData.resources.map((resource, index) => (
              <span key={index}>
                <a href={resource}>{resource}</a>
                <br />
              </span>
            ))}

            <br></br>
            <br></br>
            <div id="chatContainer">
              <textarea
                id="task_input"
                className={classes.textArea}
                placeholder="Type your response here..."
                value={inputMessage}
                onChange={handleInputChange}
                onInput={handleInputResize}
              />
              <br></br>
              <br></br>
              <Button
                className={classes.sendButton}
                onClick={handleVerifyClick}
              >
                Validate
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "8em" }}>
            <div className="loadingio">
              <div className="loading">
                <div></div>
              </div>
            </div>
          </div>
        )}
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
                <Button onClick={handleConfirmClick} layer="success">
                  Confirm
                </Button>

                <Button onClick={handleCloseModal} layer="secondary">
                  Cancel
                </Button>
              </div>
            </div>
          </Frame>
        </>
      )}
      {isLoadingConfirmation && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "60%",
            left: "40%",
            transform: "translate(-60%, -40%)",
          }}
        >
          <div className="loadingio">
            <div className="loading">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(GithubTaskFrame);
