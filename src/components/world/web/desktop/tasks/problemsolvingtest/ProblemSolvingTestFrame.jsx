import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../../../../constants/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/Auth/authSelectors";
import { toast } from "react-toastify";

const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  quizContainer: {
    padding: "20px",
    height: "80vh",
    width: "100%",
    overflowY: "auto",
  },
  question: {
    height: "10em",
  },
  buttonContainer: {
    display: "flex",
    width: "20%",
    justifyContent: "space-evenly",
    marginTop: "2em",
  },
  submitButton: {
    textAlign: "right",
  },
  progressBarContainer: {
    height: "5px",
    width: "100%",
    background: "#222",
    position: "relative",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    background: "#029DBB",
    transition: "width 0.3s ease-in-out",
  },
  buttonsContainer: {
    marginTop: "9px",
  },
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
const ProblemSolvingTestFrame = (props) => {
  const { classes } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  const location = useLocation();
  const webProblemSolvingTestId = location.pathname.split("/").pop();
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (userId && webProblemSolvingTestId) {
      fetchWebQuizAssignment();
    }
  }, [userId, webProblemSolvingTestId]);

  const fetchWebQuizAssignment = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-problem-solving-test-assignment/${webProblemSolvingTestId}/?userId=${userId}`
      );
      setAssignment(response.data.assignment);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching web quiz assignment:", error);
      toast.error("Error fetching web quiz assignment");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleVerifyClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmClick = () => {
    setIsLoadingConfirmation(true);
    setModalOpen(false);

    const testResponse = {
      webProblemSolvingResponse: inputMessage,
    };

    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-web-problem-solving-test/${webProblemSolvingTestId}/?userId=${userId}`,
        testResponse
      )
      .then((response) => {
        setIsLoadingConfirmation(false);
        navigate(
          `/world/desktop/problem-solving-test/verification/${response.data.updatedAssignment.evaluation}`
        );
      })
      .catch((error) => {
        setIsLoadingConfirmation(false);
        console.error("Error evaluating test:", error);
        if (error.response) {
          console.error("Error response:", error.response);
          toast.error(
            `Error: ${error.response.data.message || error.response.statusText}`
          );
        } else {
          toast.error("Error evaluating test");
        }
      });
  };

  const handleTimeUpSubmit = () => {
    handleConfirmClick();
  };

  if (isLoading) {
    return (
      <div className="loadingio">
        <div className="loading">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <Frame level={0}>
      <div className={classes.quizContainer}>
        <div className="timer">
          <div style={{ color: timeRemaining === 0 ? "red" : "inherit" }}>
            {`${Math.floor(timeRemaining / 20)}:${(timeRemaining % 60)
              .toString()
              .padStart(2, "0")}`}
          </div>
        </div>
        <div className={classes.progressBarContainer}>
          <div className={classes.progressBarFill} />
        </div>
        {assignment && (
          <>
            <div className={classes.question}>
              <h3>{assignment.webProblemSolvingTest.title}</h3>
              <p style={{ fontSize: "16px" }}>
                {assignment.webProblemSolvingTest.content}
              </p>
              <p style={{ fontSize: "14px" }}>
                Estimated Time: {assignment.webProblemSolvingTest.estimatedTime}
              </p>
              <p style={{ fontSize: "14px" }}>
                Level: {assignment.webProblemSolvingTest.level}
              </p>
              <p style={{ fontSize: "14px" }}>
                Resources:{" "}
                {assignment.webProblemSolvingTest.resources.join(", ")}
              </p>
            </div>
          </>
        )}
        <textarea
          className="text_area"
          style={{ marginTop: "2em", height: "10em" }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <div className={classes.buttonsContainer}>
          <div className={classes.submitButton}>
            <Button onClick={handleVerifyClick}>Submit</Button>
          </div>
        </div>
        {isModalOpen && (
          <>
            <div
              className={classes.modalBackdrop}
              onClick={handleCloseModal}
            ></div>
            <Frame className={classes.modalFrame} animate={true} corners={1}>
              <div style={{ padding: "1em" }}>
                <Words>Are you sure you want to Validate the test?</Words>
                <br />
                <br />
                <div className="btns_confirm">
                  <Button layer="success" onClick={handleConfirmClick}>
                    Confirm
                  </Button>
                  <Button layer="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Frame>
          </>
        )}
        {isTimeModalOpen && (
          <>
            <div
              className={classes.modalBackdrop}
              onClick={handleCloseModal}
            ></div>
            <Frame className={classes.modalFrame} animate={true} corners={1}>
              <div style={{ padding: "1em", textAlign: "center" }}>
                <Words>Time is up! You need to submit the test.</Words>
                <br />
                <br />
                <Button onClick={handleTimeUpSubmit}>Submit</Button>
              </div>
            </Frame>
          </>
        )}
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ProblemSolvingTestFrame);
