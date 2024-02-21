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

const TaskFrame = (props) => {
  const { classes } = props;

  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTask = () => {
      axios
        .get(
          `${CONSTANTS.API_URL}/generation/get-web-task/65cc8e9ef077905a583559c2`
        )
        .then((response) => {
          setTaskData(response.data.task);
          setIsLoading(false);
          console.log("Task data:", response.data);
        })
        .catch((error) => {
          console.error("Error getting evaluation data from backend:", error);
        });
    };
    fetchTask();
  }, []);

  const history = useHistory();
  const [clickCount, setClickCount] = useState(0);
  const [tabActivityCount, setTabActivityCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);

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
    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-web-task/65cc8e9ef077905a583559c2`,
        {
          tabActivityCount,
          clickCount,
          taskResponse: inputMessage,
        }
      )
      .then((response) => {
        setIsLoadingConfirmation(false);
        toast.success("Task validated successfully");
        history.push(
          `/world/desktop/task/verification/${response.data.taskEvaluation._id}`
        );
      })
      .catch((error) => {
        toast.error("Error validating task");
        console.error("Error getting score from backend:", error);
        setIsLoadingConfirmation(false);
      });
  };

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

  return (
    <div className="isModalOpen">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Frame animate={true}>
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "8em" }}>
            <div className="loadingio">
              <div className="loading">
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "1em", fontSize: "smaller" }}>
            <Words animate style={{ fontWeight: "bold" }}>
              Task Title
            </Words>
            <br></br>
            {taskData && <Words animate>{taskData.title}</Words>}
            <br></br>
            <br></br>
            {taskData && <Words animate>{taskData.description}</Words>}

            <br></br>
            <br></br>
            {taskData && <span>{taskData.content}</span>}

            <br></br>
            <br></br>
            <Words animate style={{ fontWeight: "bold" }}>
              Helpful Resources
            </Words>
            <br></br>
            {taskData &&
              taskData.resources.map((resource, index) => (
                <span key={index}>
                  {resource.split(",").map((link, linkIndex) => (
                    <React.Fragment key={linkIndex}>
                      <a href={link.trim()}>{link.trim()}</a>
                      <br />
                    </React.Fragment>
                  ))}
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
        )}{" "}
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

export default withStyles(styles)(TaskFrame);
