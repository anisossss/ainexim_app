import React, { useState, useEffect, useMemo } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
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
    height: "72%",
  },
  buttonContainer: {
    display: "flex",
    width: "20%",
    justifyContent: "space-evenly",
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
    marginTop: "5px",
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
const SoftwareQuizFrame = (props) => {
  const { classes, className } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [checkedItems, setCheckedItems] = useState({});
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeModalOpen(true);
    }
  }, [timeRemaining]);
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === quizData.length - 1 ? 0 : prevIndex + 1
    );
  };

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

  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const progressPercentage =
    (currentQuestionIndex / (quizData.length - 1)) * 100;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${CONSTANTS.API_URL}/generation/get-software-quiz`;
        const response = await axios.get(url);
        setQuizData(response.data.quizs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const currentQuiz = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;

  const handleCheckboxChange = useMemo(
    () => (index) => {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [currentQuestionIndex]: {
          ...(prevCheckedItems[currentQuestionIndex] || {}),
          [index]: !(prevCheckedItems[currentQuestionIndex] || {})[index],
        },
      }));
    },
    [setCheckedItems, currentQuestionIndex]
  );

  const handleConfirmClick = () => {
    const quizResponses = quizData.map((quiz, index) => ({
      quizId: quiz._id,
      response: checkedItems[index] || {},
    }));
    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-software-quiz?userId=${userId}`,
        {
          quizResponses,
        }
      )
      .then((response) => {
        toast.success("Task validated successfully");
        navigate(`/preworld/quiz/result`);
      })
      .catch((error) => {
        toast.error("Error validating Quiz");
        console.error("Error validating Quiz:", error);
      });
  };

  return (
    <div className={classes.quizContainer}>
      {isLoading ? (
        <div className="loadingio">
          <div className="loading">
            <div></div>
          </div>
        </div>
      ) : (
        <>
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
          {currentQuiz && (
            <div className={classes.question}>
              <h3>{currentQuiz.title}</h3>
              <p style={{ fontSize: "15px" }}>{currentQuiz.question}</p>
              <ul>
                {currentQuiz.responses.map((response, index) => (
                  <li key={index}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "15px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={
                          checkedItems[currentQuestionIndex] &&
                          checkedItems[currentQuestionIndex][index]
                        }
                        onChange={() => handleCheckboxChange(index)}
                      />
                      {response}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
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
                  <Words>Are you sure you want to Validate the Quiz?</Words>
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
                  <Words>Time is up! You need to submit the quiz.</Words>
                  <br />
                  <br />
                  <Button>Submit</Button>
                </div>
              </Frame>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default withStyles(styles)(SoftwareQuizFrame);
