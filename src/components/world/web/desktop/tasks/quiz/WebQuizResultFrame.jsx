import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Link } from "react-router-dom";
import { Frame, Button, Words, Line } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../../../../constants/api";
import { useNavigate, useLocation } from "react-router-dom";

const styles = () => ({
  validationFrame: {
    padding: "1em",
  },
  criteriaContainer: {
    marginBottom: "1em",
  },
  btn: {
    marginRight: "2em",
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

const WebQuizResultFrame = (props) => {
  const { classes, className } = props;
  const [evaluationData, setEvaluationData] = useState("null");
  const location = useLocation();
  const webQuizEvaluationId = location.pathname.split("/").pop();
  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL}/evaluation/get-web-quiz-evaluation/${webQuizEvaluationId}`
        );
        console.log(response.data.quizEvaluation);
        setEvaluationData(response.data.quizEvaluation);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
      }
    };

    fetchEvaluationData();
  }, []);
  let scoreColor = "#4CBB17";

  if (evaluationData) {
    if (evaluationData.rating < 20) {
      scoreColor = "#C70039";
    } else if (evaluationData.rating >= 20 && evaluationData.rating <= 70) {
      scoreColor = "#FFC300";
    }
  }
  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ fontWeight: "bold" }}>
          Quiz Validation
        </Words>
        <br></br>
        {evaluationData && (
          <div>
            <div className={classes.criteriaContainer}>
              <span layer="header" style={{ fontWeight: "bold" }}>
                {evaluationData.description}
              </span>
              <br />
              <br />
              <b>Correct Response </b>
              <br />

              <Words layer="success">{evaluationData.codeCorrection}</Words>
              <br />
              <br />
              <Line />
            </div>
            <span>{evaluationData.advice}</span>
            <br></br>
            <br></br>
            <div className={classes.criteriaContainer}>
              <div
                className={classes.progress}
                style={{
                  width: `${evaluationData.rating}%`,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: scoreColor,
                }}
              >
                <Words style={{ fontWeight: "bold", padding: "1em" }}>
                  Your Evaluation Score: &nbsp; {evaluationData.rating}
                </Words>
              </div>
            </div>
          </div>
        )}
        <br />
        <Link to="/world/current-mission-timeline">
          <Button className={classes.btn}>Tasks Timeline</Button>
        </Link>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(WebQuizResultFrame);
