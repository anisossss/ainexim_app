import React, { useState, useEffect, useMemo } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../../../../constants/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/Auth/authSelectors";

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
const WebQuizFrame = (props) => {
  const { classes } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [checkedItems, setCheckedItems] = useState({});
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [tabActivityCount, setTabActivityCount] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  const location = useLocation();
  const webQuizId = location.pathname.split("/").pop();

  useEffect(() => {
    if (userId && webQuizId) {
      fetchWebQuizAssignment();
    }
  }, [userId, webQuizId]);

  const fetchWebQuizAssignment = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-quiz-assignment/${webQuizId}/?userId=${userId}`
      );
      setQuizData(response.data.assignment);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching web quiz assignment:", error);
      toast.error("Error fetching web quiz assignment");
    }
  };

  const handleConfirmClick = () => {
    setIsLoadingConfirmation(true);
    setModalOpen(false);

    const quizResponse = Object.keys(checkedItems).reduce((acc, key) => {
      const index = parseInt(key, 10);
      const responseIndex = index + 1;
      acc[responseIndex.toString()] = checkedItems[key];
      return acc;
    }, {});

    quizData.webQuiz.responses.forEach((_, index) => {
      const responseIndex = (index + 1).toString();
      if (!(responseIndex in quizResponse)) {
        quizResponse[responseIndex] = false;
      }
    });

    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-web-quiz/${webQuizId}/?userId=${userId}`,
        {
          tabActivityCount,
          clickCount,
          quizResponse,
        }
      )
      .then((response) => {
        setIsLoadingConfirmation(false);
        toast.success("Quiz validated successfully");
        navigate(
          `/world/desktop/web-quiz/verification/${response.data.updatedAssignment.evaluation}`
        );
      })
      .catch((error) => {
        setIsLoadingConfirmation(false);
        toast.error("Error validating quiz");
        console.error("Error ", error);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

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

  const handleCheckboxChange = useMemo(
    () => (index) => {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [index]: !prevCheckedItems[index],
      }));
    },
    [setCheckedItems]
  );

  return (
    <Frame level={0}>
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
              <div>
                {timeRemaining === 0
                  ? "Time's up!"
                  : `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
                      .toString()
                      .padStart(2, "0")}`}
              </div>
            </div>
            {quizData && (
              <div className={classes.question}>
                <h3>{quizData.webQuiz.title}</h3>
                <p style={{ fontSize: "15px" }}>{quizData.webQuiz.question}</p>
                <ul>
                  {quizData.webQuiz.responses.map((response, index) => (
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
                          checked={!!checkedItems[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        {response}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={classes.submitButton}>
              <Button onClick={() => setModalOpen(true)}>Submit</Button>
            </div>

            {isModalOpen && (
              <>
                <div
                  className={classes.modalBackdrop}
                  onClick={() => setModalOpen(false)}
                ></div>
                <Frame
                  className={classes.modalFrame}
                  animate={true}
                  corners={1}
                >
                  <div style={{ padding: "1em" }}>
                    <Words>Are you sure you want to Validate the Quiz?</Words>
                    <br />
                    <br />
                    <div className="btns_confirm">
                      <Button onClick={handleConfirmClick} layer="success">
                        Confirm
                      </Button>
                      <Button
                        layer="secondary"
                        onClick={() => setModalOpen(false)}
                      >
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
                  onClick={() => setTimeModalOpen(false)}
                ></div>
                <Frame
                  className={classes.modalFrame}
                  animate={true}
                  corners={1}
                >
                  <div style={{ padding: "1em", textAlign: "center" }}>
                    <Words>Time is up! You need to submit the quiz.</Words>
                    <br />
                    <br />
                    <Button onClick={handleConfirmClick}>Submit</Button>
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
          </>
        )}
      </div>
    </Frame>
  );
};

export default withStyles(styles)(WebQuizFrame);
