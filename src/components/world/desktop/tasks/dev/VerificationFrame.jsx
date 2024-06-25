import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Line } from "arwes";
import { CONSTANTS } from "../../../../../constants/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const styles = () => ({
  validationFrame: {
    padding: "1em",
    height: "77vh",
    overflow: "scroll",
  },
  criteriaContainer: {
    marginBottom: "1em",
  },
  btn: {
    marginRight: "2em",
  },
  btns: {
    display: "flex",
    justifyContent: "flex-end",
  },
  progress: {
    transition: "width 0.5s ease-in-out",
    height: "30px",
    border: "none",
    marginTop: "10px",
    backgroundColor: "#029dbb",
    borderRadius: 0,
  },
});

const CodeVerification = (props) => {
  const [width, setWidth] = useState("0%");

  const { classes } = props;
  const [taskData, setTaskData] = useState(null);
  const { id } = useParams();
  const [evaluationData, setEvaluationData] = useState(null);
  const [scoreColor, setScoreColor] = useState("");

  useEffect(() => {
    const fetchEvaluation = () => {
      axios
        .get(
          `${CONSTANTS.API_URL}/evaluation/get-web-task-evaluation/660e0755c5f7913ef8fb370a`
        )
        .then((response) => {
          setEvaluationData(response.data.taskEvaluation);
          const score = response.data.taskEvaluation.rating;
          setWidth(`${score}%`);
          if (score < 20) {
            setScoreColor("#C70039");
          } else if (score >= 20 && score <= 70) {
            setScoreColor("#FFC300");
          } else {
            setScoreColor("#4CBB17");
          }
        })
        .catch((error) => {
          console.error("Error getting evaluation data from backend:", error);
        });
    };
    fetchEvaluation();
  }, []);

  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ color: scoreColor, fontWeight: "bold" }}>
          Task 1 Evaluation
        </Words>
        <br></br>
        {taskData && <Words animate>{taskData.title}</Words>}
        <br></br>
        {evaluationData && (
          <div className={classes.criteriaContainer}>
            <Words style={{ color: scoreColor, fontWeight: "bold" }}>
              Evaluation Description
            </Words>
            <br></br>
            <Words>{evaluationData.description}</Words>
            <br></br>
            <br></br>
            <Line />
          </div>
        )}
        {evaluationData && (
          <div className={classes.criteriaContainer}>
            <Words style={{ color: scoreColor, fontWeight: "bold" }}>
              Code Correction
            </Words>
            <br></br>
            <Words>{evaluationData.codeCorrection}</Words>
            <br></br>
            <br></br>
            <Line />
          </div>
        )}
        {evaluationData && (
          <div className={classes.criteriaContainer}>
            <Words style={{ color: scoreColor, fontWeight: "bold" }}>
              Advice
            </Words>
            <Words>{evaluationData.advice}</Words>
            <br></br>
            <br></br>
            <Line />
          </div>
        )}
        {evaluationData && (
          <div className={classes.criteriaContainer}>
            <div
              className={classes.progress}
              style={{
                width: `${evaluationData.rating}%`,
                display: "flex",
                backgroundColor: scoreColor,
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Words
                style={{
                  fontWeight: "bold",
                  padding: "1em",
                }}
              >
                Your Evaluation Score: &nbsp; {evaluationData.rating}
                <span style={{ color: scoreColor }}></span>
              </Words>
            </div>
          </div>
        )}
        <div className={classes.btns}>
          <Link
            to={{
              pathname: "/world/desktop/my-dock",
              state: { openGithub: true },
            }}
          >
            <Button className={classes.btn}>Next Task</Button>
          </Link>
          <Button>Tasks Board</Button>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(CodeVerification);
