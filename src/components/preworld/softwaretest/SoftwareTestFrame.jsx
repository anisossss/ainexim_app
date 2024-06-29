import React, { useState, useEffect, useMemo } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/Auth/authSelectors";
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

const SoftwareTestFrame = (props) => {
  const { classes, className } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [textareaValues, setTextareaValues] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  const fetchQuizData = () => {
    axios
      .get(`${CONSTANTS.API_URL}/generation/get-software-test`)
      .then((response) => {
        setQuizData(response.data.tests);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeModalOpen(true);
    }
  }, [timeRemaining]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleTextareaChange = (event) => {
    const { id, value } = event.target;
    setTextareaValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === quizData.length - 1 ? 0 : prevIndex + 1
    );
  };
  const navigate = useNavigate();

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === 0 ? quizData.length - 1 : prevIndex - 1
    );
  };

  const handleVerifyClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleConfirmClick = () => {
    const responses = quizData.map((test, index) => ({
      testId: test._id,
      response: textareaValues[`question_${index}_input`],
    }));

    setIsLoadingConfirmation(true);
    setModalOpen(false);

    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-software-test?userId=${userId}`,
        {
          softwareTestResponses: responses,
        }
      )
      .then((response) => {
        setIsLoadingConfirmation(false);
        toast.success("Tests validated successfully");
        navigate(`/preworld/test/result`);
      })
      .catch((error) => {
        toast.error("Error validating Test");
        setIsLoadingConfirmation(false);
        console.error("Error validating Test:", error);
      });
  };
  const currentTest = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progressPercentage =
    (currentQuestionIndex / (quizData.length - 1)) * 100;

  return (
    <div className={classes.quizContainer}>
      <div className="timer">
        <div>{`${currentQuestionIndex + 1}/${totalQuestions}`}</div>
        <div style={{ color: timeRemaining === 0 ? "red" : "inherit" }}>
          {`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>
      </div>
      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBarFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {currentTest && (
        <>
          <div className={classes.question}>
            <h3>{currentTest.title}</h3>
            <p style={{ fontSize: "16px" }}>{currentTest.question}</p>
            <p style={{ fontSize: "14px" }}>{currentTest.explanation}</p>
            <br />
          </div>
          <textarea
            id={`question_${currentQuestionIndex}_input`}
            className="text_area"
            style={{ height: "10em" }}
            value={
              textareaValues[`question_${currentQuestionIndex}_input`] || ""
            }
            onChange={handleTextareaChange}
          />
        </>
      )}
      <div className={classes.buttonsContainer}>
        <div className={classes.buttonContainer}>
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quizData.length - 1}
          >
            Next
          </Button>
        </div>
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
              <Button onClick={handleConfirmClick} layer="success">
                Submit
              </Button>
            </div>
          </Frame>
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(SoftwareTestFrame);
