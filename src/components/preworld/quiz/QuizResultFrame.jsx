import { CONSTANTS } from "../../../constants/api";
import React, { useState } from "react";
import { withStyles } from "arwes";
import { Link } from "react-router-dom";
import { Frame, Button, Words, Line } from "arwes";
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
});

const QuizResultFrame = (props) => {
  const { classes, className } = props;
  const evaluationData = [
    {
      testName: "Test 1",
      criteria: [
        {
          task: "Technical Understanding: ",
          comment:
            "The test results demonstrate a profound understanding of the technical concepts tested. It's apparent that concepts have been studied thoroughly and there's a strong foundation of technical knowledge.",
          score: "90/100",
        },
        {
          task: "Problem-solving Skills: ",
          comment:
            "The problem-solving aspect of the test was handled excellently. There's a solid application of technical knowledge to solve challenges. This reflects strong critical thinking and problem-solving skills.",
          score: "100/100",
        },
        {
          task: "Testing and Debugging: ",
          comment:
            "The test results reflect well-written code that effectively handles errors and unexpected input. There's clear evidence of careful testing and debugging, demonstrating a strong attention to details and focus on producing robust code.",
          score: "90/100",
        },
      ],
      overallScore: "95/100",
      pointsRewarded: "1200",
    },
  ];
  const [score, setScore] = useState(0);
  const [pointsRewarded, setPointsRewarded] = useState(0);

  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ fontWeight: "bold" }}>
          Quiz Validation
        </Words>
        <br></br>
        <br></br>
        {evaluationData.map((test, i) => (
          <div key={i}>
            {test.criteria.map((criterion, j) => (
              <div key={j} className={classes.criteriaContainer}>
                <span layer="header" style={{ fontWeight: "bold" }}>
                  {criterion.task}
                </span>
                <Words>{criterion.comment}</Words>
                <br></br>
                <br></br>
                <Line />
              </div>
            ))}
            <span animate style={{ fontWeight: "bold" }}>
              Overall Score: {test.overallScore}
            </span>
            <br></br>
            <span animate style={{ fontWeight: "bold" }}>
              Points Rewarded: {test.pointsRewarded}
            </span>
          </div>
        ))}
        <br></br>
        <Link to="/preworld/test">
          <Button className={classes.btn}>Next</Button>
        </Link>
      </div>
    </Frame>
  );
};
export default withStyles(styles)(QuizResultFrame);
