import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../../../../constants/api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const styles = () => ({
  root: {
    height: "70%",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
  },
  isModalOpen: {},
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
    title: "Create GitHub Repository and Push Your Last Code",
    description:
      "This task requires you to create a GitHub repository and push your code to it.",
    instructions: [
      {
        text: "1. Create a new GitHub repository.",
        loading: false,
        completed: false,
      },
      {
        text: "2. Initialize it with a README file.",
        loading: false,
        completed: false,
      },
      {
        text: "3. Push your code to the repository.",
        loading: false,
        completed: false,
      },
      {
        text: "4. Provide the repository link as the response.",
        loading: false,
        completed: false,
      },
    ],
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

  const history = useLocation();
  const [clickCount, setClickCount] = useState(0);
  const [tabActivityCount, setTabActivityCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);
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

  const handleConfirmClick = async () => {
    setIsLoadingConfirmation(true);
    setModalOpen(false);

    for (let i = 0; i < taskData.instructions.length; i++) {
      const newInstructions = [...taskData.instructions];
      newInstructions[i].loading = true;
      setTaskData({ ...taskData, instructions: newInstructions });

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds

      newInstructions[i].loading = false;
      newInstructions[i].completed = true;
      setTaskData({ ...taskData, instructions: newInstructions });
    }

    setIsLoadingConfirmation(false);
    const isAllCompleted = taskData.instructions.every(
      (inst) => inst.completed
    );
    setIsAllTasksCompleted(isAllCompleted);

    if (isAllCompleted) {
      toast.success("All tasks validated successfully.");
    }
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
      <Frame animate={true} className={classes.root}>
        {!isLoading ? (
          <div
            style={{
              padding: "1em",
              fontSize: "smaller",
              height: "63vh",
              overflowY: "scroll",
            }}
          >
            <span animate style={{ fontWeight: "bold" }}>
              Task 2: {taskData.title}
            </span>

            <br></br>
            <br></br>
            <Words animate>{taskData.description}</Words>

            <br></br>
            <br></br>
            <Words animate style={{ fontWeight: "bold" }}>
              Instructions
            </Words>
            {taskData.instructions.map((instruction, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                  lineHeight: "30px",
                }}
              >
                {instruction.text}
                {instruction.loading && (
                  <div className="tiny-loadingio">
                    <div className="loading">
                      <div></div>
                    </div>
                  </div>
                )}
                {instruction.completed && (
                  <span style={{ marginLeft: "10px" }}>✅</span>
                )}
              </div>
            ))}
            <br></br>

            <Words animate style={{ fontWeight: "bold" }}>
              Helpful Resources
            </Words>
            <br></br>
            {taskData.resources.map((resource, index) => (
              <span key={index}>
                💡{" "}
                <a href={resource} style={{ fontSize: "15px" }}>
                  {resource}
                </a>
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
              <Button onClick={handleVerifyClick}>Validate</Button>
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
      {isAllTasksCompleted && (
        <div className={classes.modalBackdrop}>
          <Frame className={classes.modalFrame} animate={true} corners={1}>
            <div style={{ padding: "1em" }}>
              <Words>Congratulations! You have completed all the tasks.</Words>
              <br />
              <br />
              <div className="btns_confirm">
                <Button
                  onClick={() => history.push("/some/next/task/link")}
                  layer="success"
                >
                  Go to Next Task
                </Button>

                <Button
                  onClick={() => history.push("/task/board/link")}
                  layer="secondary"
                >
                  Go to Task Board
                </Button>
              </div>
            </div>
          </Frame>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(GithubTaskFrame);
