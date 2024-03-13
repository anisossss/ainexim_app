import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Line } from "arwes";
import { CONSTANTS } from "../../../constants/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [width, setWidth] = useState("0%");
  const staticEvaluationData = {
    description:
      "This meeting served as a productive forum for discussing improvements to the checkout process and payment integration of our booking platform. Your input in the discussion showed a clear understanding of user experience challenges and solutions for payment transactions. You shared valuable insights that can guide the development of an enhanced checkout and payment system.",
    advice:
      "In future meetings, we encourage you to engage more extensively in brainstorming sessions. Your insights are valuable and can contribute significantly to improving the platform. Consider proactively sharing your innovative ideas and suggestions. It not only benefits the project but also fosters a collaborative environment in the team.",
    rating: 85,
  };
  const { classes } = props;
  let scoreColor = "#4CBB17";
  if (staticEvaluationData.rating < 20) {
    scoreColor = "#C70039";
  } else if (
    staticEvaluationData.rating >= 20 &&
    staticEvaluationData.rating <= 70
  ) {
    scoreColor = "#FFC300";
  }
  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ fontWeight: "bold" }}>
          Meeting Evaluation
        </Words>
        <br></br>
        <br></br>

        <div className={classes.criteriaContainer}>
          <Words style={{ fontWeight: "bold" }}>Evaluation Description</Words>
          <br></br>
          <Words>{staticEvaluationData.description}</Words>
          <br></br>
          <br></br>
          <Line />
        </div>

        <div className={classes.criteriaContainer}>
          <Words style={{ fontWeight: "bold" }}>Advice</Words>
          <Words>{staticEvaluationData.advice}</Words>
          <br></br>
          <br></br>
          <Line />
        </div>

        <div className={classes.criteriaContainer}>
          <div
            className={classes.progress}
            style={{
              width: `${staticEvaluationData.rating}%`,
              display: "flex",
              alignItems: "center",
              backgroundColor: scoreColor,
            }}
          >
            <Words style={{ fontWeight: "bold", padding: "1em" }}>
              Your Evaluation Score: &nbsp; {staticEvaluationData.rating}
              <span style={{ color: scoreColor }}></span>
            </Words>
          </div>
        </div>
        <br></br>

        <div className={classes.btns}>
          <Link to="/world/desktop/github-task">
            <Button className={classes.btn}>Next Task</Button>
          </Link>
          <Button>Tasks Board</Button>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(MeetingEvaluationFrame);
