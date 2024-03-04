import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Line } from "arwes";
import { CONSTANTS } from "../../../constants/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = () => ({
  validationFrame: {},
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
const MeetingEvaluationFrame = (props) => {
  const [width, setWidth] = useState("0%");

  const { classes } = props;
  const [taskData, setTaskData] = useState(null);
  const { id } = useParams();
  const [evaluationData, setEvaluationData] = useState(null);
  const [scoreColor, setScoreColor] = useState("");

  useEffect(() => {
    const fetchEvaluation = () => {
      axios
        .get(`${CONSTANTS.API_URL}/evaluation/get-meeting-evaluation/${id}`)
        .then((response) => {
          setEvaluationData(response.data.meetingEvaluation);
          const score = response.data.meetingEvaluation.rating;
          setWidth(`${score}%`);
          if (score < 20) {
            setScoreColor("red");
          } else if (score >= 20 && score <= 70) {
            setScoreColor("yellow");
          } else {
            setScoreColor("green");
          }
        })
        .catch((error) => {
          console.error("Error getting evaluation data from backend:", error);
        });
    };
    fetchEvaluation();
  }, []);

  return (
    <div className={classes.validationFrame}>
      <Words animate style={{ color: scoreColor, fontWeight: "bold" }}>
        Meeting 1 Evaluation
      </Words>
      <br></br>
      {taskData && <Words animate>{taskData.title}</Words>}
      <br></br>
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
              width: width,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Words style={{ fontWeight: "bold" }}>
              Your Evaluation Score: &nbsp;{" "}
              <span style={{ color: scoreColor }}>
                {evaluationData && evaluationData.rating}
              </span>
            </Words>
          </div>
        </div>
      )}
      <div className={classes.btns}>
        <Link to="/world/desktop/github-task">
          <Button className={classes.btn}>Next Task</Button>
        </Link>
        <Button>Tasks Board</Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(MeetingEvaluationFrame);
