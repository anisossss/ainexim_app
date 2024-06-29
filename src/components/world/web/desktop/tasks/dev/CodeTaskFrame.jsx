import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import { CONSTANTS } from "../../../../../../constants/api";
import axios from "axios";
import { toast } from "react-toastify";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/Auth/authSelectors";
const styles = () => ({
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
const CodeTaskFrame = (props) => {
  const { classes, height, width, marginTop, marginLeft, onValidate } = props;
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };
  const location = useLocation();

  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  const [taskData, setTaskData] = useState(null);
  const webTaskId = location.pathname.split("/").pop();

  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    if (userId && webTaskId) {
      fetchWebQuizAssignment();
    }
  }, [userId, webTaskId]);

  const fetchWebQuizAssignment = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-dev-assignment/${webTaskId}/?userId=${userId}`
      );
      setAssignment(response.data.assignment);
      setIsLoading(false);
      console.log(assignment);
    } catch (error) {
      console.error("Error fetching web dev assignment:", error);
      toast.error("Error fetching web dev assignment");
    }
  };

  const navigate = useNavigate();
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
    if (!inputMessage || inputMessage === "") {
      toast.error("Please provide a response before validating.");
      return;
    }

    setIsLoadingConfirmation(true);
    setModalOpen(false);
    console.log("Task response:", inputMessage);
    axios
      .post(
        `${CONSTANTS.API_URL}/evaluation/evaluate-web-task/${webTaskId}/?userId=${userId}`,
        {
          tabActivityCount,
          clickCount,
          taskResponse: inputMessage,
        }
      )
      .then((response) => {
        setIsLoadingConfirmation(false);
        toast.success("Task validated successfully");
        navigate(
          `/world/desktop/task/verification/${response.data.updatedAssignment.evaluation}`
        );
      })
      .catch((error) => {
        toast.error("Error validating task");
        console.error(error);
        setIsLoadingConfirmation(false);
      });
  };

  const [inputMessage, setInputMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (value) => {
    setInputMessage(value);
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
          <div
            style={{
              display: "flex",
              height: height,
              width: width,
              marginTop: marginTop,
              marginLeft: marginLeft,
            }}
          >
            <div
              id="leftDiv"
              style={{
                width: "50%",
                marginRight: "1em",
                overflowY: "scroll",
                padding: "1em",
              }}
            >
              <span animate style={{ fontWeight: "bold" }}>
                Task 1:{" "}
                {assignment && (
                  <Words animate>{assignment.webTask.title}</Words>
                )}
              </span>
              <br></br>
              <br></br>
              {assignment && (
                <Words animate>{assignment.webTask.description}</Words>
              )}
              <br></br>
              <br></br>
              <Words animate style={{ fontWeight: "bold" }}>
                Instructions
              </Words>
              {assignment && (
                <div>
                  {assignment.webTask.content.map((stepString, index) => {
                    let stepIndex = 0;
                    return stepString.split(/\d+\.\s*/).map(
                      (step, innerIndex) =>
                        step.trim() && (
                          <div
                            key={index * 100 + innerIndex}
                            style={{ fontSize: "15px" }}
                          >
                            {++stepIndex}. {step.trim()}
                          </div>
                        )
                    );
                  })}
                </div>
              )}
              <br></br>
              <Words animate style={{ fontWeight: "bold" }}>
                Helpful Resources
              </Words>
              <br></br>
              {assignment &&
                assignment.webTask.resources.map((resource, index) => (
                  <span key={index}>
                    {resource.split(",").map((link, linkIndex) => (
                      <React.Fragment key={linkIndex}>
                        💡{" "}
                        <a
                          href={link.trim()}
                          target="_blank"
                          style={{ fontSize: "15px" }}
                        >
                          {link.trim()}
                        </a>
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                ))}
            </div>

            <div
              id="rightDiv"
              style={{
                width: "50%",
                padding: "1em",
                marginRight: "1em",
                overflowY: "scroll",
              }}
            >
              <div>
                <label htmlFor="language">Select Programming Language:</label>
                &nbsp;{" "}
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="php">PHP</option>
                </select>
              </div>

              <CodeMirror
                height="320px"
                extensions={[
                  selectedLanguage === "javascript"
                    ? javascript()
                    : selectedLanguage === "css"
                    ? css()
                    : selectedLanguage === "html"
                    ? html()
                    : selectedLanguage === "python"
                    ? python()
                    : selectedLanguage === "cpp"
                    ? cpp()
                    : selectedLanguage === "java"
                    ? java()
                    : php(),
                ]}
                theme={vscodeDark}
                options={{ mode: selectedLanguage }}
                placeholder="Type your response here..."
                value={inputMessage}
                onChange={handleInputChange}
                onInput={handleInputResize}
              />
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

export default withStyles(styles)(CodeTaskFrame);
