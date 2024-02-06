import { CONSTANTS } from "../../../constants/api";
import React, { useState } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Line } from "arwes";
const styles = () => ({
  validationFrame: {},
  criteriaContainer: {
    marginBottom: "1em",
  },
  btn: {
    marginRight: "2em",
  },
});

const QuizResultFrame = (props) => {
  const { classes, className } = props;

  const [score, setScore] = useState(0);
  const [pointsRewarded, setPointsRewarded] = useState(0);

  const handleValidateTask = () => {
    const randomScore = Math.floor(Math.random() * 100);
    setScore(randomScore);
    const randomPointsRewarded = Math.floor(Math.random() * 10);
    setPointsRewarded(randomPointsRewarded);
  };

  return (
    <div className={classes.validationFrame}>
      <Words animate>Quiz Validation</Words>
      <div className={classes.criteriaContainer}>
        <Words>Code Quality:</Words>
        <Words>Code quality is good.</Words>
        <Line />
      </div>
      <div className={classes.criteriaContainer}>
        <Words>Functionality:</Words>
        <Line />
        <Words>Functionality is well-implemented.</Words>
      </div>
      <div className={classes.criteriaContainer}>
        <Words>User Interface (UI):</Words>
        <Words>Responsive on different screen sizes.</Words>
        <Line />
      </div>
      <div className={classes.criteriaContainer}>
        <Words>Error Handling:</Words>
        <Line />
        <Words>Effective error handling.</Words>
      </div>
      <div>
        <Words animate>Score: 90/100 </Words>
        <br></br>
        <br></br>
        <Words animate>Points Rewarded: 1200 </Words>
      </div>
      <br></br>
      <Button onClick={handleValidateTask} className={classes.btn}>
        Next Task
      </Button>
      <Button onClick={handleValidateTask}>Tasks Timeline</Button>
    </div>
  );
};
export default withStyles(styles)(QuizResultFrame);
