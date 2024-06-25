import { CONSTANTS } from "../../../../../constants/api";
import React, { useState } from "react";
import { Frame, withStyles } from "arwes";
import { Button, Words, Line } from "arwes";
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
});

const SoftwareTestResultFrame = (props) => {
  const { classes, className } = props;
  const evaluationData = [
    {
      testName: "Test 1",
      criteria: [
        {
          task: "Technical Knowledge: ",
          comment:
            "The responses to the quiz demonstrated a solid understanding of the underlying technical concepts. It is evident that a lot of effort has been put into mastering the material, and the foundation of knowledge is strong.",
          score: "90/100",
        },
        {
          task: "Application of Skills: ",
          comment:
            "The quiz responses showcased the ability to apply learnt skills in a practical way. Problem-solving skills are sharp, and technical abilities have been adeptly used to find solutions.",
          score: "100/100",
        },
        {
          task: "Continual Learning: ",
          comment:
            "The quiz indicates a positive attitude towards learning and improving. The continuous endeavor to learn and innovate is noticeable and impressive. The responses reflect an understanding of recent technologies and trends.",
          score: "90/100",
        },
      ],
      overallScore: "95/100",
      pointsRewarded: "1200",
    },
  ];
  const [score, setScore] = useState(0);
  const [pointsRewarded, setPointsRewarded] = useState(0);

  const handleValidateTask = () => {
    const randomScore = Math.floor(Math.random() * 100);
    setScore(randomScore);
    const randomPointsRewarded = Math.floor(Math.random() * 10);
    setPointsRewarded(randomPointsRewarded);
  };
  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <Words animate style={{ fontWeight: "bold" }}>
          Test Validation
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
        <Link to="/preworld/open-jobs">
          <Button className={classes.btn}>Next</Button>
        </Link>
      </div>
    </Frame>
  );
};
export default withStyles(styles)(SoftwareTestResultFrame);
