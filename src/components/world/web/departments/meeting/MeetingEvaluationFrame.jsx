import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Line } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../../../constants/api";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/Auth/authSelectors";
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
  const { classes } = props;
  const [evaluationData, setEvaluationData] = useState(null);
  const location = useLocation();
  const { meetingEvaluationId } = useParams();
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL}/evaluation/get-web-meeting-evaluation/${meetingEvaluationId}/${userId}`
        );
        console.log(response.data);
        setEvaluationData(response.data.userEvaluation);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
      }
    };

    fetchEvaluationData();
  }, [meetingEvaluationId, userId]);

  let scoreColor = "#4CBB17";

  if (evaluationData) {
    if (evaluationData.score < 20) {
      scoreColor = "#C70039";
    } else if (evaluationData.score >= 20 && evaluationData.score <= 70) {
      scoreColor = "#FFC300";
    }
  }

  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ fontWeight: "bold" }}>
          Meeting Evaluation
        </Words>
        <br />
        <br />

        {evaluationData && (
          <>
            <Words style={{ fontWeight: "bold" }}>Evaluation Description</Words>
            <br />
            <Words>{evaluationData.evaluation}</Words>
            <br />
            <br />
            <Line />
            <br />

            <div className={classes.criteriaContainer}>
              <div
                className={classes.progress}
                style={{
                  width: `${evaluationData.score}%`,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: scoreColor,
                }}
              >
                <Words style={{ fontWeight: "bold", padding: "1em" }}>
                  Your Evaluation Score: &nbsp; {evaluationData.score}
                </Words>
              </div>
            </div>
            <br />
          </>
        )}

        <div className={classes.btns}>
          <Link to="/world/current-mission-timeline">
            <Button className={classes.btn}>Tasks Timeline</Button>
          </Link>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(MeetingEvaluationFrame);
