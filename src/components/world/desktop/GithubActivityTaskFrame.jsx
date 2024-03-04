import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { Button, Words, Line } from "arwes";
import PropTypes from "prop-types";
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

const GithubActivityTaskFrame = (props) => {
  const { classes } = props;
  const [width, setWidth] = useState("0%");
  const [scoreColor, setScoreColor] = useState("");

  useEffect(() => {
    // Simulated evaluation data related to a GitHub task
    const evaluationData = {
      rating: 90,
      description: "The task was completed successfully.",
      codeCorrection: "N/A",
      advice: "Ensure to follow best practices in code organization.",
    };

    const score = evaluationData.rating;
    setWidth(`${score}%`);
    if (score < 20) {
      setScoreColor("red");
    } else if (score >= 20 && score <= 70) {
      setScoreColor("yellow");
    } else {
      setScoreColor("green");
    }
  }, []);

  return (
    <div className={classes.validationFrame}>
      <Words animate style={{ color: scoreColor, fontWeight: "bold" }}>
        Github Task Evaluation
      </Words>
      <br />
      <Words animate>GitHub Repository Creation and Code Push</Words>
      <br></br>
      <br></br>

      <div className={classes.criteriaContainer}>
        <Words style={{ color: scoreColor, fontWeight: "bold" }}>
          Evaluation Description
        </Words>
        <br></br>
        <Words>The task was completed successfully.</Words>
        <br></br>
        <br></br>
        <Line />
      </div>
      <div className={classes.criteriaContainer}>
        <Words style={{ color: scoreColor, fontWeight: "bold" }}>
          Code Correction:
        </Words>
        <Words>N/A</Words>
        <br></br>
        <br></br>

        <Line />
      </div>
      <div className={classes.criteriaContainer}>
        <Words style={{ color: scoreColor, fontWeight: "bold" }}>Advice</Words>
        <br></br>
        <Words>Ensure to follow best practices in code organization.</Words>
        <br></br>
        <br></br>

        <Line />
      </div>
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
            <span style={{ color: scoreColor }}>90</span>
          </Words>
        </div>
      </div>
      <div className={classes.btns}>
        <Button className={classes.btn}>Next Task</Button>
        <Link to="/current-tasks">
          <Button>Tasks Board</Button>
        </Link>
      </div>
    </div>
  );
};

GithubActivityTaskFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GithubActivityTaskFrame);
