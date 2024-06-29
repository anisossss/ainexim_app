import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "arwes";
import { Link } from "react-router-dom";
import { Frame, Button, Words, Line } from "arwes";
import { CONSTANTS } from "../../../constants/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/Auth/authSelectors";
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

const SoftwareQuizResultFrame = (props) => {
  const { classes } = props;
  const [evaluationData, setEvaluationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL}/evaluation/get-software-quiz-evaluation/${userId}`
        );
        setEvaluationData(response.data.evaluation);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        setIsLoading(false);
      }
    };

    fetchEvaluationData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Frame animate={true}>
      <div className={classes.validationFrame}>
        <div>
          <Words animate style={{ fontWeight: "bold" }}>
            {evaluationData.title}
          </Words>
          <br />
          <Words>{evaluationData.description}</Words>
          <br />
          <br />
          <Words animate style={{ fontWeight: "bold" }}>
            Code Correction:
          </Words>
          <br />
          <Words>{evaluationData.codeCorrection}</Words>
          <br />
          <br />
          <Words animate style={{ fontWeight: "bold" }}>
            Advice:
          </Words>
          <br />
          <Words>{evaluationData.advice}</Words>
          <br />
          <br />
          <Words animate style={{ fontWeight: "bold" }}>
            Rating:
          </Words>
          <br />
          <Words>{evaluationData.rating}</Words>
          <br />
          <br />
          <Line />
        </div>
        <Link to="/preworld/test">
          <Button className={classes.btn}>Next</Button>
        </Link>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(SoftwareQuizResultFrame);
